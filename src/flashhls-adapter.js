// @flow
import {AudioTrack, Error, EventType, FakeEvent, FakeEventTarget, Utils, VideoTrack} from 'playkit-js';
import {FlashAPI} from './flash-api';
import DefaultConfig from './default-config';

class FlashHLSAdapter extends FakeEventTarget {
  _config: Object;
  _el: HTMLDivElement;
  _api: FlashAPI;
  _src: PKMediaSourceObject;
  _startTime: number;
  _firstPlay: boolean = true;
  _initialVolume: number;
  _loadReported: boolean = false;
  paused: boolean = true;
  ended: boolean = false;
  seeking: boolean = false;
  duration: ?number;
  buffer: ?number;
  watched: ?number;
  currentTime: ?number;
  _apiLoadPromise: Promise<*>;
  _apiLoadResolve: any;

  static getFlashCode(swf: string, flashVars: Object, params: Object, attributes: Object): string {
    const objTag = '<object type="application/x-shockwave-flash" ';
    let flashVarsString = '';
    let paramsString = '';
    let attrsString = '';

    // Convert flash vars to string
    if (flashVars) {
      Object.getOwnPropertyNames(flashVars).forEach(function(key) {
        flashVarsString += `${key}=${flashVars[key]}&amp;`;
      });
    }

    // Add swf, flashVars, and other default params
    params = Utils.Object.mergeDeep(
      {
        movie: swf,
        flashvars: flashVarsString,
        // Required to talk to swf
        allowScriptAccess: 'always',
        // All should be default, but having security issues.
        allowNetworking: 'all',
        wmode: 'transparent',
        bgColor: '#0',
        quality: 'autohigh'
      },
      params
    );

    // Create param tags string
    Object.getOwnPropertyNames(params).forEach(function(key) {
      paramsString += `<param name="${key}" value="${params[key]}" />`;
    });

    attributes = Utils.Object.mergeDeep(
      {
        // Add swf to attributes (need both for IE and Others to work)
        data: swf,

        // Default to 100% width/height
        width: '100%',
        height: '100%'
      },
      attributes
    );

    // Create Attributes string
    Object.getOwnPropertyNames(attributes).forEach(function(key) {
      attrsString += `${key}="${attributes[key]}" `;
    });

    return `${objTag}${attrsString}>${paramsString}</object>`;
  }

  constructor(source: PKMediaSourceObject, config: Object) {
    super();
    let flashConfig = Utils.Object.getPropertyPath(config, 'playback.options.flash');
    flashConfig = Utils.Object.mergeDeep(DefaultConfig, flashConfig);
    this._config = flashConfig;
    this._src = source;
    this._apiLoadPromise = new Promise(resolve => {
      this._apiLoadResolve = resolve;
    });
  }

  destroy(): void {
    if (this._el && this._el.parentNode) {
      this._el.parentNode.removeChild(this._el);
      this._el.innerHTML = '';
    }
  }

  attach(): HTMLDivElement {
    this._el = Utils.Dom.createElement('div');
    if (!this._config.flashvars) {
      this._config.flashvars = {};
    }
    this._config.flashvars.callback = 'flashlsCallback';
    this._el.innerHTML = FlashHLSAdapter.getFlashCode(this._config.swfUrl, this._config.flashvars, this._config.params, this._config.attributes);

    let flashlsEvents = {
      ready: () => {
        this._api = new FlashAPI(this._el.firstElementChild);
        if (this._initialVolume != null) {
          this.volume(this._initialVolume);
        }
        if (this._config.debug) {
          this._api.playerSetLogDebug(true);
          this._api.playerSetLogDebug2(true);
        }
        this._apiLoadResolve();
      },
      levelLoaded: loadmetrics => {
        if (!this._loadReported) {
          this._trigger(EventType.LOADED_DATA, loadmetrics);
          this._trigger(EventType.LOADED_METADATA, loadmetrics);
          this._loadReported = true;
        }
      },
      complete: () => {
        this._firstPlay = true;
        this.ended = true;
        this._trigger(EventType.ENDED);
      },
      position: (timemetrics: Object) => {
        this.paused = false;
        this.duration = timemetrics.duration;
        this.buffer = timemetrics.buffer;
        this.watched = timemetrics.watched;
        if (this.currentTime != timemetrics.position) {
          this.currentTime = timemetrics.position;
          this._trigger(EventType.TIME_UPDATE, timemetrics);
        }
      },
      error: (code, url, message) => {
        const error = new Error(Error.Severity.CRITICAL, Error.Category.MEDIA, Error.Code.VIDEO_ERROR, {
          code: code,
          extended: url,
          message: message
        });
        this._trigger(EventType.ERROR, error);
      },
      manifest: (duration, levels_) => {
        let audioTracks = this._api.getAudioTrackList();
        const parsedAudioTracks = [];
        if (audioTracks) {
          for (let i = 0; i < audioTracks.length; i++) {
            const settings = {
              id: audioTracks[i].id,
              active: audioTracks[i].isDefault,
              label: audioTracks[i].title,
              language: audioTracks[i].title, //TODO: Get language?!?
              index: i
            };
            parsedAudioTracks.push(new AudioTrack(settings));
          }
        }

        let videoTracks = [];
        for (let i = 0; i < levels_.length; i++) {
          // Create video tracks
          let settings = {
            active: 0 === i,
            bandwidth: levels_[i].bitrate,
            width: levels_[i].width,
            height: levels_[i].height,
            language: '',
            index: i
          };
          videoTracks.push(new VideoTrack(settings));
        }
        if ( this._resolveLoad ){
          this._resolveLoad({tracks: videoTracks.concat(parsedAudioTracks)});
          this._resolveLoad = null;
        }
        this._trigger(EventType.TRACKS_CHANGED, {tracks: videoTracks.concat(parsedAudioTracks)});
      },
      seekState: newState => {
        if (this._firstPlay) {
          return;
        }
        if (newState === 'SEEKING') {
          this.seeking = true;
          this._trigger(EventType.SEEKING);
          this._trigger(EventType.WAITING);
        }
        if (newState === 'SEEKED') {
          this.seeking = false;
          this._trigger(EventType.SEEKED);
        }
      },
      state: newState => {
        //IDLE/PLAYING/PAUSED/PLAYING_BUFFERING/PAUSED_BUFFERING
        switch (newState) {
          case 'IDLE':
            return;
          case 'PLAYING':
            this._trigger(EventType.PLAYING);
            this._firstPlay = false;
            break;
          case 'PAUSED_BUFFERING':
            this._trigger(EventType.WAITING);
            break;
          case 'PAUSED':
            this._trigger(EventType.PAUSE);
            this.paused = true;
            break;
        }
      }
    };
    // Create a single global callback function and pass it's name
    // to the SWF with the name `callback` in the FlashVars parameter.
    window.flashlsCallback = function(eventName, args) {
      if (flashlsEvents[eventName]) {
        flashlsEvents[eventName].apply(null, args);
      }
    };
    return this._el;
  }

  load(startTime: ?number): Promise<Object> {
    this._loadPromise = new Promise(resolve => {
      this._resolveLoad = resolve;
      if (startTime) {
        this._startTime = startTime;
      }
      this._apiLoadPromise.then(()=>{
        this._api.load(this._src.url);
      });
    });
    return this._loadPromise;
  }

  play() {
    this._apiLoadPromise.then(() => {
      if (this._firstPlay) {
        this._api.play(this._startTime ? this._startTime : -1);
      } else {
        this._api.resume();
      }
      this._trigger(EventType.PLAY);
    });
  }

  pause() {
    if (this._api) {
      this._api.pause();
    }
  }

  seek(to: number): void {
    if (this._api) {
      this._api.seek(to);
    }
  }

  volume(vol: number): void {
    if (this._api) {
      this._api.volume(vol * 100);
      this._trigger(EventType.VOLUME_CHANGE);
    } else {
      this._initialVolume = vol;
    }
  }

  getDuration(): number {
    if (this._api) {
      return this._api.getDuration();
    } else {
      return Number.NaN;
    }
  }

  selectAudioTrack(audioTrack: AudioTrack): void {
    if (this._api) {
      this._api.setAudioTrack(audioTrack.id);
      this._trigger(EventType.AUDIO_TRACK_CHANGED, {selectedAudioTrack: audioTrack});
    }
  }

  selectVideoTrack(videoTrack: VideoTrack): void {
    if (this._api) {
      if ( this.isABR() ) {
        this._trigger(EventType.ABR_MODE_CHANGED, {mode: 'manual'});
      }
      this._api.setCurrentLevel(videoTrack.index);
      this._trigger(EventType.VIDEO_TRACK_CHANGED, {selectedVideoTrack: videoTrack});
    }
  }

  setABR(): void {
    if (this._api) {
      this._api.setCurrentLevel(-1);
      this._trigger(EventType.ABR_MODE_CHANGED, {mode: 'auto'});
    }
  }

  isABR(): boolean {
    if (this._api) {
      return this._api.getAutoLevel();
    }
    return false;
  }

  getBufferLength(): number {
    if (this._api) {
      return this._api.getbufferLength();
    }
    return 0;
  }

  getBackBufferLength(): number {
    if (this._api) {
      return this._api.getbackBufferLength();
    }
    return 0;
  }

  _trigger(name: string, payload?: Object): void {
    this.dispatchEvent(new FakeEvent(name, payload));
  }

  reset(): void {
    this.paused = true;
    this.ended = false;
    this.seeking = false;
    this.duration = null;
    this.buffer = null;
    this.watched = null;
  }
}

export {FlashHLSAdapter};

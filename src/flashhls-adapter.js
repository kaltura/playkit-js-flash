// @flow
import {EventType, FakeEventTarget, Utils, FakeEvent,Error, AudioTrack, VideoTrack} from "playkit-js";
import FlashAPI from "./flash-api";

/**
 * Your class description.
 * @classdesc
 */
export default class FlashHLSAdapter extends FakeEventTarget{
  _config: Object;
  _el: HTMLDivElement;
  _api: FlashAPI;
  _src: PKMediaSourceObject;
  _startTime: number;
  _firstPlay: boolean = true;
  _initalVolume: number;
  _waitingForLoad: boolean;
  _waitingForPlay: boolean;
  _loadReported: boolean = false;


  static getFlashCode(swf: string,flashVars: Object, params: Object, attributes: Object):string{
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
    params = Utils.Object.mergeDeep({
      movie: swf,
      flashvars: flashVarsString,
      // Required to talk to swf
      allowScriptAccess: 'always',
      // All should be default, but having security issues.
      allowNetworking: 'all',
      wmode:'transparent',
      bgColor:'#0',
      quality:'autohigh',

    }, params);

    // Create param tags string
    Object.getOwnPropertyNames(params).forEach(function(key) {
      paramsString += `<param name="${key}" value="${params[key]}" />`;
    });

    attributes = Utils.Object.mergeDeep({
      // Add swf to attributes (need both for IE and Others to work)
      data: swf,

      // Default to 100% width/height
      width: '100%',
      height: '100%'

    }, attributes);

    // Create Attributes string
    Object.getOwnPropertyNames(attributes).forEach(function(key) {
      attrsString += `${key}="${attributes[key]}" `;
    });

    return `${objTag}${attrsString}>${paramsString}</object>`;
  }

  constructor(source: PKMediaSourceObject, config: Object){
    super();
    this._config = config;
    this._src = source;

  }

  destroy(): void {
    if (this._el){
      this._el.parentNode.removeChild(this._el);
      this._el.innerHTML = '';

    }
  }

  attach(_el: HTMLDivElement): HTMLDivElement {
    this._el = _el;
    this._el = Utils.Dom.createElement('div');
    if (!this._config.flashvars) {
      this._config.flashvars= {};
    }
    this._config.flashvars.callback = 'flashlsCallback';
    this._el.innerHTML = FlashHLSAdapter.getFlashCode(this._config.swfUrl || 'https://cdnapisec.kaltura.com/html5/static/flashhls/v0.4.4.24/flashlsChromeless.swf?inline=1',this._config.flashvars,this._config.params,this._config.attributes)

    let flashlsEvents = {
      ready:() => {
        this._api = new FlashAPI(this._el.firstElementChild);
        if (this._initalVolume != null){
          this.volume(this._initalVolume);
        }
        if (this._waitingForLoad) {
          this.load();
        }
        if (this._waitingForPlay) {
          this.play();
        }
        if (this._config.debug) {
          this._api.playerSetLogDebug(true);
          this._api.playerSetLogDebug2(true);
        }
      },
      videoSize:(width, height)=>{},
      levelLoaded:(loadmetrics)=>{
        if (!this._loadReported) {
          this._trigger(EventType.LOADED_DATA, loadmetrics);
          this._trigger(EventType.LOADED_METADATA, loadmetrics);
          this._loadReported = true;
        }
      },
      complete:()=>{
        this._firstPlay = true;
        this._trigger(EventType.ENDED);
      },
      position:(timemetrics: Object) => {
        this._trigger(EventType.TIME_UPDATE,timemetrics)

      },
      error:(code, url, message)=>{
        const error = new Error(
          Error.Severity.CRITICAL,
          Error.Category.MEDIA,
          Error.Code.VIDEO_ERROR, {
            code: code,
            extended: url,
            message: message
          });
        this._trigger(EventType.ERROR,error);
      },
      manifest:(duration, levels_, loadmetrics)=>{
        let audioTracks = this._api.getAudioTrackList();
        const parsedAudioTracks = [];
        if (audioTracks) {
          for (let i = 0; i < audioTracks.length; i++) {
            const settings = {
              id: audioTracks[i].id,
              active: audioTracks[i].isDefault,
              label: audioTracks[i].title,
              language: audioTracks[i].title,//TODO: Get language?!?
              index: i
            };
            parsedAudioTracks.push(new AudioTrack(settings));
          }
        }

        let videoTracks = [];
        for (let i = 0; i < levels_.length; i++) {
          // Create video tracks
          let settings = {
            active: 0=== i,
            bandwidth:levels_[i].bitrate,
            width: levels_[i].width,
            height:levels_[i].height,
            language: '',
            index: i
          };
          videoTracks.push(new VideoTrack(settings));
        }
        this._trigger(EventType.TRACKS_CHANGED, {tracks: videoTracks.concat(parsedAudioTracks)});
      },
      seekState: (newState) =>{
        if (this._firstPlay) {
          return;
        }
        if (newState === 'SEEKING') {
            this._trigger(EventType.SEEKING);
            this._trigger(EventType.WAITING);
          }
          if (newState === 'SEEKED') {
            this._trigger(EventType.SEEKED);
          }
      },
      state:(newState) => {
        //IDLE/PLAYING/PAUSED/PLAYING_BUFFERING/PAUSED_BUFFERING
        switch(newState){
          case "IDLE":
            return;
          case "PLAYING":
            this._trigger(EventType.PLAYING);
            this._firstPlay = false;
            break;
          case "PAUSED_BUFFERING":
            this._trigger(EventType.WAITING);
            break;
          case "PAUSED":
            this._trigger(EventType.PAUSE);
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

  load(startTime: ?number): void{
    if (startTime) {
      this._startTime = startTime;
    }
    if (this._api) {
      this._api.load(this._src.url);
    } else {
      this._waitingForLoad = true;
    }
  }

  play(){
    if (this._api) {
      if (this._firstPlay) {
        this._api.play(this._startTime ? this._startTime : -1);
      } else {
        this._api.resume();
      }
      this._trigger(EventType.PLAY);
    } else {
      this._waitingForPlay = true;
    }
  }

  pause(){
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
    if (this._api){
      this._api.volume(vol*100);
      this._trigger(EventType.VOLUME_CHANGE);
    } else {
      this._initalVolume = vol;
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
    if (this._api){
      this._api.setAudioTrack(audioTrack.id);
      this._trigger(EventType.AUDIO_TRACK_CHANGED,{selectedAudioTrack:audioTrack})

    }
  }

  selectVideoTrack(videoTrack: VideoTrack): void {
    if (this._api) {
      this._api.playerSetAutoLevelCapping(videoTrack.index);
      this._trigger(EventType.VIDEO_TRACK_CHANGED, {selectedVideoTrack: videoTrack});

      if (videoTrack.index == -1) {
        this._trigger(EventType.ABR_MODE_CHANGED, {mode:'auto'});
      } else {
        this._trigger(EventType.ABR_MODE_CHANGED, {mode:'manual'});
      }
    }
  }

  getVideoTrack(): number {
    if (this._api){
      return this._api.getAutoLevelCapping();
    }
  }

  _trigger(name: string, payload?: Object): void {
    this.dispatchEvent(new FakeEvent(name, payload));
  }



}

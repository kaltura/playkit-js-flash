// @flow
import {EventManager, EventType, FakeEvent, FakeEventTarget, getLogger, IEngine, Utils} from '@playkit-js/playkit-js';
import {FlashHLSAdapter} from './flashhls-adapter';

class Flash extends FakeEventTarget implements IEngine {
  /**
   * The supported mime types by FLASH HLS Engine.
   * @member {Array<string>} _hlsMimeType
   * @static
   * @private
   */
  static _hlsMimeTypes: Array<string> = [
    'application/x-mpegurl',
    'application/vnd.apple.mpegurl',
    'audio/mpegurl',
    'audio/x-mpegurl',
    'video/x-mpegurl',
    'video/mpegurl',
    'application/mpegurl'
  ];

  /**
   * The video element.
   * @type {HTMLDivElement}
   * @private
   */
  _el: ?HTMLDivElement = null;

  /**
   * The flash hls adapter.
   * @type {?FlashHLSAdapter}
   * @private
   */
  _api: ?FlashHLSAdapter = null;

  /**
   * The player config object.
   * @type {Object}
   * @private
   */
  _config: Object;

  /**
   * Promise when load finished
   * @type {Promise<*>}
   * @private
   */
  _loadPromise: ?Promise<*> = null;

  /**
   * volume value
   * @type {?number}
   * @private
   */
  _volume: ?number = NaN;

  /**
   * volume value before mute
   * @type {?number}
   * @private
   */
  _volumeBeforeMute: ?number = NaN;

  /**
   * The event manager of the engine.
   * @type {EventManager}
   * @private
   */
  _eventManager: EventManager = null;

  _source: PKMediaSourceObject;

  /**
   * The state of player mute
   * @type {boolean}
   * @private
   */
  _muted: boolean = this.defaultMuted;

  /**
   * The Flash class logger.
   * @type {any}
   * @static
   * @private
   */
  static _logger: any = getLogger('Flash');

  static id: string = 'flash';

  /**
   * Factory method to create an engine.
   * @param {PKMediaSourceObject} source - The selected source object.
   * @param {Object} config - The player configuration.
   * @returns {IEngine} - New instance of the run time engine.
   * @public
   * @static
   */
  static createEngine(source: PKMediaSourceObject, config: Object): IEngine {
    return new this(source, config);
  }

  /**
   * Checks if the engine can play a given source.
   * @param {PKMediaSourceObject} source - The source object to check.
   * @param {boolean} preferNative - prefer native flag
   * @returns {boolean} - Whether the engine can play the source.
   * @public
   * @static
   */
  // eslint-disable-next-line no-unused-vars
  static canPlaySource(source: PKMediaSourceObject, preferNative: boolean): boolean {
    if (source && source.mimetype) {
      return typeof source.mimetype === 'string' ? Flash._hlsMimeTypes.includes(source.mimetype.toLowerCase()) : false;
    }
    return false;
  }

  /**
   * empty implementation
   * @returns {void}
   * @private
   * @public
   */
  static prepareVideoElement(): void {}

  /**
   * Checks if flash is supported.
   * @returns {boolean} - Whether the flash engine is supported.
   */
  static isSupported(): boolean {
    let version = '0,0,0';
    try {
      version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
        .GetVariable('$version')
        .replace(/\D+/g, ',')
        .match(/^,?(.+),?$/)[1];
    } catch (e) {
      try {
        if (window.navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
          version = (window.navigator.plugins['Shockwave Flash 2.0'] || window.navigator.plugins['Shockwave Flash']).description
            .replace(/\D+/g, ',')
            .match(/^,?(.+),?$/)[1];
        }
      } catch (err) {
        // ignore
      }
    }
    let majorVersion: number = parseInt(version.split(',')[0]);
    return majorVersion >= 10;
  }

  /**
   * Runs the flash capabilities tests.
   * @returns {void}
   * @public
   * @static
   */
  static runCapabilities(): void {}

  /**
   * Gets the flash capabilities.
   * @return {Promise<Object>} - The flash capabilities object.
   * @public
   * @static
   */
  static getCapabilities(): Promise<Object> {
    return Promise.resolve({[Flash.id]: {autoplay: true, mutedAutoPlay: true}});
  }

  /**
   * @constructor
   * @param {PKMediaSourceObject} source - The selected source object.
   * @param {Object} config - The player configuration.
   */
  constructor(source: PKMediaSourceObject, config: Object) {
    super();
    this._el = Utils.Dom.createElement('div');
    this._init(source, config);
  }

  attachMediaSource(): void {
    this._api.attachMediaSource();
  }

  detachMediaSource(): void {
    this._api.detachMediaSource();
  }

  hideTextTrack(): void {}

  resetAllCues(): void {}

  enterPictureInPicture(): void {}

  exitPictureInPicture(): void {}

  _init(source: PKMediaSourceObject, config: Object): void {
    this._eventManager = new EventManager();
    this._config = config;
    this._source = source;
    if (this._el) {
      this._api = new FlashHLSAdapter(source, config, this._el);
      this._api.attach();
      this._addBindings();
    }
  }

  reset(): void {
    if (this._api) {
      this._api.reset();
    }

    this._config = null;
    this._source = null;
    this._volume = null;
    this._volumeBeforeMute = null;
  }

  /**
   * Restores the engine.
   * @param {PKMediaSourceObject} source - The selected source object.
   * @param {Object} config - The player configuration.
   * @returns {void}
   */
  restore(source: PKMediaSourceObject, config: Object): void {
    this.destroy();
    this._init(source, config);
  }

  /**
   * get the playback rates
   * @return {number[]} - playback rates
   */
  get playbackRates(): Array<number> {
    return [1];
  }

  /**
   * Sets the current playback speed of the audio/video.
   * @param {Number} playbackRate - The playback speed value.
   * @public
   * @returns {void}
   */
  set playbackRate(playbackRate: number): void {
    if (playbackRate != 1) {
      Flash._logger.debug('This engine doesnt support playback rate <> 1');
    }
  }

  /**
   * Gets the current playback speed of the audio/video.
   * @returns {Number} - The current playback speed value.
   * @public
   */
  get playbackRate(): number {
    return 1;
  }

  /**
   * Gets the default playback speed of the audio/video.
   * @returns {Number} - The default playback speed value.
   * @public
   */
  get defaultPlaybackRate(): number {
    return 1;
  }

  /**
   * Get the engine's id
   * @public
   * @returns {string} the engine's id
   */
  get id(): string {
    return Flash.id;
  }

  destroy(): void {
    if (this._api) {
      this._api.destroy();
      this._eventManager.destroy();
      this.reset();
    }
  }

  _addBindings(): void {
    if (this._api) {
      let events = [
        EventType.ABR_MODE_CHANGED,
        EventType.TRACKS_CHANGED,
        EventType.ERROR,
        EventType.PLAYING,
        EventType.TIME_UPDATE,
        EventType.PAUSE,
        EventType.LOADED_METADATA,
        EventType.LOADED_DATA,
        EventType.PLAY,
        EventType.VOLUME_CHANGE,
        EventType.WAITING,
        EventType.SEEKING,
        EventType.SEEKED,
        EventType.ENDED,
        EventType.TEXT_CUE_CHANGED,
        EventType.VIDEO_TRACK_CHANGED,
        EventType.AUDIO_TRACK_CHANGED,
        EventType.ABORT,
        EventType.EMPTIED,
        EventType.DURATION_CHANGE
      ];
      events.forEach(eventName => {
        this._eventManager.listen(this._api, eventName, (event: FakeEvent) => this.dispatchEvent(event));
      });
    } else {
      Flash._logger.warn('Unable to attach flash - api is missing');
    }
  }

  /**
   * @returns {HTMLDivElement} - The flash wrapper element.
   * @public
   */
  getVideoElement(): ?HTMLDivElement {
    return this._el;
  }

  /**
   * Select an audio track
   * @function selectAudioTrack
   * @param {AudioTrack} audioTrack - the  audio track to select
   * @returns {void}
   * @public
   */
  selectAudioTrack(audioTrack: AudioTrack): void {
    if (this._api) {
      this._api.selectAudioTrack(audioTrack);
    }
  }

  /**
   * Select a video track
   * @function selectVideoTrack
   * @param {VideoTrack} videoTrack - the track to select
   * @returns {void}
   * @public
   */
  selectVideoTrack(videoTrack: VideoTrack): void {
    if (this._api) {
      this._api.selectVideoTrack(videoTrack);
    }
  }

  /**
   * Enables adaptive bitrate
   * @function enableAdaptiveBitrate
   * @returns {void}
   * @public
   */
  enableAdaptiveBitrate(): void {
    if (this._api) {
      this._api.setABR();
    }
  }

  /**
   * Checking if adaptive bitrate switching is enabled.
   * For progressive playback will always returns false.
   * For adaptive playback will always returns true.
   * @function isAdaptiveBitrateEnabled
   * @returns {boolean} - Whether adaptive bitrate is enabled.
   * @public
   */
  isAdaptiveBitrateEnabled(): boolean {
    let isAdaptive: boolean = false;
    if (this._api) {
      isAdaptive = this._api.isABR();
    }
    return isAdaptive;
  }

  /**
   * Set a source.
   * @param {string} source - Source to set.
   * @public
   * @returns {void}
   */
  set src(source: string): void {
    if (this._api) {
      this._api.src = source;
    }
  }

  /**
   * Get the source url.
   * @returns {string} - The source url.
   * @public
   */
  get src(): string {
    if (this._api) {
      return this._api.src;
    }
  }

  /**
   * Load media.
   * @param {?number} startTime - Optional time to start the video from.
   * @public
   * @returns {Promise<Object>} - The loaded data
   */
  load(startTime: ?number): Promise<Object> {
    if (!this._api) {
      Flash._logger.warn('Missing API - Flash is not ready');
      return Promise.reject('Flash is not ready');
    }
    this.src = this._source ? this._source.url : null;
    this._loadPromise = this._api.load(startTime);
    return this._loadPromise;
  }

  /**
   * Start/resume playback.
   * @public
   * @returns {void}
   */
  play(): void {
    if (this._loadPromise) {
      this._loadPromise.then(() => {
        if (this._api) {
          this._api.play();
        }
      });
    }
  }

  pause(): void {
    if (this._api) {
      this._api.pause();
    }
  }

  /**
   * Checking if the current playback is live.
   * @function isLive
   * @returns {boolean} - Whether playback is live.
   * @public
   */
  isLive(): boolean {
    return false;
  }

  /**
   * Get the current time in seconds.
   * @returns {Number} - The current playback time.
   * @public
   */
  get currentTime(): number {
    if (this._api && this._api.currentTime) {
      return this._api.currentTime;
    }
    return 0;
  }

  /**
   * Set the current time in seconds.
   * @param {Number} to - The number to set in seconds.
   * @public
   * @returns {void}
   */
  set currentTime(to: number): void {
    if (this._api) {
      this._api.seek(to);
    }
  }

  /**
   * Get the duration in seconds.
   * @returns {Number} - The playback duration.
   * @public
   */
  get duration(): number {
    let duration: number = 0;
    if (this._api) {
      duration = this._api.duration ? this._api.duration : this._api.getDuration();
    }
    return duration;
  }

  /**
   * Set playback volume.
   * @param {Number} vol - The volume to set.
   * @public
   * @returns {void}
   */
  set volume(vol: number): void {
    if (this._muted) {
      this._volumeBeforeMute = vol;
    } else {
      this._volume = vol;
      if (this._api) {
        this._api.volume(vol);
      }
    }
  }

  /**
   * Get playback volume.
   * @returns {Number} - The volume value of the video element.
   * @public
   */
  get volume(): number {
    return this._volume || 0;
  }

  /**
   * Get paused state.
   * @returns {boolean} - The paused value of the video element.
   * @public
   */
  get paused(): boolean {
    if (this._api) {
      return this._api.paused;
    }
    return true;
  }

  /**
   * Get seeking state.
   * @returns {boolean} - The seeking value of the video element.
   * @public
   */
  get seeking(): boolean {
    if (this._api) {
      return this._api.seeking;
    }
    return false;
  }

  /**
   * Get the first seekable range (part) of the video in seconds.
   * @returns {TimeRanges} - First seekable range (part) of the video in seconds.
   * @public
   */
  get seekable(): any {
    return this.buffered;
  }

  /**
   * Get the first played range (part) of the video in seconds.
   * @returns {TimeRanges} - First played range (part) of the video in seconds.
   * @public
   */
  get played(): any {
    return {
      length: 1,
      start: () => {
        return 0;
      },
      end: () => {
        if (this._api) {
          return this._api.watched;
        } else return 0;
      }
    };
  }

  /**
   * Get the first buffered range (part) of the video in seconds.
   * @returns {TimeRanges} - First buffered range (part) of the video in seconds.
   * @public
   */
  get buffered(): any {
    let bufferLength: number = 0;
    let backBufferLength: number = 0;
    let currentTime: number = 0;
    if (this._api) {
      let api = this._api;
      backBufferLength = api.getBackBufferLength();
      bufferLength = api.getBufferLength();
      currentTime = api.currentTime ? api.currentTime : 0;
    }
    return {
      length: 1,
      start: () => {
        return currentTime - backBufferLength;
      },
      end: () => {
        return currentTime + bufferLength;
      }
    };
  }

  /**
   * Set player muted state.
   * @param {boolean} mute - The new mute value.
   * @public
   * @returns {void}
   */
  set muted(mute: boolean): void {
    if (mute) {
      this.volume = 0;
      this._muted = true;
      this._volumeBeforeMute = this.volume;
    } else {
      this._muted = false;
      if (this._volumeBeforeMute) {
        this.volume = this._volumeBeforeMute;
      } else {
        this.volume = 1;
      }
    }
  }

  /**
   * Get player muted state.
   * @returns {boolean} - The muted value of the video element.
   * @public
   */
  get muted(): boolean {
    return this.volume === 0;
  }

  /**
   * Get the default mute value.
   * @returns {boolean} - The defaultMuted of the video element.
   * @public
   */
  get defaultMuted(): boolean {
    return false;
  }

  /**
   * Get the start time of DVR window in live playback in seconds.
   * @returns {Number} - start time of DVR window.
   * @public
   */
  getStartTimeOfDvrWindow(): number {
    return 0;
  }

  /**
   * The ended property returns whether the playback of the audio/video has ended.
   * @returns {boolean} - The ended value.
   * @public
   */
  get ended(): boolean {
    if (this._api) {
      return this._api.ended;
    }
    return false;
  }

  /**
   * Seeking to live edge.
   * @function seekToLiveEdge
   * @returns {void}
   * @public
   */
  seekToLiveEdge(): void {
    this.currentTime = this.duration - 1;
  }

  get targetBuffer(): number {
    return NaN;
  }

  get availableBuffer(): number {
    return NaN;
  }

  /**
   * Sets an image to be shown while the video is downloading, or until the user hits the play button.
   * @param {string} poster - The image url to be shown.
   * @returns {void}
   * @public
   */
  set poster(poster: string): void {}

  /**
   * Gets an image to be shown while the video is downloading, or until the user hits the play button.
   * @returns {poster} - The image url.
   * @public
   */
  get poster(): string {
    return '';
  }

  /**
   * Specifies if and how the author thinks that the video should be loaded when the page loads.
   * @param {string} preload - The preload value.
   * @public
   * @returns {void}
   */
  set preload(preload: string): void {}

  /**
   * Gets the preload value of the video element.
   * @returns {string} - The preload value.
   * @public
   */
  get preload(): string {
    return 'none';
  }

  /**
   * Set if the video will automatically start playing as soon as it can do so without stopping.
   * @param {boolean} autoplay - The autoplay value.
   * @public
   * @returns {void}
   */
  set autoplay(autoplay: boolean): void {}

  /**
   * Gets the autoplay value of the video element.
   * @returns {boolean} - The autoplay value.
   * @public
   */
  get autoplay(): boolean {
    return false;
  }

  /**
   * Set to specifies that video controls should be displayed.
   * @param {boolean} controls - the controls value.
   * @public
   * @returns {void}
   */
  set controls(controls: boolean): void {}

  /**
   * Gets the controls value of the video element.
   * @returns {boolean} - The controls value.
   * @public
   */
  get controls(): boolean {
    return false;
  }

  /**
   * Set to specifies that the video will start over again, every time it is finished.
   * @param {boolean} loop - the loop value.
   * @public
   * @returns {void}
   */
  set loop(loop: boolean) {}

  /**
   * Gets the loop value of the video element.
   * @returns {boolean} - The loop value.
   * @public
   */
  get loop(): boolean {
    return false;
  }

  get isInPictureInPicture(): boolean {
    return false;
  }

  /**
   * @returns {Number} - The current network state (activity) of the audio/video.
   * @public
   */
  get networkState(): number {
    return 1;
  }

  /**
   * Indicates if the audio/video is ready to play or not.
   * @returns {Number} - The current ready state of the audio/video.
   * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready.
   * 1 = HAVE_METADATA - metadata for the audio/video is ready.
   * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond.
   * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available.
   * 4 = HAVE_ENOUGH_DATA - enough data available to start playing.
   */
  get readyState(): number {
    if (!this._api) {
      return 0;
    }
    return 4;
  }

  /**
   * @returns {Number} - The height of the video player, in pixels. flash object will take 100 of this element
   * @public
   */
  get videoHeight(): number {
    return -1;
  }

  /**
   * @returns {Number} - The width of the video player, in pixels. flash object will take 100 of this element
   * @public
   */
  get videoWidth(): number {
    return -1;
  }

  /**
   * @param {boolean} playsinline - Whether to set on the video tag the playsinline attribute.
   */
  set playsinline(playsinline: boolean): void {}

  /**
   * @returns {boolean} - Whether the video tag has an attribute of playsinline.
   */
  get playsinline(): boolean {
    return this._config ? this._config.playsinline : false;
  }

  /**
   * Set crossOrigin attribute.
   * @param {?string} crossOrigin - 'anonymous' or 'use-credentials'
   * @returns {void}
   */
  set crossOrigin(crossOrigin: ?string): void {}

  /**
   * Get crossOrigin attribute.
   * @returns {?string} - 'anonymous' or 'use-credentials'
   */
  get crossOrigin(): ?string {
    return null;
  }
}

export {Flash};

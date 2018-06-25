// @flow
import DefaultConfig from './default-config';
import {
  FakeEventTarget,
  EventManager,
  FakeEvent,
  IEngine,
  ICapability,
  EventType,
Utils} from 'playkit-js';
import FlashIsSupported from './capabilities/flash-is-supported';
import FlashHLSAdapter from './flashhls-adapter';

/**
 * Your class description.
 * @classdesc
 */
export default class Flash extends FakeEventTarget implements IEngine {

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
  _el: ?HTMLDivElement;

  _api: ?FlashHLSAdapter;

  _src: ?string;

  _duration: ?number;

  _buffer: ?number;

  _watched: ?number;

  _loadPromise: ?Promise<*>;

  _volume: ?number;

  _volumeBeforeMute: ?number;

  _paused: boolean = true;

  /**
   * The event manager of the engine.
   * @type {EventManager}
   * @private
   */
  _eventManager: EventManager;

  _ended: boolean = false;

  _seeking: boolean = false;

  _srcToLoad: ?string;

  /**
   * The flash capabilities handlers.
   * @private
   * @static
   */
  static _capabilities: Array<typeof ICapability> = [FlashIsSupported];


  static id: string = "flash";
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
  static canPlaySource(source: PKMediaSourceObject, preferNative: boolean): boolean {
    if (source && source.mimetype) {
      let canHlsPlayType = (typeof source.mimetype === 'string') ? Flash._hlsMimeTypes.includes(source.mimetype.toLowerCase()) : false;
      return canHlsPlayType;
    }
    return false;
  }

  /**
   * Runs the html5 capabilities tests.
   * @returns {void}
   * @public
   * @static
   */
  static runCapabilities(): void {
    Flash._capabilities.forEach(capability => capability.runCapability());
  }

  /**
   * Gets the flash capabilities.
   * @return {Promise<Object>} - The html5 capabilities object.
   * @public
   * @static
   */
  static getCapabilities(): Promise<Object> {
    let promises = [];
    Flash._capabilities.forEach(capability => promises.push(capability.getCapability()));
    return Promise.all(promises)
      .then((arrayOfResults) => {
        const mergedResults = {};
        arrayOfResults.forEach(res => Object.assign(mergedResults, res));
        return {[Flash.id]: mergedResults};
      });
  }



  /**
   * @constructor
   * @param {PKMediaSourceObject} source - The selected source object.
   * @param {Object} config - The player configuration.
   */
  constructor(source: PKMediaSourceObject, config: Object) {
    super();
    this._init(source,config);

  }

  _init(source: PKMediaSourceObject, config: Object): void {
    this._eventManager = new EventManager();
    this._flashConfig = Utils.Object.getPropertyPath(config, "playback.options.flash");
    this._flashConfig = Utils.Object.mergeDeep(DefaultConfig, this._flashConfig);
    this._api = new FlashHLSAdapter(source, this._flashConfig);
    this._el = this._api.attach();
    this._addBindings();
    this._srcToLoad = source.url;
  }

  reset(): void {
    this._el = null;
    this._src = null;
    this._duration = null;
    this._buffer = null;
    this._watched = null;
    this._loadPromise = null;
    this._volume = null;
    this._volumeBeforeMute = null;
    this._ended = false;
    this._seeking = false;
    this._srcToLoad = null;
    this._paused = true;
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

  _addBindings(): void{
    if (this._api) {
      this._eventManager.listen(this._api, EventType.ABR_MODE_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.TRACKS_CHANGED, (event: FakeEvent) =>{ this.dispatchEvent(event)});
      this._eventManager.listen(this._api, EventType.ERROR, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.PLAYING, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.TIME_UPDATE, (event: FakeEvent) => {
        if (this._currentTime != event.payload.position) {
          this.dispatchEvent(event);
        }
        this._currentTime = event.payload.position;
        this._duration = event.payload.duration;
        this._buffer = event.payload.buffer;
        this._watched = event.payload.watched;
        this._paused = false;
      });
      this._eventManager.listen(this._api, EventType.PAUSE, (event: FakeEvent) => {
        this.dispatchEvent(event);
        this._paused = true;
      });
      this._eventManager.listen(this._api, EventType.LOADED_METADATA, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.LOADED_DATA, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.PLAY, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.VOLUME_CHANGE, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.WAITING, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.SEEKING, (event: FakeEvent) => {
        this.dispatchEvent(event);
        this._seeking = true;
      });
      this._eventManager.listen(this._api, EventType.SEEKED, (event: FakeEvent) =>{
        this.dispatchEvent(event);
        this._seeking = false;
      });
      this._eventManager.listen(this._api, EventType.ENDED, (event: FakeEvent) =>{
        this.dispatchEvent(event);
        this._ended = true;
      });
      this._eventManager.listen(this._api, EventType.VIDEO_TRACK_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
      this._eventManager.listen(this._api, EventType.AUDIO_TRACK_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
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
      this._api.selectVideoTrack({index: -1});
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
    if (this._api){
      isAdaptive = this._api.getVideoTrack() == -1;
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
    this._src = source;
  }

  /**
   * Get the source url.
   * @returns {string} - The source url.
   * @public
   */
  get src(): string {
    if (this._src) {
      return this._src;
    }
    return "";
  }

  /**
   * Load media.
   * @param {number} startTime - Optional time to start the video from.
   * @public
   * @returns {Promise<Object>} - The loaded data
   */
  load(startTime: ?number): Promise<Object> {
    if (!this._api) {
      return Promise.reject("Flash is not ready");
    }
    this._src = this._srcToLoad;
    this._api.load(startTime);
    this._loadPromise = new Promise((resolve)=>{
      this._eventManager.listenOnce(this._api,EventType.TRACKS_CHANGED,(tracks)=>{
        resolve(tracks);
      })
    });

    return this._loadPromise;
  }

  /**
   * Start/resume playback.
   * @public
   * @returns {void}
   */
  play(): void {
    if (!this._loadPromise) {
      this.load();
    } else {
      this._loadPromise.then(() => {
        if (this._api) {
          this._api.play();
        }
      });
    }
  }

  pause(): void{
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
    return this._currentTime ? this._currentTime : 0;
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
    if (this._duration) {
      duration = this._duration;
    } else if (this._api) {
      duration = this._api.getDuration();
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
    this._volume = vol;
    if (this._api) {
      this._api.volume(vol);
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
    return this._paused;
  }

  /**
   * Get seeking state.
   * @returns {boolean} - The seeking value of the video element.
   * @public
   */
  get seeking(): boolean {
    return this._seeking;
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
      length: 1, start: () => {
        return 0;
      }, end: () => {
        return this._watched;
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
    if (this._api) {
      let api = this._api;
      backBufferLength = api.getBackBufferLength();
      bufferLength = api.getBufferLength();
    }
    return {
      length: 1, start: () => {
        return this._currentTime - backBufferLength;
      }, end: () => {
        return this.currentTime + bufferLength
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
    if (mute){
      this._volumeBeforeMute = this.volume;
      this.volume = 0;
    } else {
      if (this._volumeBeforeMute) {
        this.volume = this._volumeBeforeMute
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
    return this.volume == 0;
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
    return this._ended;
  }

  /**
   * Seeking to live edge.
   * @function seekToLiveEdge
   * @returns {void}
   * @public
   */
  seekToLiveEdge(): void {
    this.currentTime = this.duration;
  }
}

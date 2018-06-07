(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["flash"] = factory(require("playkit-js"));
	else
		root["playkit"] = root["playkit"] || {}, root["playkit"]["flash"] = factory(root["KalturaPlayer"]["core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = exports.VERSION = undefined;

var _playkitJs = __webpack_require__(0);

var _flash = __webpack_require__(2);

var _flash2 = _interopRequireDefault(_flash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _flash2.default;
exports.VERSION = "1.0.0";
exports.NAME = "playkit-js-flash";


var pluginName = "flash";
_flash2.default.runCapabilities();
_flash2.default.getCapabilities().then(function (capabilites) {
  if (capabilites["flash"].isSupported) {
    _playkitJs.Engines.push(_flash2.default);
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(0);

var _flashIsSupported = __webpack_require__(3);

var _flashIsSupported2 = _interopRequireDefault(_flashIsSupported);

var _flashhlsAdapter = __webpack_require__(4);

var _flashhlsAdapter2 = _interopRequireDefault(_flashhlsAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Your class description.
 * @classdesc
 */
var Flash = function (_FakeEventTarget) {
  _inherits(Flash, _FakeEventTarget);

  _createClass(Flash, null, [{
    key: 'createEngine',

    /**
     * Factory method to create an engine.
     * @param {PKMediaSourceObject} source - The selected source object.
     * @param {Object} config - The player configuration.
     * @returns {IEngine} - New instance of the run time engine.
     * @public
     * @static
     */


    /**
     * The flash capabilities handlers.
     * @private
     * @static
     */


    /**
     * The video element.
     * @type {HTMLVideoElement}
     * @private
     */
    value: function createEngine(source, config) {
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


    /**
     * The event manager of the engine.
     * @type {EventManager}
     * @private
     */

  }, {
    key: 'canPlaySource',
    value: function canPlaySource(source, preferNative) {
      return true;
    }

    /**
     * Runs the html5 capabilities tests.
     * @returns {void}
     * @public
     * @static
     */

  }, {
    key: 'runCapabilities',
    value: function runCapabilities() {
      Flash._capabilities.forEach(function (capability) {
        return capability.runCapability();
      });
    }

    /**
     * Gets the flash capabilities.
     * @return {Promise<Object>} - The html5 capabilities object.
     * @public
     * @static
     */

  }, {
    key: 'getCapabilities',
    value: function getCapabilities() {
      var promises = [];
      Flash._capabilities.forEach(function (capability) {
        return promises.push(capability.getCapability());
      });
      return Promise.all(promises).then(function (arrayOfResults) {
        var mergedResults = {};
        arrayOfResults.forEach(function (res) {
          return Object.assign(mergedResults, res);
        });
        return _defineProperty({}, Flash.id, mergedResults);
      });
    }
    /**
     * For browsers which block auto play, use the user gesture to open the video element and enable playing via API.
     * @returns {void}
     * @private
     * @public
     */

  }, {
    key: 'prepareVideoElement',
    value: function prepareVideoElement() {}
    // Flash._el = Utils.Dom.createElement('div');
    // Flash._el.innerHTML = Flash.getFlashCode('http://flashls.org/flashls-0.4.4.24/bin/debug/flashlsChromeless.swf?inline=1')

    /**
     * @constructor
     * @param {PKMediaSourceObject} source - The selected source object.
     * @param {Object} config - The player configuration.
     */

  }]);

  function Flash(source, config) {
    _classCallCheck(this, Flash);

    var _this = _possibleConstructorReturn(this, (Flash.__proto__ || Object.getPrototypeOf(Flash)).call(this));

    _this._eventManager = new _playkitJs.EventManager();
    _this._api = new _flashhlsAdapter2.default(source, config);
    _this._el = _this._api.attach(_this._el);
    _this._addBindings();
    _this.src = source.url;
    return _this;
  }

  _createClass(Flash, [{
    key: 'reset',
    value: function reset() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._api) {
        this._api.destroy();
      }
    }
  }, {
    key: '_addBindings',
    value: function _addBindings() {
      var _this2 = this;

      if (this._api) {
        // this._eventManager.listen(this._api, CustomEventType.VIDEO_TRACK_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
        // this._eventManager.listen(this._api, CustomEventType.AUDIO_TRACK_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
        // this._eventManager.listen(this._api, CustomEventType.TEXT_TRACK_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
        // this._eventManager.listen(this._api, CustomEventType.ABR_MODE_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
        // this._eventManager.listen(this._api, CustomEventType.TEXT_CUE_CHANGED, (event: FakeEvent) => this.dispatchEvent(event));
        this._eventManager.listen(this._api, _playkitJs.EventType.TRACKS_CHANGED, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.ERROR, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.TIME_UPDATE, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.PLAYING, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.TIME_UPDATE, function (event) {
          _this2.dispatchEvent(event);
          _this2._currentTime = event.payload.position;
          _this2._duration = event.payload.duration;
          _this2._buffer = event.payload.buffer;
          _this2._watched = event.payload.watched;
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.PAUSE, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.LOADED_METADATA, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.LOADED_DATA, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.PLAY, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.VOLUME_CHANGE, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.WAITING, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.SEEKING, function (event) {
          return _this2.dispatchEvent(event);
        });
        this._eventManager.listen(this._api, _playkitJs.EventType.SEEKED, function (event) {
          return _this2.dispatchEvent(event);
        });
      }
    }

    /**
     * @returns {HTMLVideoElement} - The video element.
     * @public
     */

  }, {
    key: 'getVideoElement',
    value: function getVideoElement() {
      return this._el;
    }

    /**
     * Set a source.
     * @param {string} source - Source to set.
     * @public
     * @returns {void}
     */

  }, {
    key: 'load',


    /**
     * Load media.
     * @param {number} startTime - Optional time to start the video from.
     * @public
     * @returns {Promise<Object>} - The loaded data
     */
    value: function load(startTime) {
      var _this3 = this;

      this._api.load(startTime);
      this._loadPromise = new Promise(function (resolve) {
        _this3._eventManager.listenOnce(_this3._api, _playkitJs.EventType.TRACKS_CHANGED, function () {
          resolve();
        });
      });
    }

    /**
     * Start/resume playback.
     * @public
     * @returns {void}
     */

  }, {
    key: 'play',
    value: function play() {
      var _this4 = this;

      if (!this._loadPromise) {
        this.load();
      }
      this._loadPromise.then(function () {
        _this4._api.play();
      });
      window.api = this._api;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._api.pause();
    }

    /**
     * Checking if the current playback is live.
     * @function isLive
     * @returns {boolean} - Whether playback is live.
     * @public
     */

  }, {
    key: 'isLive',
    value: function isLive() {
      return false;
    }

    /**
     * Get the current time in seconds.
     * @returns {Number} - The current playback time.
     * @public
     */

  }, {
    key: 'getStartTimeOfDvrWindow',


    /**
     * Get the start time of DVR window in live playback in seconds.
     * @returns {Number} - start time of DVR window.
     * @public
     */
    value: function getStartTimeOfDvrWindow() {
      return 0;
    }

    /**
     * Seeking to live edge.
     * @function seekToLiveEdge
     * @returns {void}
     * @public
     */

  }, {
    key: 'seekToLiveEdge',
    value: function seekToLiveEdge() {
      this.currentTime = this.duration;
    }
  }, {
    key: 'src',
    set: function set(source) {
      this._src = source;
    }

    /**
     * Get the source url.
     * @returns {string} - The source url.
     * @public
     */
    ,
    get: function get() {
      if (this._src) {
        return this._src;
      }
      return "";
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._currentTime ? this._currentTime : 0;
    }

    /**
     * Set the current time in seconds.
     * @param {Number} to - The number to set in seconds.
     * @public
     * @returns {void}
     */
    ,
    set: function set(to) {
      this._api.seek(to);
    }

    /**
     * Get the duration in seconds.
     * @returns {Number} - The playback duration.
     * @public
     */

  }, {
    key: 'duration',
    get: function get() {
      return this._api.getDuration();
    }
    /**
     * Set playback volume.
     * @param {Number} vol - The volume to set.
     * @public
     * @returns {void}
     */

  }, {
    key: 'volume',
    set: function set(vol) {
      this._volume = vol;
      this._api.volume(vol);
    }

    /**
     * Get playback volume.
     * @returns {Number} - The volume value of the video element.
     * @public
     */
    ,
    get: function get() {
      return this._volume;
    }

    /**
     * Get paused state.
     * @returns {boolean} - The paused value of the video element.
     * @public
     */

  }, {
    key: 'paused',
    get: function get() {
      return false;
    }

    /**
     * Get seeking state.
     * @returns {boolean} - The seeking value of the video element.
     * @public
     */

  }, {
    key: 'seeking',
    get: function get() {
      return false;
    }

    /**
     * Get the first seekable range (part) of the video in seconds.
     * @returns {TimeRanges} - First seekable range (part) of the video in seconds.
     * @public
     */

  }, {
    key: 'seekable',
    get: function get() {
      return 0;
    }

    /**
     * Get the first played range (part) of the video in seconds.
     * @returns {TimeRanges} - First played range (part) of the video in seconds.
     * @public
     */

  }, {
    key: 'played',
    get: function get() {
      return this._watched;
    }

    /**
     * Get the first buffered range (part) of the video in seconds.
     * @returns {TimeRanges} - First buffered range (part) of the video in seconds.
     * @public
     */

  }, {
    key: 'buffered',
    get: function get() {
      var _this5 = this;

      return { length: 1, start: function start() {
          return 0;
        }, end: function end() {
          return _this5._buffer;
        } };
    }

    /**
     * Set player muted state.
     * @param {boolean} mute - The new mute value.
     * @public
     * @returns {void}
     */

  }, {
    key: 'muted',
    set: function set(mute) {
      if (mute) {
        this._volumeBeforeMute = this.volume;
        this.volume = 0;
      } else {
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
    ,
    get: function get() {
      return this.volume == 0;
    }

    /**
     * Get the default mute value.
     * @returns {boolean} - The defaultMuted of the video element.
     * @public
     */

  }, {
    key: 'defaultMuted',
    get: function get() {
      return false;
    }
  }]);

  return Flash;
}(_playkitJs.FakeEventTarget);

Flash._capabilities = [_flashIsSupported2.default];
Flash.id = "flash";
exports.default = Flash;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlashIsSupported = function () {
  function FlashIsSupported() {
    _classCallCheck(this, FlashIsSupported);
  }

  _createClass(FlashIsSupported, null, [{
    key: 'runCapability',


    /***
     * Runs the test for isSupported capability.
     * @public
     * @static
     * @returns {void}
     */
    value: function runCapability() {
      var version = '0,0,0';

      try {
        version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
      } catch (e) {
        try {
          if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
          }
        } catch (err) {
          // ignore
        }
      }
      FlashIsSupported._result = version.split(',')[0] >= 10;
    }

    /**
     * Gets the test result for isSupported capability.
     * @returns {Promise<CapabilityResult>} - The result object for isSupported capability.
     * @static
     * @public
     */

  }, {
    key: 'getCapability',
    value: function getCapability() {
      return Promise.resolve({ isSupported: FlashIsSupported._result });
    }
  }]);

  return FlashIsSupported;
}();

exports.default = FlashIsSupported;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(0);

var _flashApi = __webpack_require__(5);

var _flashApi2 = _interopRequireDefault(_flashApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Your class description.
 * @classdesc
 */
var FlashHLSAdapter = function (_FakeEventTarget) {
  _inherits(FlashHLSAdapter, _FakeEventTarget);

  _createClass(FlashHLSAdapter, null, [{
    key: "getFlashCode",

    /**
     * The event manager of the engine.
     * @type {EventManager}
     * @private
     */
    value: function getFlashCode(swf, flashVars, params, attributes) {
      var objTag = '<object type="application/x-shockwave-flash" ';
      var flashVarsString = '';
      var paramsString = '';
      var attrsString = '';

      // Convert flash vars to string
      if (flashVars) {
        Object.getOwnPropertyNames(flashVars).forEach(function (key) {
          flashVarsString += key + "=" + flashVars[key] + "&amp;";
        });
      }

      // Add swf, flashVars, and other default params
      params = _playkitJs.Utils.Object.mergeDeep({
        movie: swf,
        flashvars: flashVarsString,
        // Required to talk to swf
        allowScriptAccess: 'always',
        // All should be default, but having security issues.
        allowNetworking: 'all',
        wmode: 'transparent',
        bgColor: '#0',
        quality: 'autohigh'

      }, params);

      // Create param tags string
      Object.getOwnPropertyNames(params).forEach(function (key) {
        paramsString += "<param name=\"" + key + "\" value=\"" + params[key] + "\" />";
      });

      attributes = _playkitJs.Utils.Object.mergeDeep({
        // Add swf to attributes (need both for IE and Others to work)
        data: swf,

        // Default to 100% width/height
        width: '100%',
        height: '100%'

      }, attributes);

      // Create Attributes string
      Object.getOwnPropertyNames(attributes).forEach(function (key) {
        attrsString += key + "=\"" + attributes[key] + "\" ";
      });

      return "" + objTag + attrsString + ">" + paramsString + "</object>";
    }
  }]);

  function FlashHLSAdapter(source, config) {
    _classCallCheck(this, FlashHLSAdapter);

    var _this = _possibleConstructorReturn(this, (FlashHLSAdapter.__proto__ || Object.getPrototypeOf(FlashHLSAdapter)).call(this));

    _this._firstPlay = true;
    _this._loadReported = false;

    _this._config = config;
    _this._src = source;

    return _this;
  }

  _createClass(FlashHLSAdapter, [{
    key: "destroy",
    value: function destroy() {
      if (this._el) {
        this._el.innerHTML = '';
      }
    }
  }, {
    key: "attach",
    value: function attach(_el) {
      var _this2 = this;

      this._el = _el;
      this._el = _playkitJs.Utils.Dom.createElement('div');
      this._el.innerHTML = FlashHLSAdapter.getFlashCode('http://flashls.org/flashls-0.4.4.24/bin/debug/flashlsChromeless.swf?inline=1', { callback: 'flashlsCallback' });

      var flashlsEvents = {
        ready: function ready() {
          _this2._api = new _flashApi2.default(_this2._el.firstElementChild);
          if (_this2._initalVolume != null) {
            _this2.volume(_this2._initalVolume);
          }
          if (_this2._waitingForLoad) {
            _this2.load();
          }
          if (_this2._waitingForPlay) {
            _this2.play();
          }
          if (_this2._config.debug) {
            _this2._api.playerSetLogDebug(true);
            _this2._api.playerSetLogDebug2(true);
          }
        },
        videoSize: function videoSize(width, heigh) {},
        levelLoaded: function levelLoaded(loadmetrics) {
          if (!_this2._loadReported) {
            _this2._trigger(_playkitJs.EventType.TRACKS_CHANGED, loadmetrics);
            _this2._trigger(_playkitJs.EventType.LOADED_DATA, loadmetrics);
            _this2._trigger(_playkitJs.EventType.LOADED_METADATA, loadmetrics);
            _this2._loadReported = true;
          }
        },
        complete: function complete() {
          _this2._trigger(_playkitJs.EventType.ENDED);
        },
        position: function position(timemetrics) {
          _this2._trigger(_playkitJs.EventType.TIME_UPDATE, timemetrics);
        },
        error: function error(code, url, message) {
          debugger;
          var error = new _playkitJs.Error(_playkitJs.Error.Severity.CRITICAL, _playkitJs.Error.Category.MEDIA, _playkitJs.Error.Code.VIDEO_ERROR, {
            code: code,
            extended: url,
            message: message
          });
          _this2._trigger(_playkitJs.EventType.ERROR, error);
        },
        manifest: function manifest(duration, levels_, loadmetrics) {},
        seekState: function seekState(newState) {
          if (newState === 'SEEKING') {
            _this2._trigger(_playkitJs.EventType.SEEKING);
            _this2._trigger(_playkitJs.EventType.WAITING);
          }
          if (newState === 'SEEKED') {
            _this2._trigger(_playkitJs.EventType.SEEKED);
          }
        },
        state: function state(newState) {
          //IDLE/PLAYING/PAUSED/PLAYING_BUFFERING/PAUSED_BUFFERING
          switch (newState) {
            case "IDLE":
              _this2._trigger(_playkitJs.EventType.WAITING);
              return;
            case "PLAYING":
              _this2._trigger(_playkitJs.EventType.PLAYING);
              _this2._firstPlay = false;
              break;

            case "PAUSED_BUFFERING":
              _this2._trigger(_playkitJs.EventType.WAITING);
              break;
            case "PAUSED":
              _this2._trigger(_playkitJs.EventType.PAUSE);
              break;

          }
        }

      };
      // Create a single global callback function and pass it's name
      // to the SWF with the name `callback` in the FlashVars parameter.
      window.flashlsCallback = function (eventName, args) {
        // console.warn(eventName,args);
        if (flashlsEvents[eventName]) {
          flashlsEvents[eventName].apply(null, args);
        }
      };
      return this._el;
    }
    /**
     * Dispatch an adapter event forward.
     * @param {string} name - The name of the event.
     * @param {?Object} payload - The event payload.
     * @returns {void}
     */

  }, {
    key: "load",
    value: function load(startTime) {
      if (startTime) {
        this._startTime = startTime;
      }
      if (this._api) {
        this._api.load(this._src.url);
      } else {
        this._waitingForLoad = true;
      }
    }
  }, {
    key: "play",
    value: function play() {
      if (this._api) {
        if (this._firstPlay) {
          this._api.play(this._startTime ? this._startTime : -1);
        } else {
          this._api.resume();
        }
        this._trigger(_playkitJs.EventType.PLAY);
      } else {
        this._waitingForPlay = true;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this._api.pause();
    }
  }, {
    key: "seek",
    value: function seek(to) {
      this._api.seek(to);
    }
  }, {
    key: "volume",
    value: function volume(vol) {
      if (this._api) {
        this._api.volume(vol * 100);
        this._trigger(_playkitJs.EventType.VOLUME_CHANGE);
      } else {
        this._initalVolume = vol;
      }
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this._api.getDuration();
    }
  }, {
    key: "_trigger",
    value: function _trigger(name, payload) {
      this.dispatchEvent(new _playkitJs.FakeEvent(name, payload));
    }
  }]);

  return FlashHLSAdapter;
}(_playkitJs.FakeEventTarget);

exports.default = FlashHLSAdapter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlashAPI = function () {
  function FlashAPI(flashObject) {
    _classCallCheck(this, FlashAPI);

    this.flashObject = flashObject;
  }

  _createClass(FlashAPI, [{
    key: "load",
    value: function load(url) {
      this.flashObject.playerLoad(url);
    }
  }, {
    key: "play",
    value: function play(offset) {
      this.flashObject.playerPlay(offset);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.flashObject.playerPause();
    }
  }, {
    key: "resume",
    value: function resume() {
      this.flashObject.playerResume();
    }
  }, {
    key: "seek",
    value: function seek(offset) {
      this.flashObject.playerSeek(offset);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.flashObject.playerStop();
    }
  }, {
    key: "volume",
    value: function volume(_volume) {
      this.flashObject.playerVolume(_volume);
    }
  }, {
    key: "setCurrentLevel",
    value: function setCurrentLevel(level) {
      this.flashObject.playerSetCurrentLevel(level);
    }
  }, {
    key: "setNextLevel",
    value: function setNextLevel(level) {
      this.flashObject.playerSetNextLevel(level);
    }
  }, {
    key: "setLoadLevel",
    value: function setLoadLevel(level) {
      this.flashObject.playerSetLoadLevel(level);
    }
  }, {
    key: "setMaxBufferLength",
    value: function setMaxBufferLength(len) {
      this.flashObject.playerSetmaxBufferLength(len);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.flashObject.getPosition();
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.flashObject.getDuration();
    }
  }, {
    key: "getbufferLength",
    value: function getbufferLength() {
      return this.flashObject.getbufferLength();
    }
  }, {
    key: "getbackBufferLength",
    value: function getbackBufferLength() {
      return this.flashObject.getbackBufferLength();
    }
  }, {
    key: "getLowBufferLength",
    value: function getLowBufferLength() {
      return this.flashObject.getlowBufferLength();
    }
  }, {
    key: "getMinBufferLength",
    value: function getMinBufferLength() {
      return this.flashObject.getminBufferLength();
    }
  }, {
    key: "getMaxBufferLength",
    value: function getMaxBufferLength() {
      return this.flashObject.getmaxBufferLength();
    }
  }, {
    key: "getLevels",
    value: function getLevels() {
      return this.flashObject.getLevels();
    }
  }, {
    key: "getAutoLevel",
    value: function getAutoLevel() {
      return this.flashObject.getAutoLevel();
    }
  }, {
    key: "getCurrentLevel",
    value: function getCurrentLevel() {
      return this.flashObject.getCurrentLevel();
    }
  }, {
    key: "getNextLevel",
    value: function getNextLevel() {
      return this.flashObject.getNextLevel();
    }
  }, {
    key: "getLoadLevel",
    value: function getLoadLevel() {
      return this.flashObject.getLoadLevel();
    }
  }, {
    key: "getAudioTrackList",
    value: function getAudioTrackList() {
      return this.flashObject.getAudioTrackList();
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this.flashObject.getStats();
    }
  }, {
    key: "setAudioTrack",
    value: function setAudioTrack(trackId) {
      this.flashObject.playerSetAudioTrack(trackId);
    }
  }, {
    key: "playerSetLogDebug",
    value: function playerSetLogDebug(state) {
      this.flashObject.playerSetLogDebug(state);
    }
  }, {
    key: "getLogDebug",
    value: function getLogDebug() {
      return this.flashObject.getLogDebug();
    }
  }, {
    key: "playerSetLogDebug2",
    value: function playerSetLogDebug2(state) {
      this.flashObject.playerSetLogDebug2(state);
    }
  }, {
    key: "getLogDebug2",
    value: function getLogDebug2() {
      return this.flashObject.getLogDebug2();
    }
  }, {
    key: "playerSetUseHardwareVideoDecoder",
    value: function playerSetUseHardwareVideoDecoder(state) {
      this.flashObject.playerSetUseHardwareVideoDecoder(state);
    }
  }, {
    key: "getUseHardwareVideoDecoder",
    value: function getUseHardwareVideoDecoder() {
      return this.flashObject.getUseHardwareVideoDecoder();
    }
  }, {
    key: "playerSetflushLiveURLCache",
    value: function playerSetflushLiveURLCache(state) {
      this.flashObject.playerSetflushLiveURLCache(state);
    }
  }, {
    key: "getflushLiveURLCache",
    value: function getflushLiveURLCache() {
      return this.flashObject.getflushLiveURLCache();
    }
  }, {
    key: "playerSetJSURLStream",
    value: function playerSetJSURLStream(state) {
      this.flashObject.playerSetJSURLStream(state);
    }
  }, {
    key: "getJSURLStream",
    value: function getJSURLStream() {
      return this.flashObject.getJSURLStream();
    }
  }, {
    key: "playerCapLeveltoStage",
    value: function playerCapLeveltoStage(state) {
      this.flashObject.playerCapLeveltoStage(state);
    }
  }, {
    key: "getCapLeveltoStage",
    value: function getCapLeveltoStage() {
      return this.flashObject.getCapLeveltoStage();
    }
  }, {
    key: "playerSetAutoLevelCapping",
    value: function playerSetAutoLevelCapping(level) {
      this.flashObject.playerSetAutoLevelCapping(level);
    }
  }, {
    key: "getAutoLevelCapping",
    value: function getAutoLevelCapping() {
      return this.flashObject.getAutoLevelCapping();
    }
  }]);

  return FlashAPI;
}();

exports.default = FlashAPI;

/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-js-flash.js.map
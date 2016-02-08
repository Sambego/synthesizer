/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Keyboard = __webpack_require__(1);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _Synth = __webpack_require__(3);

	var _Synth2 = _interopRequireDefault(_Synth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(7);

	(function () {
	    var keyboard = new _Keyboard2.default();
	    var synth = new _Synth2.default();

	    var start = function start(mouse, event) {
	        if (mouse) {
	            if (event.target.dataset.note === event.target.dataset.note && event.target.dataset.octave === event.target.dataset.octave) {
	                event.target.classList.add('keyboard__key--active');

	                synth.play(event.target.dataset.note, event.target.dataset.octave);
	            }
	        } else {
	            keyboard.keyDown(event.keyCode, function (key) {
	                document.querySelector('[data-note="' + key.note + '"][data-octave="' + key.octave + '"]').classList.add('keyboard__key--active');

	                synth.play(key.note, key.octave);
	            });
	        }
	    };

	    var stop = function stop(mouse, event) {
	        if (mouse) {
	            event.target.classList.remove('keyboard__key--active');
	        } else {
	            keyboard.keyUp(event.keyCode, function () {
	                document.querySelector('.keyboard__key--active').classList.remove('keyboard__key--active');
	            });
	        }

	        synth.stop();
	    };

	    [].forEach.call(document.querySelectorAll('.keyboard__key'), function (key) {
	        keyboard.registerKey(key.dataset.note, key.dataset.octave, key.dataset.keyboardCode);

	        key.addEventListener('mousedown', start.bind(undefined, true));
	        key.addEventListener('mouseup', stop.bind(undefined, true));
	    });

	    window.addEventListener('keydown', start.bind(undefined, false));
	    window.addEventListener('keyup', stop.bind(undefined, false));

	    document.querySelector('[data-controll="vco1.detune"]').addEventListener('input', function (event) {
	        synth.vco1.detune = event.target.value;
	    });

	    document.querySelector('[data-controll="vco1.octaveUp"]').addEventListener('input', function (event) {
	        synth.vco1.octaveUp = event.target.value;
	    });

	    document.querySelector('[data-controll="vco1.amp"]').addEventListener('input', function (event) {
	        synth.vco1.amp = event.target.value;
	    });

	    document.querySelector('[data-controll="vco2.detune"]').addEventListener('input', function (event) {
	        synth.vco2.detune = event.target.value;
	    });

	    document.querySelector('[data-controll="vco2.octaveUp"]').addEventListener('input', function (event) {
	        synth.vco2.octaveUp = event.target.value;
	    });

	    document.querySelector('[data-controll="vco2.amp"]').addEventListener('input', function (event) {
	        synth.vco2.amp = event.target.value;
	    });

	    document.querySelector('[data-controll="lfo.rate"]').addEventListener('input', function (event) {
	        synth.lfo.rate = event.target.value;
	    });

	    document.querySelector('[data-controll="lfo.amp"]').addEventListener('input', function (event) {
	        synth.lfo.amp = event.target.value;
	    });

	    document.querySelector('[data-controll="vca.gain"]').addEventListener('input', function (event) {
	        synth.gain.gain.value = parseFloat(event.target.value);
	    });
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Key = __webpack_require__(2);

	var _Key2 = _interopRequireDefault(_Key);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        this.keyMapping = {};
	    }

	    _createClass(_class, [{
	        key: 'registerKey',
	        value: function registerKey(note, octave, keyCode) {
	            this.keyMapping[keyCode] = new _Key2.default(note, octave);
	        }
	    }, {
	        key: 'keyDown',
	        value: function keyDown(keyCode, callback) {
	            if (this.keyMapping.hasOwnProperty(keyCode)) {
	                callback(this.keyMapping[keyCode]);
	            }
	        }
	    }, {
	        key: 'keyUp',
	        value: function keyUp(keyCode, callback) {
	            if (this.keyMapping.hasOwnProperty(keyCode)) {
	                callback();
	            }
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Key = function () {
	    function Key(note, octave) {
	        _classCallCheck(this, Key);

	        this.note = note;
	        this.octave = octave;
	    }

	    _createClass(Key, [{
	        key: "isKey",
	        value: function isKey(note, octave) {
	            return this.note === note && this.octave === octave;
	        }
	    }]);

	    return Key;
	}();

	exports.default = Key;
	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _VCO = __webpack_require__(4);

	var _VCO2 = _interopRequireDefault(_VCO);

	var _LFO = __webpack_require__(6);

	var _LFO2 = _interopRequireDefault(_LFO);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Synth = function () {
	    function Synth() {
	        _classCallCheck(this, Synth);

	        this.audioContext = new AudioContext();

	        this.vco1 = new _VCO2.default(this.audioContext);
	        this.vco2 = new _VCO2.default(this.audioContext);
	        this.lfo = new _LFO2.default(this.audioContext);
	        this.gain = this.audioContext.createGain();
	        this.gain.gain.value = 1;

	        this.lfo.connect(this.vco1.oscillator.frequency);
	        this.lfo.connect(this.vco2.oscillator.frequency);
	        this.vco1.connect(this.gain);
	        this.vco2.connect(this.gain);
	        this.gain.connect(this.audioContext.destination);
	    }

	    _createClass(Synth, [{
	        key: 'play',
	        value: function play(note, octave) {
	            this.vco1.play(note, octave);
	            this.vco2.play(note, octave);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.vco1.stop();
	            this.vco2.stop();
	        }
	    }]);

	    return Synth;
	}();

	exports.default = Synth;
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _FrequencyCalculator = __webpack_require__(5);

	var _FrequencyCalculator2 = _interopRequireDefault(_FrequencyCalculator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VCO = function () {
	    function VCO(audioContext) {
	        var type = arguments.length <= 1 || arguments[1] === undefined ? 'sawtooth' : arguments[1];

	        _classCallCheck(this, VCO);

	        this._detune = 0;
	        this._frequency = 0;
	        this._amp = 1;
	        this._note = 'C';
	        this._octave = 0;
	        this._octaveUp = 2;

	        this.oscillator = audioContext.createOscillator();
	        this.oscillator.frequency.value = 1;
	        this.oscillator.type = type;
	        this.oscillator.start(0);

	        this.gain = audioContext.createGain();
	        this.gain.gain.value = this._amp;

	        this.input = this.oscillator;
	        this.output = this.gain;

	        this.oscillator.connect(this.gain);
	    }

	    _createClass(VCO, [{
	        key: 'calculateFrequency',
	        value: function calculateFrequency() {
	            return _FrequencyCalculator2.default.calculateFrequencyByStep(_FrequencyCalculator2.default.calculateSteps(this._note, this._octave) + this._detune + this._octaveUp * 12);
	        }
	    }, {
	        key: 'connect',
	        value: function connect(input) {
	            return this.output.connect(input);
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var note = arguments.length <= 0 || arguments[0] === undefined ? 'C' : arguments[0];
	            var octave = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            this._note = note;
	            this._octave = parseInt(octave);
	            this._frequency = this.calculateFrequency();
	            this.oscillator.frequency.value = this.frequency;

	            this.gain.gain.value = this._amp;
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.gain.gain.value = 0;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.oscillator.stop();
	            this.oscillator.disconnect();

	            this.gain.disconnect();
	        }
	    }, {
	        key: 'frequency',
	        get: function get() {
	            return this._frequency;
	        },
	        set: function set(frequency) {
	            this._frequency = parseFloat(frequency);
	            this.oscillator.frequency.value = this._frequency;

	            return this._frequency;
	        }
	    }, {
	        key: 'detune',
	        get: function get() {
	            return this._detune;
	        },
	        set: function set(detune) {
	            this._detune = parseInt(detune);
	            this._frequency = this.calculateFrequency();
	            this.oscillator.frequency.value = this._frequency;

	            return this._detune;
	        }
	    }, {
	        key: 'amp',
	        get: function get() {
	            return this._amp;
	        },
	        set: function set(amplitude) {
	            this._amp = parseFloat(amplitude);
	            this.gain.gain.value = this._amp;

	            return this._amp;
	        }
	    }, {
	        key: 'octaveUp',
	        get: function get() {
	            return this._octave;
	        },
	        set: function set(octave) {
	            this._octaveUp = parseInt(octave);
	            this.frequency = this.calculateFrequency();
	            this.oscillator.frequency.value = this._frequency;

	            return this._octaveUp;
	        }
	    }]);

	    return VCO;
	}();

	exports.default = VCO;
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * The base frequency, we'll use A4 since this is a nice whole number
	 * @type {Number}
	 */
	var _base = 440.0; // A4

	/**
	 * The amount of half steps a note is from A
	 * @type {Array}
	 */
	var _steps = {
	  C: -9,
	  Csharp: -8,
	  D: -7,
	  Dsharp: -6,
	  E: -5,
	  F: -4,
	  Fsharp: -3,
	  G: -2,
	  Gsharp: -1,
	  A: 0,
	  Asharp: 1,
	  B: 2
	};

	var FrequencyCalculator = function () {
	  function FrequencyCalculator() {
	    _classCallCheck(this, FrequencyCalculator);
	  }

	  _createClass(FrequencyCalculator, null, [{
	    key: "calculateSteps",

	    /**
	     * Calculate the amount of half steps between A4 and a given note anc octave
	     * @param  {String} note   [The note]
	     * @param  {Number} octave [The octave]
	     * @return {Number}        [The number of half steps]
	     */
	    value: function calculateSteps(note, octave) {
	      return (4 - octave) * -12 + _steps[note];
	    }

	    /**
	     * Calculate the frequency of a note based on the amount of half steps
	     * above or below the base note (A4)
	     * @param  {Number} steps [The number of half steps]
	     * @return {Number}       [The calculated frequency]
	     */

	  }, {
	    key: "calculateFrequencyByStep",
	    value: function calculateFrequencyByStep(steps) {
	      return _base * Math.pow(Math.pow(2, 1 / 12), steps);
	    }

	    /**
	     * Calculate the frequency of a note based on the note and octave
	     * @param  {String} note   [description]
	     * @param  {Number} octave [description]
	     * @return {Number}        [description]
	     */

	  }, {
	    key: "calculateFrequencyByNote",
	    value: function calculateFrequencyByNote(note, octave) {
	      return this.calculateFrequencyByStep(this.calculateSteps(note, octave));
	    }
	  }]);

	  return FrequencyCalculator;
	}();

	exports.default = FrequencyCalculator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _VCO2 = __webpack_require__(4);

	var _VCO3 = _interopRequireDefault(_VCO2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LFO = function (_VCO) {
	    _inherits(LFO, _VCO);

	    function LFO(audioContext) {
	        var type = arguments.length <= 1 || arguments[1] === undefined ? 'sine' : arguments[1];

	        _classCallCheck(this, LFO);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LFO).call(this, audioContext, type));

	        _this.oscillator.type = type;
	        return _this;
	    }

	    _createClass(LFO, [{
	        key: 'rate',
	        get: function get() {
	            return this._frequency;
	        },
	        set: function set(rate) {
	            this._frequency = parseFloat(rate);
	            this.oscillator.frequency.value = this._frequency;

	            return this._frequency;
	        }
	    }]);

	    return LFO;
	}(_VCO3.default);

	exports.default = LFO;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Set box-sizing to border-box\n */\n* {\n  box-sizing: border-box; }\n\n/**\n * Set the perspective of the body\n */\nbody {\n  perspective: 70rem;\n  perspective-origin: 45rem 0;\n  font-family: Helvetica, arial, sans-serif; }\n\n/**\n * The synthesize part\n */\n.synth {\n  position: relative;\n  width: 70rem;\n  margin: 2rem auto 0;\n  padding: 0 2rem; }\n\n/**\n * The wooden edges of the synth\n */\n.edge--left,\n.edge--right {\n  position: absolute;\n  top: -0.1rem;\n  bottom: -0.1rem;\n  left: 0;\n  width: 2rem;\n  background: #C57432;\n  border-radius: 4px; }\n\n.edge--right {\n  left: auto;\n  right: 0; }\n\n/**\n * The synthsizer controll-panel\n */\n.synth__control-panel {\n  height: 20rem;\n  background: #333949; }\n\n/**\n * The keyboard\n */\n.keyboard {\n  transform: rotateX(30deg);\n  position: relative;\n  width: 72.5rem;\n  margin: 0rem auto 2rem;\n  padding: 0 2rem; }\n\n.keyboard__key-holder {\n  height: 10rem;\n  background: #333949; }\n\n.keyboard__key {\n  position: relative;\n  float: left;\n  width: 5.55556%;\n  height: 100%;\n  background: #fff;\n  border: 1px solid #dcdcdc; }\n  .keyboard__key.keyboard__key--active {\n    background: #f2f2f2; }\n\n.keyboard__key--keyboard::before {\n  content: attr(data-keyboard-key);\n  position: absolute;\n  bottom: 1rem;\n  left: 50%;\n  width: 1rem;\n  height: .4rem;\n  margin-left: -0.5rem;\n  padding: .2rem 0 0.3rem;\n  background: rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  font-size: .6rem;\n  color: #fff;\n  text-align: center;\n  vertical-align: middle; }\n\n.keyboard__key-holder--black {\n  position: absolute;\n  top: 0;\n  bottom: 30%;\n  left: 0;\n  right: 0;\n  padding: 0 2rem; }\n\n.keyboard__key--black {\n  float: left;\n  width: 2.77778%;\n  height: 100%;\n  margin-left: 2.77778%;\n  background: #000; }\n  .keyboard__key--black.keyboard__key--active {\n    background: #222; }\n  .keyboard__key--black.keyboard__key--keyboard::before {\n    background: rgba(255, 255, 255, 0.2); }\n\n.keyboard__key--black--offset {\n  margin-left: 8.33333%; }\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
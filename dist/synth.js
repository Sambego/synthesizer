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

	var _Synth = __webpack_require__(7);

	var _Synth2 = _interopRequireDefault(_Synth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(3);

	(function () {
	    var keyboard = new _Keyboard2.default();
	    var synth = new _Synth2.default();
	    var keyMapping = {
	        65: { note: 'C', octave: 2 },
	        87: { note: 'Csharp', octave: 2 },
	        83: { note: 'D', octave: 2 },
	        69: { note: 'Dsharp', octave: 2 },
	        68: { note: 'E', octave: 2 },
	        70: { note: 'F', octave: 2 },
	        84: { note: 'Fsharp', octave: 2 },
	        71: { note: 'G', octave: 2 },
	        89: { note: 'Gsharp', octave: 2 },
	        72: { note: 'A', octave: 2 },
	        85: { note: 'Asharp', octave: 2 },
	        74: { note: 'B', octave: 2 },
	        75: { note: 'C', octave: 3 },
	        79: { note: 'Csharp', octave: 3 },
	        76: { note: 'D', octave: 3 },
	        80: { note: 'Dsharp', octave: 3 },
	        186: { note: 'E', octave: 3 },
	        222: { note: 'F', octave: 3 },
	        221: { note: 'Fsharp', octave: 3 },
	        220: { note: 'G', octave: 3 }
	    };

	    var start = function start(mouse, event) {
	        console.log(event, mouse);
	        if (mouse || !mouse && keyMapping.hasOwnProperty(event.keyCode)) {
	            keyboard.keys.forEach(function (key) {
	                if (mouse) {
	                    if (key.note === event.target.dataset.note && key.octave === event.target.dataset.octave) {
	                        event.target.classList.add('keyboard__key--active');

	                        synth.play(key.frequency);
	                    }
	                } else {
	                    if (key.note === keyMapping[event.keyCode].note && key.octave === String(keyMapping[event.keyCode].octave)) {
	                        document.querySelector('[data-note="' + keyMapping[event.keyCode].note + '"][data-octave="' + keyMapping[event.keyCode].octave + '"]').classList.add('keyboard__key--active');

	                        synth.play(key.frequency);
	                    }
	                }
	            });
	        }
	    };

	    var stop = function stop(mouse, event) {
	        if (!mouse && keyMapping.hasOwnProperty(event.keyCode)) {
	            document.querySelector('.keyboard__key--active').classList.remove('keyboard__key--active');
	        } else {
	            event.target.classList.remove('keyboard__key--active');
	        }

	        synth.stop();
	    };

	    [].forEach.call(document.querySelectorAll('.keyboard__key'), function (key) {
	        keyboard.registerKey(key.dataset.note, key.dataset.octave);

	        key.addEventListener('mousedown', start.bind(event, true));
	        key.addEventListener('mouseup', stop.bind(event, true));
	    });

	    window.addEventListener('keydown', start.bind(event, false));
	    window.addEventListener('keyup', stop.bind(event, false));
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

	/**
	 * The base frequency, we'll use A4 since this is a nice whole number
	 * @type {Number}
	 */
	var _base = 440.0; // A4

	/**
	 * the half steps a note is from A
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

	/**
	 * Calculate the amount of half steps between A4 and a given note anc octave
	 * @param  {String} note   [The note]
	 * @param  {Number} octave [The octave]
	 * @return {Number}        [The number of half steps]
	 */
	var _calculateSteps = function _calculateSteps(note, octave) {
	    if (octave === 4) {
	        return _steps[note];
	    } else {
	        return (4 - octave) * -12 + _steps[note];
	    }
	};

	/**
	 * Calculate the frequency of a note
	 * @param  {Number} steps [The number of half steps]
	 * @return {Number}       [The calculated frequency]
	 */
	var _calculateFrequency = function _calculateFrequency(steps) {
	    return _base * Math.pow(Math.pow(2, 1 / 12), steps);
	};

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        this.keys = [];
	    }

	    _createClass(_class, [{
	        key: 'registerKey',
	        value: function registerKey(note, octave) {
	            this.keys.push(new _Key2.default(note, octave, _calculateFrequency(_calculateSteps(note, octave))));
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
	    function Key(note, octave, frequency) {
	        _classCallCheck(this, Key);

	        this.note = note;
	        this.octave = octave;
	        this.frequency = frequency;
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

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "/**\n * Variables\n */\n/**\n * Set box-sizing to border-box\n */\n* {\n  box-sizing: border-box; }\n\n/**\n * Set the perspective of the body\n */\nbody {\n  perspective: 70rem;\n  perspective-origin: 45rem 0;\n  font-family: Helvetica, arial, sans-serif; }\n\n/**\n * The synthesize part\n */\n.synth {\n  position: relative;\n  width: 70rem;\n  margin: 2rem auto 0;\n  padding: 0 2rem; }\n\n/**\n * The wooden edges of the synth\n */\n.edge--left,\n.edge--right {\n  position: absolute;\n  top: -0.1rem;\n  bottom: -0.1rem;\n  left: 0;\n  width: 2rem;\n  background: #C57432;\n  border-radius: 4px; }\n\n.edge--right {\n  left: auto;\n  right: 0; }\n\n/**\n * The synthsizer controll-panel\n */\n.synth__control-panel {\n  height: 20rem;\n  background: #333949; }\n\n/**\n * The keyboard\n */\n.keyboard {\n  transform: rotateX(30deg);\n  position: relative;\n  width: 72.5rem;\n  margin: 0rem auto 2rem;\n  padding: 0 2rem; }\n\n.keyboard__key-holder {\n  height: 10rem;\n  background: #333949; }\n\n.keyboard__key {\n  position: relative;\n  float: left;\n  width: 5.55556%;\n  height: 100%;\n  background: #fff;\n  border: 1px solid #dcdcdc; }\n  .keyboard__key.keyboard__key--active {\n    background: #f2f2f2; }\n\n.keyboard__key--keyboard::before {\n  content: attr(data-keyboard-key);\n  position: absolute;\n  bottom: 1rem;\n  left: 50%;\n  width: 1rem;\n  height: .4rem;\n  margin-left: -0.5rem;\n  padding: .2rem 0 0.3rem;\n  background: rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  font-size: .6rem;\n  color: #fff;\n  text-align: center;\n  vertical-align: middle; }\n\n.keyboard__key-holder--black {\n  position: absolute;\n  top: 0;\n  bottom: 30%;\n  left: 0;\n  right: 0;\n  padding: 0 2rem; }\n\n.keyboard__key--black {\n  float: left;\n  width: 2.77778%;\n  height: 100%;\n  margin-left: 2.77778%;\n  background: #000; }\n  .keyboard__key--black.keyboard__key--active {\n    background: #222; }\n  .keyboard__key--black.keyboard__key--keyboard::before {\n    background: rgba(255, 255, 255, 0.2); }\n\n.keyboard__key--black--offset {\n  margin-left: 8.33333%; }\n", ""]);

	// exports


/***/ },
/* 5 */
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
/* 6 */
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Synth = function () {
	    function Synth() {
	        _classCallCheck(this, Synth);

	        this.audioContext = new AudioContext();

	        this.oscillator1 = this.audioContext.createOscillator();
	        this.oscillator1.frequency.value = 1;
	        this.oscillator1.type = 'sawtooth';
	        this.oscillator1.start();

	        this.gain = this.audioContext.createGain();
	        this.gain.gain.value = 0;

	        this.oscillator1.connect(this.gain);
	        this.gain.connect(this.audioContext.destination);
	    }

	    _createClass(Synth, [{
	        key: 'play',
	        value: function play(frequency) {
	            this.oscillator1.frequency.value = frequency;

	            this.gain.gain.value = 1;
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.gain.gain.value = 0;
	        }
	    }]);

	    return Synth;
	}();

	exports.default = Synth;
	;

/***/ }
/******/ ]);
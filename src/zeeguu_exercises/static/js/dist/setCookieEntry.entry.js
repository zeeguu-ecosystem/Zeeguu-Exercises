/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//noinspection JSAnnotator
/**
 * File containing global settings for exercises
 * */

exports.default = {
    /*********************** Exercise API Parameters **************************/

    ZEEGUU_API: 'https://zeeguu.unibe.ch/api',
    ZEEGUU_SESSION_ID: 'sessionID',
    ZEEGUU_DEFAULT_COOKIE_EXPIRATION: 21, //days
    ZEEGUU_DEFAULT_SESSION: '34563456', //00926044 34563456 11010001

    /******************** Exercise Bookmark Parameters ************************/
    ZEEGUU_STUDY_BOOKMARKS: '/bookmarks_to_study/',

    /*********************** Exercise Outcome Parameters **************************/

    /** Current endpoint for submitting the result*/
    ZEEGUU_EX_OUTCOME_ENDPOINT: '/report_exercise_outcome',

    /** Source types for exercise outcome */
    ZEEGUU_EX_SOURCE_RECOGNIZE: '/Recognize_L1W_in_L2T',
    ZEEGUU_EX_SOURCE_SELECT: '/Select_L2W_fitting_L2T',
    ZEEGUU_EX_SOURCE_MATCH: '/Match_three_L1W_to_three_L2W',
    ZEEGUU_EX_SOURCE_TRANSLATE: '/L1W_to_L1W_with_L2T_Example',

    /** Outcome types for exercise */
    ZEEGUU_EX_OUTCOME_CORRECT: '/Correct',
    ZEEGUU_EX_OUTCOME_WRONG: '/Wrong',
    ZEEGUU_EX_OUTCOME_HINT: '/Asked_for_hint'

};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Martin on 5/4/2017.
 */

var cookieHandler = function () {
    function cookieHandler() {
        _classCallCheck(this, cookieHandler);
    }

    _createClass(cookieHandler, null, [{
        key: 'getCookie',

        /**
         * Retrive cookie given the
         * @param {String} name, cookie name
         * */
        value: function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return '';
        }

        /**
         * Set cookie given the
         * @param {String} name, cookie identifier
         * @param {Object} value, value of the cookie
         * @param {int} days, expiration time
         * */

    }, {
        key: 'setCookie',
        value: function setCookie(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = '';
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }
    }]);

    return cookieHandler;
}();

exports.default = cookieHandler;

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _session = __webpack_require__(4);

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_session2.default.setSession();

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Martin on 5/4/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _cookie_handler = __webpack_require__(13);

var _cookie_handler2 = _interopRequireDefault(_cookie_handler);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sessionID = null;

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);
    }

    _createClass(Session, null, [{
        key: 'getSession',


        /**
         * @param name, name of the session identifier
         * @default from Zeeguu Settings
         * */
        value: function getSession() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _settings2.default.ZEEGUU_SESSION_ID;

            if (sessionID) return sessionID;
            sessionID = _cookie_handler2.default.getCookie(name);
            return sessionID;
        }

        /**
         *  Set the zeeguu sessionID cookie to the default session
         * @param name, cookie identifier
         * @param value, value of the cookie
         * @param days, expiration time
         * @default form Zeeguu Settings
         * */

    }, {
        key: 'setSession',
        value: function setSession() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _settings2.default.ZEEGUU_SESSION_ID;
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings2.default.ZEEGUU_DEFAULT_SESSION;
            var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _settings2.default.ZEEGUU_DEFAULT_COOKIE_EXPIRATION;

            _cookie_handler2.default.setCookie(name, value, days);
        }
    }]);

    return Session;
}();

exports.default = Session;

/***/ })

/******/ });
//# sourceMappingURL=setCookieEntry.entry.js.map
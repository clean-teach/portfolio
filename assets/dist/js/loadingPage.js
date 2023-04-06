/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/loadingPage.ts":
/*!**************************************!*\
  !*** ./src/client/js/loadingPage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ \"./src/client/js/utils/utils.ts\");\n\r\n(function loadingPage() {\r\n    var textFadeOutTime = 5000;\r\n    var pageFadeOutTime = 7000;\r\n    var loader;\r\n    document.addEventListener('DOMContentLoaded', function () {\r\n        loader = document.querySelector('#loader');\r\n        useLoadingBar.createLoadingBar(loader);\r\n        useLoadingBar.playLoadingBar(pageFadeOutTime);\r\n    });\r\n    window.addEventListener('load', windowLoadHandler);\r\n    function windowLoadHandler() {\r\n        var opacity = Number(window.getComputedStyle(loader).getPropertyValue('opacity'));\r\n        window.scrollTo({ top: 0, left: 0 });\r\n        setTimeout(function () {\r\n            var fadeOut = setInterval(function () {\r\n                if (opacity > 0) {\r\n                    opacity -= 0.01;\r\n                    loader.querySelectorAll('p').forEach(function (p) {\r\n                        p.style.opacity = \"\".concat(opacity);\r\n                    });\r\n                }\r\n                else {\r\n                    clearInterval(fadeOut);\r\n                }\r\n            }, 10);\r\n        }, textFadeOutTime);\r\n        setTimeout(function () {\r\n            window.scrollTo({ top: 0, left: 0 });\r\n            useLoadingBar.stopLoadingBar();\r\n            loader.remove();\r\n        }, pageFadeOutTime);\r\n    }\r\n    var useLoadingBar = {\r\n        loadingBar: {\r\n            element: document.createElement('div'),\r\n            color: '#ffffff',\r\n            weight: 4,\r\n        },\r\n        actionLoadingBar: null,\r\n        createLoadingBar: function (parentElement) {\r\n            this.loadingBar.element.style.background = this.loadingBar.color;\r\n            this.loadingBar.element.style.height = \"\".concat(this.loadingBar.weight, \"px\");\r\n            this.loadingBar.element.style.position = 'absolute';\r\n            this.loadingBar.element.style.left = '0';\r\n            this.loadingBar.element.style.top = '0';\r\n            parentElement.prepend(this.loadingBar.element);\r\n        },\r\n        playLoadingBar: function (time) {\r\n            var _this = this;\r\n            var second = 0;\r\n            this.actionLoadingBar = setInterval(function () {\r\n                second += 10;\r\n                _this.loadingBar.element.style.width = \"\".concat((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getPercentage)(second, time, 100), \"%\");\r\n            }, 10);\r\n        },\r\n        stopLoadingBar: function () {\r\n            clearInterval(this.actionLoadingBar);\r\n            this.actionLoadingBar = null;\r\n        },\r\n    };\r\n})();\r\n\n\n//# sourceURL=webpack://www/./src/client/js/loadingPage.ts?");

/***/ }),

/***/ "./src/client/js/utils/utils.ts":
/*!**************************************!*\
  !*** ./src/client/js/utils/utils.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCurrentScrollBottomEnd\": () => (/* binding */ getCurrentScrollBottomEnd),\n/* harmony export */   \"getPercentage\": () => (/* binding */ getPercentage),\n/* harmony export */   \"getPythagorean\": () => (/* binding */ getPythagorean),\n/* harmony export */   \"getScrollDirection\": () => (/* binding */ getScrollDirection),\n/* harmony export */   \"optimizeAnimation\": () => (/* binding */ optimizeAnimation),\n/* harmony export */   \"padStart\": () => (/* binding */ padStart),\n/* harmony export */   \"random\": () => (/* binding */ random),\n/* harmony export */   \"scrollRotate\": () => (/* binding */ scrollRotate)\n/* harmony export */ });\nvar scrollBaseValue = 0;\r\nvar getScrollDirection = function () {\r\n    var result;\r\n    if (scrollBaseValue < window.scrollY)\r\n        result = 'DOWN';\r\n    else\r\n        result = 'UP';\r\n    scrollBaseValue = window.scrollY;\r\n    return result;\r\n};\r\nfunction getCurrentScrollBottomEnd() {\r\n    var pageScrollHeight = document.body.scrollHeight;\r\n    var winInnerHeight = window.innerHeight;\r\n    var scrollBottom = document.documentElement.scrollTop + winInnerHeight;\r\n    if ((pageScrollHeight - scrollBottom) == 0) {\r\n        return true;\r\n    }\r\n    else {\r\n        return false;\r\n    }\r\n}\r\nfunction getPythagorean(a, b) {\r\n    var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));\r\n    return result;\r\n}\r\nfunction random(min, max) {\r\n    var num = Math.floor(Math.random() * (max - min + 1)) + min;\r\n    return num;\r\n}\r\nfunction getPercentage(parts, whole, standard) {\r\n    return (parts / whole) * standard;\r\n}\r\nfunction scrollRotate(id) {\r\n    var obj = document.getElementById(id);\r\n    var CLASS_NAME_ANIMATION = 'rotate-animate';\r\n    obj.style.transform = \"rotate(\" + window.pageYOffset / 10 + \"deg)\";\r\n    if (document.documentElement.scrollTop !== 0) {\r\n        obj.classList.remove(CLASS_NAME_ANIMATION);\r\n    }\r\n    else {\r\n        obj.classList.add(CLASS_NAME_ANIMATION);\r\n    }\r\n}\r\nfunction optimizeAnimation(callback) {\r\n    var ticking = false;\r\n    return function () {\r\n        if (!ticking) {\r\n            ticking = true;\r\n            requestAnimationFrame(function () {\r\n                callback();\r\n                ticking = false;\r\n            });\r\n        }\r\n    };\r\n}\r\nvar padStart = function (targetLength, padString, str) {\r\n    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;\r\n};\r\n\n\n//# sourceURL=webpack://www/./src/client/js/utils/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/loadingPage.ts");
/******/ 	
/******/ })()
;
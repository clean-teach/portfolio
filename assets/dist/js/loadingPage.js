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
/***/ (() => {

eval("\r\n(function loadingPage() {\r\n    var loader;\r\n    document.addEventListener('DOMContentLoaded', function () {\r\n        loader = document.querySelector('#loader');\r\n    });\r\n    window.addEventListener('load', windowLoadHandler);\r\n    console.log('힝');\r\n    function windowLoadHandler() {\r\n        var opacity = Number(window.getComputedStyle(loader).getPropertyValue('opacity'));\r\n        window.scrollTo({ top: 0, left: 0 });\r\n        setTimeout(function () {\r\n            var fadeOut = setInterval(function () {\r\n                if (opacity > 0) {\r\n                    opacity -= 0.01;\r\n                    loader.querySelectorAll('p').forEach(function (p) {\r\n                        p.style.opacity = \"\".concat(opacity);\r\n                    });\r\n                }\r\n                else {\r\n                    clearInterval(fadeOut);\r\n                }\r\n            }, 10);\r\n        }, 3000);\r\n        setTimeout(function () {\r\n            window.scrollTo({ top: 0, left: 0 });\r\n            loader.remove();\r\n        }, 5000);\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://www/./src/client/js/loadingPage.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/loadingPage.ts"]();
/******/ 	
/******/ })()
;
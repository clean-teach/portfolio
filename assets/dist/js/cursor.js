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

/***/ "./src/client/js/cursor.ts":
/*!*********************************!*\
  !*** ./src/client/js/cursor.ts ***!
  \*********************************/
/***/ (() => {

eval("\r\n(function createSetMouseCursorStyle() {\r\n    var ID_NAME_MOUSE_CURSOR = 'mouseCursor';\r\n    var CLASS_NAME_MOUSE_CURSOR_POINTER = 'pointer';\r\n    var mouseCursor = document.createElement('div');\r\n    mouseCursor.id = ID_NAME_MOUSE_CURSOR;\r\n    mouseCursor.innerHTML = '<div><div></div></div>';\r\n    document.body.appendChild(mouseCursor);\r\n    document.querySelectorAll('a, button').forEach(function (tg) {\r\n        tg.addEventListener('mouseenter', function (e) {\r\n            var targetElement = e.target;\r\n            console.log();\r\n            if (targetElement instanceof HTMLButtonElement &&\r\n                !(targetElement === null || targetElement === void 0 ? void 0 : targetElement.disabled)) {\r\n                mouseCursor.classList.add(CLASS_NAME_MOUSE_CURSOR_POINTER);\r\n            }\r\n        });\r\n        tg.addEventListener('mouseleave', function (e) {\r\n            mouseCursor.classList.remove(CLASS_NAME_MOUSE_CURSOR_POINTER);\r\n        });\r\n    });\r\n    document.addEventListener('mousemove', function (e) {\r\n        mouseCursor.style['top'] = e.clientY - mouseCursor.clientHeight / 2 + 'px';\r\n        mouseCursor.style['left'] = e.clientX - mouseCursor.clientWidth / 2 + 'px';\r\n    });\r\n})();\r\n\n\n//# sourceURL=webpack://www/./src/client/js/cursor.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/cursor.ts"]();
/******/ 	
/******/ })()
;
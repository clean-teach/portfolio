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

/***/ "./src/client/js/form-submission-handler.ts":
/*!**************************************************!*\
  !*** ./src/client/js/form-submission-handler.ts ***!
  \**************************************************/
/***/ (() => {

eval("\r\n(function () {\r\n    function getFormData(form) {\r\n        var elements = form.elements;\r\n        var honeypot;\r\n        var fields = Object.keys(elements).filter(function (k) {\r\n            if (elements[k].name === \"honeypot\") {\r\n                honeypot = elements[k].value;\r\n                return false;\r\n            }\r\n            return true;\r\n        }).map(function (k) {\r\n            if (elements[k].name !== undefined) {\r\n                return elements[k].name;\r\n            }\r\n            else if (elements[k].length > 0) {\r\n                return elements[k].item(0).name;\r\n            }\r\n        }).filter(function (item, pos, self) {\r\n            return self.indexOf(item) == pos && item;\r\n        });\r\n        var formData = {};\r\n        fields.forEach(function (name) {\r\n            var element = elements[name];\r\n            formData[name] = element.value;\r\n            if (element.length) {\r\n                var data = [];\r\n                for (var i = 0; i < element.length; i++) {\r\n                    var item = element.item(i);\r\n                    if (item.checked || item.selected) {\r\n                        data.push(item.value);\r\n                    }\r\n                }\r\n                formData[name] = data.join(', ');\r\n            }\r\n        });\r\n        formData.formDataNameOrder = JSON.stringify(fields);\r\n        formData.formGoogleSheetName = form.dataset.sheet || \"responses\";\r\n        formData.formGoogleSendEmail\r\n            = form.dataset.email || \"\";\r\n        return { data: formData, honeypot: honeypot };\r\n    }\r\n    function handleFormSubmit(event) {\r\n        event.preventDefault();\r\n        var form = event.target;\r\n        var formData = getFormData(form);\r\n        var data = formData.data;\r\n        if (formData.honeypot) {\r\n            return false;\r\n        }\r\n        disableAllButtons(form);\r\n        var url = form.action;\r\n        var xhr = new XMLHttpRequest();\r\n        xhr.open('POST', url);\r\n        xhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n        xhr.onreadystatechange = function () {\r\n            var _this = this;\r\n            if (xhr.readyState === 4 && xhr.status === 200) {\r\n                form.reset();\r\n                var formElements = form.querySelector(\".form-elements\");\r\n                if (formElements) {\r\n                    formElements.style.display = \"none\";\r\n                }\r\n                var thankYouMessage = form.querySelector(\".thankyou_message\");\r\n                if (thankYouMessage) {\r\n                    thankYouMessage.style.display = \"block\";\r\n                    thankYouMessage.querySelector('.btn-ok').addEventListener('click', function () {\r\n                        console.log(_this);\r\n                    });\r\n                }\r\n                else {\r\n                    alert('소중한 말씀 보내주셔서 감사합니다! 빠른 시일 내에 답변 드리겠습니다!');\r\n                }\r\n            }\r\n        };\r\n        var encoded = Object.keys(data).map(function (k) {\r\n            return encodeURIComponent(k) + \"=\" + encodeURIComponent(data[k]);\r\n        }).join('&');\r\n        xhr.send(encoded);\r\n    }\r\n    function loaded() {\r\n        var forms = document.querySelectorAll(\"form.gform\");\r\n        for (var i = 0; i < forms.length; i++) {\r\n            forms[i].addEventListener(\"submit\", handleFormSubmit, false);\r\n        }\r\n    }\r\n    ;\r\n    document.addEventListener(\"DOMContentLoaded\", loaded, false);\r\n    function disableAllButtons(form) {\r\n        var buttons = form.querySelectorAll(\"button\");\r\n        for (var i = 0; i < buttons.length; i++) {\r\n            buttons[i].disabled = true;\r\n        }\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://www/./src/client/js/form-submission-handler.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/form-submission-handler.ts"]();
/******/ 	
/******/ })()
;
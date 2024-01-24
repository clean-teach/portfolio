/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/client/js/utils/utils.ts
var scrollBaseValue = 0;
var getScrollDirection = function () {
    var result;
    if (scrollBaseValue < window.scrollY)
        result = 'DOWN';
    else
        result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
};
function getCurrentScrollBottomEnd() {
    var pageScrollHeight = document.body.scrollHeight;
    var winInnerHeight = window.innerHeight;
    var scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    if ((pageScrollHeight - scrollBottom) == 0) {
        return true;
    }
    else {
        return false;
    }
}
function getPythagorean(a, b) {
    var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return result;
}
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
function getPercentage(parts, whole, standard) {
    return (parts / whole) * standard;
}
function scrollRotate(id) {
    var obj = document.getElementById(id);
    var CLASS_NAME_ANIMATION = 'rotate-animate';
    obj.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
    if (document.documentElement.scrollTop !== 0) {
        obj.classList.remove(CLASS_NAME_ANIMATION);
    }
    else {
        obj.classList.add(CLASS_NAME_ANIMATION);
    }
}
function optimizeAnimation(callback) {
    var ticking = false;
    return function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                callback();
                ticking = false;
            });
        }
    };
}
var padStart = function (targetLength, padString, str) {
    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;
};

;// CONCATENATED MODULE: ./src/client/js/loadingPage.ts

(function loadingPage() {
    var textFadeOutTime = 5000;
    var pageFadeOutTime = 7000;
    var loader;
    document.addEventListener('DOMContentLoaded', function () {
        loader = document.querySelector('#loading-area');
        useLoadingBar.createLoadingBar(loader);
        useLoadingBar.playLoadingBar(pageFadeOutTime);
    });
    window.addEventListener('load', windowLoadHandler);
    function windowLoadHandler() {
        var opacity = Number(window.getComputedStyle(loader).getPropertyValue('opacity'));
        window.scrollTo({ top: 0, left: 0 });
        setTimeout(function () {
            var fadeOut = setInterval(function () {
                if (opacity > 0) {
                    opacity -= 0.01;
                    loader.querySelectorAll('p').forEach(function (p) {
                        p.style.opacity = "".concat(opacity);
                    });
                }
                else {
                    clearInterval(fadeOut);
                }
            }, 10);
        }, textFadeOutTime);
        setTimeout(function () {
            window.scrollTo({ top: 0, left: 0 });
            useLoadingBar.stopLoadingBar();
            loader.remove();
        }, pageFadeOutTime);
    }
    var useLoadingBar = {
        loadingBar: {
            element: document.createElement('div'),
            color: '#ffffff',
            weight: 4,
        },
        actionLoadingBar: null,
        createLoadingBar: function (parentElement) {
            this.loadingBar.element.style.background = this.loadingBar.color;
            this.loadingBar.element.style.height = "".concat(this.loadingBar.weight, "px");
            this.loadingBar.element.style.position = 'absolute';
            this.loadingBar.element.style.left = '0';
            this.loadingBar.element.style.top = '0';
            parentElement.prepend(this.loadingBar.element);
        },
        playLoadingBar: function (time) {
            var _this = this;
            var second = 0;
            this.actionLoadingBar = setInterval(function () {
                second += 10;
                _this.loadingBar.element.style.width = "".concat(getPercentage(second, time, 100), "%");
            }, 10);
        },
        stopLoadingBar: function () {
            clearInterval(this.actionLoadingBar);
            this.actionLoadingBar = null;
        },
    };
})();

/******/ })()
;
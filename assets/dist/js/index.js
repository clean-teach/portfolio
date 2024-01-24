/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/client/js/module/setIntervalTitle.ts
function setIntervalTitle() {
    var title = document.querySelector('title');
    var ARR_TITLE_NAME = [
        '안녕하세요',
        'CH Portfolio',
        '입니다.'
    ];
    var i = 0;
    setInterval(function () {
        title.textContent = ARR_TITLE_NAME[i];
        i++;
        if (i >= ARR_TITLE_NAME.length) {
            i = 0;
        }
    }, 1000);
}

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

;// CONCATENATED MODULE: ./src/client/js/module/actionHeader.ts

var header = document.querySelector('header');
var btnMainMenu = header.querySelector('.btn-main-menu');
var lnb = header.querySelector('#lnb');
var lnbBtn = lnb.querySelectorAll('a');
var portfolioSection = document.querySelector('#portfolio-section');
var bindLnbButton = function () {
    lnb.addEventListener('click', function (e) {
        actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
        setMoveScrollByAnchor(e);
    });
    lnb.addEventListener('focus', actionToggleHeaderByScroll(portfolioSection).show);
    lnb.addEventListener('blur', actionToggleHeaderByScroll(portfolioSection).hide);
};
var bindMainMenuButton = function () {
    var mainMenuButton = header.querySelector('.btn-main-menu');
    mainMenuButton.addEventListener('click', function () {
        actionToggleMainMenu.actionToggle(btnMainMenu, lnb);
    });
};
function lnbStylingByScroll() {
    var e = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
    }
    var CLASS_NAME_ON = 'on';
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        header.classList.add(CLASS_NAME_ON);
    }
    else {
        header.style['transition'] = 'none';
        header.classList.remove(CLASS_NAME_ON);
    }
    if (e && getScrollDirection() === 'DOWN') {
        actionToggleHeaderByScroll(portfolioSection).hide();
    }
    else if (e && getScrollDirection() === 'UP') {
        actionToggleHeaderByScroll(portfolioSection).show();
    }
}
var setHeaderColorByScroll = function (mainSection) {
    var mainMenuObj = header.querySelectorAll('.btn-main-menu i');
    var colorRGB = 255 - (document.documentElement.scrollTop / mainSection.offsetHeight) * 255;
    mainMenuObj.forEach(function (tg) {
        tg.style.backgroundColor = "rgba(".concat(colorRGB, ", ").concat(colorRGB, ", ").concat(colorRGB, ", 1)");
    });
    if (colorRGB < 0) {
        colorRGB = 0;
    }
    lnbBtn.forEach(function (tg) {
        tg.style.color = "rgba(".concat(colorRGB, ", ").concat(colorRGB, ", ").concat(colorRGB, ", 1)");
    });
};
var actionToggleMainMenu = {
    state: false,
    className: {
        btnOnClassName: 'mode-close',
        menuOnClassName: 'on',
    },
    actionMenuOpen: function (btn, menu) {
        btn.classList.add(this.className.btnOnClassName);
        menu.classList.add(this.className.menuOnClassName);
        this.state = true;
    },
    actionMenuClose: function (btn, menu) {
        btn.classList.remove(this.className.btnOnClassName);
        menu.classList.remove(this.className.menuOnClassName);
        this.state = false;
    },
    actionToggle: function (btn, menu) {
        if (this.state === false) {
            this.actionMenuOpen(btn, menu);
        }
        else {
            this.actionMenuClose(btn, menu);
        }
    },
};
function actionToggleHeaderByScroll(portfolioSection) {
    if (document.documentElement.scrollTop >=
        portfolioSection.offsetTop + window.innerHeight) {
        return {
            hide: function () {
                btnMainMenu.classList.add('hide');
            },
            show: function () {
                btnMainMenu.classList.remove('hide');
            },
        };
    }
    else {
        return {
            hide: function () {
                null;
            },
            show: function () {
                null;
            },
        };
    }
}
function setMoveScrollByAnchor(event, targetHref) {
    event.preventDefault();
    var target = event.target || event.srcElement;
    if (target.tagName === 'A') {
        if (event.type === 'click') {
            targetHref = target.getAttribute('href');
        }
        var scrollTo_1;
        if (targetHref === '#footer') {
            scrollTo_1 =
                document.body.scrollHeight -
                    document.querySelector(targetHref).clientHeight;
        }
        else if (targetHref === '#contact-section') {
            scrollTo_1 =
                document.querySelector(targetHref).offsetTop +
                    document.querySelector(targetHref).clientHeight -
                    window.innerHeight * 4;
        }
        else {
            scrollTo_1 = document.querySelector(targetHref).offsetTop;
        }
        window.scrollTo({
            top: scrollTo_1,
            behavior: 'smooth',
        });
    }
}

;// CONCATENATED MODULE: ./src/client/js/module/accessibility.ts

function accessibility() {
    var portfolioList = document.querySelectorAll('.portfolio-list>li');
    var lastPortfolioButtons = document.querySelectorAll('.portfolio-list button');
    var lastPortfolioLastButton = lastPortfolioButtons[lastPortfolioButtons.length - 1];
    var activePortfolioButton = null;
    var CLASS_NAME_ON = 'on';
    portfolioList.forEach(function (obj, i, arr) {
        var targetPortfolio = arr[i];
        var button = targetPortfolio.querySelector('.txt-area button');
        if (button) {
            button.addEventListener('focus', function (e) {
                focusPortfolioButtonHandler(e, window.pageYOffset + targetPortfolio.getBoundingClientRect().top);
            });
            button.addEventListener('blur', blurPortfolioButtonHandler);
        }
    });
    lastPortfolioLastButton.addEventListener('blur', lastPortfolioLastButtonHandler);
    function lastPortfolioLastButtonHandler(event) {
        var contactSection = '#contact-section';
        setMoveScrollByAnchor(event, contactSection);
        document.querySelector(contactSection).querySelector('input').focus();
    }
    function focusPortfolioButtonHandler(event, scrollY) {
        activePortfolioButton = event.target;
        activePortfolioButton.classList.add(CLASS_NAME_ON);
        if (scrollY !== null) {
            window.scrollTo(0, scrollY);
        }
    }
    function blurPortfolioButtonHandler() {
        activePortfolioButton.classList.remove(CLASS_NAME_ON);
    }
}

;// CONCATENATED MODULE: ./src/client/js/module/setBackgroundColorByMouseMove.ts

var setBackgroundColorByMouseMove = {
    gradient: true,
    mediaCondition: matchMedia("screen and (min-width: 768px)").matches,
    eventX: 0,
    eventY: 0,
    R: random(0, 255),
    G: random(0, 255),
    B: random(0, 255),
    degree: 90,
    getScrollForAlpha: function (targetSection) {
        return 1 - (document.documentElement.scrollTop / targetSection.offsetHeight);
    },
    getMouseMove: function (event, target) {
        var _this = this;
        if (!target) {
            return;
        }
        if (this.mediaCondition) {
            this.eventX = Math.floor(event.x / target.offsetWidth * 100);
            this.eventY = Math.floor(event.y / target.offsetHeight * 100);
            var getColor = function () {
                var moveXColor = Math.floor(event.x / target.offsetWidth * 255);
                var moveYColor = Math.floor(event.y / target.offsetHeight * 255);
                _this.R = 255 - moveXColor;
                _this.G = moveXColor;
                _this.B = 255 - moveYColor;
            };
            var getDegree = function () {
                if (_this.gradient) {
                    var center = {
                        x: target.getBoundingClientRect().left + (target.clientWidth / 2),
                        y: target.getBoundingClientRect().top + (target.clientHeight / 2)
                    };
                    var x = center.x - event.clientX;
                    var y = center.y - event.clientY;
                    var radian = Math.atan2(y, x);
                    _this.degree = Number((radian * 180 / Math.PI).toFixed(0));
                }
            };
            getColor();
            getDegree();
        }
    },
    setBackgroundColor: function (targetSection) {
        var bgTg = document.querySelector('#main-background-area');
        var alpha = this.getScrollForAlpha(targetSection);
        if (this.mediaCondition) {
            if (this.gradient) {
                bgTg.style.background = "linear-gradient(".concat(this.degree, "deg, rgba(").concat(this.G, ",").concat(this.B, ",").concat(this.R, ",").concat(alpha, ") 0%, rgba(").concat(this.B, ",").concat(this.R, ",").concat(this.G, ",").concat(alpha, ") 100%)");
            }
            else {
                bgTg.style.background = "rgba(".concat(this.R, ",").concat(this.G, ",").concat(this.B, ",").concat(alpha, ")");
            }
        }
        else {
            bgTg.style.background = "linear-gradient(90deg, rgba(".concat(this.G, ",").concat(this.B, ",").concat(this.R, ",").concat(alpha, ") 0%, rgba(").concat(this.B, ",").concat(this.R, ",").concat(this.G, ",").concat(alpha, ") 100%)");
        }
        if (alpha <= 0) {
            bgTg.style.display = 'none';
        }
        else {
            bgTg.style.display = 'block';
        }
    }
};

;// CONCATENATED MODULE: ./src/client/js/module/setBackgroundStyleByScroll.ts

var setBackgroundStyleByScroll = {
    elBackCircle: document.querySelector('#main-background-area .circle'),
    contactSection: document.querySelector('#contact-section'),
    viewportHypotenuse: getPythagorean(document.documentElement.clientWidth, document.documentElement.clientHeight),
    start: 0,
    setInit: function () {
        this.start = this.contactSection.offsetTop;
        this.elBackCircle.style['width'] = "".concat(this.viewportHypotenuse, "px");
        this.elBackCircle.style['height'] = "".concat(this.viewportHypotenuse, "px");
        this.elBackCircle.style['transform'] = "scale(0)";
    },
    move: function (scrollBottom) {
        if (scrollBottom > this.start) {
            this.elBackCircle.style['transform'] = "scale(".concat((scrollBottom - this.start) / 1000, ")");
        }
        else {
            this.elBackCircle.style['transform'] = "scale(0)";
        }
    }
};

;// CONCATENATED MODULE: ./src/client/js/module/actionStylePortfolioByScroll.ts

var actionStylePortfolioByScroll_portfolioSection = document.querySelector('#portfolio-section');
var portfolioTitle = document.querySelector('#portfolio-section>h2');
var categoryTab = actionStylePortfolioByScroll_portfolioSection.querySelector('.category-tab-wrap');
var portfolioList = document.querySelectorAll('.portfolio-list>li.motion');
var winHeightHalf = window.innerHeight / 2;
var activePortfolioByScroll = {
    titleMotion: {
        startPoint: actionStylePortfolioByScroll_portfolioSection.offsetTop + window.innerHeight,
        endPoint: actionStylePortfolioByScroll_portfolioSection.offsetTop + actionStylePortfolioByScroll_portfolioSection.scrollHeight,
        action: function (scrollBottom) {
            if (scrollBottom > this.startPoint && scrollBottom < this.endPoint) {
                var parts = scrollBottom - this.startPoint;
                var whole = window.innerHeight;
                var opacityValue = 1 - getPercentage(parts, whole, 1);
                if (opacityValue < 0) {
                    opacityValue = 0;
                }
                portfolioTitle.style.opacity = String(opacityValue);
                portfolioTitle.classList.add('on');
            }
            else {
                portfolioTitle.classList.remove('on');
            }
        },
    },
    tabMotion: {
        elementRelativeTop: window.pageYOffset + categoryTab.getBoundingClientRect().top,
        endPoint: actionStylePortfolioByScroll_portfolioSection.offsetTop + actionStylePortfolioByScroll_portfolioSection.scrollHeight,
        action: function (scrollBottom) {
            if (scrollBottom - window.innerHeight > this.elementRelativeTop &&
                scrollBottom < this.endPoint) {
                categoryTab.classList.add('on');
            }
            else {
                categoryTab.classList.remove('on');
            }
        },
    },
    setImgActive: {
        pc: function (scrollBottom, i, arr) {
            var target = arr[i].querySelector('.img-area');
            if (target) {
                var CLASS_NAME_ON = 'on';
                var startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top <
                    scrollBottom;
                if (startPoint) {
                    target.classList.add(CLASS_NAME_ON);
                }
                else {
                    target.classList.remove(CLASS_NAME_ON);
                }
            }
        },
        mob: function (scrollBottom, i, arr) {
            var mockup = arr[i].querySelector('.img-area');
            var scroll = arr[i].querySelector('.img-area .img-wrap');
            if (mockup) {
                var CLASS_NAME_ON = 'on';
                var startPoint = window.pageYOffset +
                    arr[i].getBoundingClientRect().top +
                    window.innerHeight <
                    scrollBottom;
                if (startPoint) {
                    mockup.classList.add(CLASS_NAME_ON);
                }
                else {
                    mockup.classList.remove(CLASS_NAME_ON);
                }
            }
        },
    },
    setTxtActive: {
        pc: function (scrollBottom, i, arr) {
            var currentElement = arr[i];
            var txtBox = currentElement.querySelector('.txt-area');
            if (txtBox) {
                var CLASS_NAME_ON = 'on';
                var startPoint = scrollBottom - winHeightHalf >
                    window.pageYOffset + currentElement.getBoundingClientRect().top, endPoint = scrollBottom - winHeightHalf <
                    window.pageYOffset +
                        currentElement.getBoundingClientRect().top +
                        currentElement.offsetHeight;
                if (startPoint && endPoint) {
                    txtBox.classList.add(CLASS_NAME_ON);
                }
                else {
                    txtBox.classList.remove(CLASS_NAME_ON);
                }
            }
        },
        mob: function (scrollBottom, i, arr) {
            var currentElement = arr[i];
            var txtBox = currentElement.querySelector('.txt-area');
            if (txtBox) {
                var CLASS_NAME_ON = 'on';
            }
        },
    },
    action: function (scrollBottom) {
        var _this = this;
        this.titleMotion.action(scrollBottom);
        this.tabMotion.action(scrollBottom);
        portfolioList.forEach(function (obj, i, arr) {
            _this.setImgActive.pc(scrollBottom, i, arr);
            _this.setTxtActive.pc(scrollBottom, i, arr);
        });
    },
};

;// CONCATENATED MODULE: ./src/client/js/module/actionStyleContactArea.ts

var actionStyleContactArea_portfolioSection = document.querySelector('#portfolio-section');
var contactSection = document.querySelector('#contact-section');
var joinArea = document.querySelector('.join-motion-txt-area');
var joinLine = joinArea.querySelectorAll('.line');
var joinTxt = joinArea.querySelectorAll('.txt');
var joinTxt01 = joinArea.querySelector('.txt01');
var joinTxt02 = joinArea.querySelector('.txt02');
var contactSectionHeading = contactSection.querySelector('h2');
var formArea = contactSection.querySelector('.form-area');
var portfolioSectionHeight = actionStyleContactArea_portfolioSection.offsetHeight;
var motionContactAreaByScroll = {
    option: {
        animateSpeed: 1,
    },
    scrollBottom: 0,
    winInnerHeight: 0,
    actionScrollPoint: {
        moveJoinTxt: {
            showReady: 0,
            lineStart: 0,
            lineEnd: 0,
            txtStart: 0,
            txtEnd: 0,
            posiStart: 0,
        },
        heading: {
            fadeInStart: 0,
            fadeInEnd: 0,
            scaleStart: 0,
            scaleEnd: 0,
        },
        formArea: {
            scaleStart: 0,
            scaleEnd: 0,
            posiStart: 0,
        },
    },
    get: function (winInnerHeight) {
        var speed = Math.abs(this.option.animateSpeed);
        actionStyleContactArea_portfolioSection = document.querySelector('#portfolio-section');
        contactSection = document.querySelector('#contact-section');
        joinArea = document.querySelector('.join-motion-txt-area');
        joinLine = joinArea.querySelectorAll('.line');
        joinTxt = joinArea.querySelectorAll('.txt');
        joinTxt01 = joinArea.querySelector('.txt01');
        joinTxt02 = joinArea.querySelector('.txt02');
        contactSectionHeading = contactSection.querySelector('h2');
        formArea = contactSection.querySelector('.form-area');
        portfolioSectionHeight = actionStyleContactArea_portfolioSection.offsetHeight;
        contactSection.classList.add('animation-by-scroll-style');
        this.winInnerHeight = winInnerHeight;
        this.actionScrollPoint.moveJoinTxt.showReady =
            window.pageYOffset +
                actionStyleContactArea_portfolioSection.getBoundingClientRect().top +
                portfolioSectionHeight +
                this.winInnerHeight * 0.5;
        this.actionScrollPoint.moveJoinTxt.lineStart =
            this.actionScrollPoint.moveJoinTxt.showReady +
                this.winInnerHeight * (0.5 * speed);
        this.actionScrollPoint.moveJoinTxt.lineEnd =
            this.actionScrollPoint.moveJoinTxt.lineStart +
                this.winInnerHeight * (2 * speed);
        this.actionScrollPoint.moveJoinTxt.txtStart =
            this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd =
            this.actionScrollPoint.moveJoinTxt.txtStart +
                this.winInnerHeight * (2 * speed);
        this.actionScrollPoint.moveJoinTxt.posiStart =
            this.actionScrollPoint.moveJoinTxt.txtEnd +
                this.winInnerHeight * (0.5 * speed);
        this.actionScrollPoint.heading.fadeInStart =
            this.actionScrollPoint.moveJoinTxt.posiStart +
                this.winInnerHeight * (0.5 * speed);
        this.actionScrollPoint.heading.fadeInEnd =
            this.actionScrollPoint.heading.fadeInStart +
                this.winInnerHeight * (2 * speed);
        this.actionScrollPoint.heading.scaleStart =
            this.actionScrollPoint.heading.fadeInEnd;
        this.actionScrollPoint.heading.scaleEnd =
            this.actionScrollPoint.heading.scaleStart +
                this.winInnerHeight * (1.5 * speed);
        this.actionScrollPoint.formArea.scaleStart =
            this.actionScrollPoint.heading.scaleEnd -
                this.winInnerHeight * (0.5 * speed);
        this.actionScrollPoint.formArea.scaleEnd =
            this.actionScrollPoint.formArea.scaleStart +
                this.winInnerHeight * (1.5 * speed);
        this.actionScrollPoint.formArea.posiStart =
            this.actionScrollPoint.formArea.scaleEnd +
                this.winInnerHeight * (0.5 * speed);
    },
    convertScrollToPercentage: function (startScroll, endScroll, percentTotal, currentScroll) {
        if (currentScroll >= startScroll && currentScroll <= endScroll) {
            var percentage = getPercentage(currentScroll - startScroll, endScroll - startScroll, percentTotal);
            return percentage;
        }
        return 0;
    },
    rotateYForm: function (degree) {
        var centerWrap = contactSection.querySelector('.center-wrap');
        centerWrap.style['transform'] = "rotateY(".concat(degree, "deg)");
    },
    fixedPosition: function (startScroll, endScroll, target) {
        var CLASS_NAME_FIEXD = 'fixed';
        if (this.scrollBottom > startScroll && this.scrollBottom < endScroll) {
            target.classList.add(CLASS_NAME_FIEXD);
        }
        else {
            target.classList.remove(CLASS_NAME_FIEXD);
        }
    },
    moveJoinLine: function (startScroll, endScroll) {
        var maxScaleXValue = 1;
        var scaleXValue = this.convertScrollToPercentage(startScroll, endScroll, maxScaleXValue, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            scaleXValue = 0;
        }
        else if (this.scrollBottom > endScroll) {
            scaleXValue = maxScaleXValue;
        }
        if (!joinLine) {
            document.location.reload();
        }
        else {
            joinLine.forEach(function (line) {
                line.style['transform'] = "scaleX(".concat(scaleXValue, ")");
            });
        }
    },
    setOpacity: function (startScroll, endScroll, minOpacity, maxOpacity) {
        var opacityValue = this.convertScrollToPercentage(startScroll, endScroll, maxOpacity, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            opacityValue = minOpacity;
        }
        else if (this.scrollBottom > endScroll) {
            opacityValue = maxOpacity;
        }
        return opacityValue;
    },
    moveJoinTxt: function (startScroll, endScroll) {
        var maxpositionValue = 100;
        var positionValue = maxpositionValue -
            this.convertScrollToPercentage(startScroll, endScroll, maxpositionValue, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            positionValue = maxpositionValue;
        }
        else if (this.scrollBottom > endScroll) {
            positionValue = 0;
        }
        joinTxt01.style['transform'] = "translateX(".concat(-positionValue, "vw)");
        joinTxt02.style['transform'] = "translateX(".concat(positionValue, "vw)");
        var opacity = this.setOpacity(startScroll, endScroll, 0, 1);
        joinTxt.forEach(function (txt) {
            txt.style.opacity = "".concat(opacity);
        });
    },
    moveEmboss: function (startScroll, endScroll) {
        var opacity = this.setOpacity(startScroll, endScroll, 0, 0.6);
        var maxShadowSizeValue = 0.4;
        var shadowSizeValue = this.convertScrollToPercentage(startScroll, endScroll, maxShadowSizeValue, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            shadowSizeValue = 0;
        }
        else if (this.scrollBottom > endScroll) {
            shadowSizeValue = maxShadowSizeValue;
        }
        contactSectionHeading.style.textShadow = "0 0 ".concat(shadowSizeValue, "rem rgba(0, 0, 0, ").concat(opacity, ")");
    },
    extendScale: function (startScroll, endScroll, target, minScale, maxScale) {
        var scaleValue = minScale +
            this.convertScrollToPercentage(startScroll, endScroll, maxScale, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            scaleValue = minScale;
        }
        else if (this.scrollBottom > endScroll) {
            scaleValue = maxScale;
        }
        target.style['transform'] = "scale(".concat(scaleValue, ")");
    },
    setColorMono: function (startScroll, endScroll, target, minValue, maxValue) {
        var ColorValue = maxValue -
            this.convertScrollToPercentage(startScroll, endScroll, maxValue, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            ColorValue = maxValue;
        }
        else if (this.scrollBottom > endScroll) {
            ColorValue = minValue;
        }
    },
    setDisplay: function (startScroll, endScroll, target, display) {
        if (endScroll) {
            if (this.scrollBottom > startScroll && this.scrollBottom < endScroll) {
                target.style['display'] = display;
            }
            else {
                target.style['display'] = 'none';
            }
        }
        else {
            if (this.scrollBottom < startScroll && this.scrollBottom > startScroll) {
                target.style['display'] = 'none';
            }
            else {
                target.style['display'] = display;
            }
        }
    },
    scrollHandler: function (scrollBottom) {
        this.scrollBottom = scrollBottom;
        this.moveJoinLine(this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd);
        this.moveJoinTxt(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd);
        this.fixedPosition(this.actionScrollPoint.moveJoinTxt.showReady, this.actionScrollPoint.moveJoinTxt.posiStart, joinArea);
        this.setDisplay(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.scaleEnd, contactSectionHeading, 'flex');
        contactSectionHeading.style.opacity = "".concat(1 -
            this.setOpacity(this.actionScrollPoint.heading.fadeInEnd, this.actionScrollPoint.heading.scaleEnd, 0, 1));
        this.moveEmboss(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.fadeInEnd);
        this.extendScale(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.heading.scaleEnd, contactSectionHeading, 1, 100);
        this.setDisplay(this.actionScrollPoint.formArea.scaleStart, '', formArea, 'flex');
        this.extendScale(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.scaleEnd, formArea, 0, 1);
        this.fixedPosition(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.posiStart, formArea);
        this.setColorMono(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.formArea.posiStart, contactSection, 0, 255);
    },
    portfolioSectionHeight: 0,
};
var bindContactForm = function () {
    var contactFormTag = document.querySelectorAll('#contact-section input, textarea');
    var CLASS_NAME_ON = 'on';
    contactFormTag.forEach(function (formBox) {
        formBox.addEventListener('focus', function () {
            var li = this.parentElement;
            if (li !== null) {
                li.querySelector('label');
                li.classList.add(CLASS_NAME_ON);
            }
        });
        formBox.addEventListener('blur', function () {
            var li = this.parentElement;
            if (li !== null) {
                li.querySelector('label');
                li.classList.remove(CLASS_NAME_ON);
            }
        });
    });
};

;// CONCATENATED MODULE: ./src/client/js/module/actionStyleFooterCard.ts

var footer = document.querySelector('footer');
var footerCard = footer.querySelector('.card');
var cardOffsetTop = footer.offsetTop + footerCard.offsetTop;
var footerCardInitialAngleValue = 180;
var sensitiveY = 20;
var sensitiveX = 10;
var direction = 1;
function bindFooterCard() {
    var card = document.querySelector('footer .card');
    card.addEventListener('mousemove', twistCardHandler);
    card.addEventListener('mouseleave', returnToOriginStateCardHandler);
    card.querySelectorAll('a').forEach(function (a, i) {
        a.addEventListener('mouseenter', function () {
            hoverFootCardButton.enter(i);
        });
        a.addEventListener('focus', function () {
            hoverFootCardButton.enter(i);
            window.scrollTo(0, document.body.scrollHeight);
        });
        a.addEventListener('mouseleave', function () {
            hoverFootCardButton.leave(i);
        });
        a.addEventListener('blur', function () {
            hoverFootCardButton.leave(i);
        });
    });
    function twistCardHandler(event) {
        if (getCurrentScrollBottomEnd()) {
            this.style.transform = "\n                rotateY(".concat((direction * (window.innerWidth / 2 - event.x)) / sensitiveY, "deg) \n                rotateX(").concat((direction * (window.innerHeight / 2 - event.y)) / -sensitiveX, "deg)\n            ");
            this.style.transition = '0s';
        }
    }
    function returnToOriginStateCardHandler() {
        if (getCurrentScrollBottomEnd()) {
            this.style.transform = "rotateY(0deg) rotateX(0deg)";
            this.style.transition = '.4s';
        }
    }
    var hoverFootCardButton = {
        target: document.querySelector('footer .card-space'),
        ARR_CLASS_NAME: [
            'bg-mobile',
            'bg-email',
            'bg-git',
            'bg-notion-01',
            'bg-notion-02',
        ],
        enter: function (i) {
            this.target.classList.add(this.ARR_CLASS_NAME[i]);
        },
        leave: function (i) {
            this.target.classList.remove(this.ARR_CLASS_NAME[i]);
        },
    };
}
function rotateFooterCardByScoll(scrollBottom, winInnerHeight) {
    var pageScrollHeight = document.body.scrollHeight;
    var startPoint = pageScrollHeight - winInnerHeight;
    if (scrollBottom > startPoint - winInnerHeight * 2) {
        footerCard.style.display = 'block';
    }
    else {
        footerCard.style.display = 'none';
    }
    if (scrollBottom > startPoint) {
        var percentage = ((scrollBottom - startPoint) / (pageScrollHeight - startPoint)) * 180;
        footerCard.style.transform = "rotateX(".concat(footerCardInitialAngleValue - percentage, "deg)");
        footerCard.style.transition = '0s';
    }
    else {
        footerCard.style.transform = "rotateX(".concat(footerCardInitialAngleValue, "deg)");
    }
}

;// CONCATENATED MODULE: ./src/client/js/module/clock.ts

function checkTimeUserStay() {
    var firstVisitTime;
    var startClockTimer;
    resetTimer();
    function resetTimer() {
        firstVisitTime = new Date();
    }
    function paintingClock() {
        var clock = document.querySelector('#time-the-current-user-is-staying');
        var currentTime = new Date();
        var elapsedTimeMilliseconds = getElapsedTime(firstVisitTime, currentTime);
        var seconds = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).seconds();
        var minutes = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).minutes();
        var hours = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).hours();
        seconds = padStart(2, '0', String(seconds));
        minutes = padStart(2, '0', String(minutes));
        hours = padStart(2, '0', String(hours));
        clock.innerHTML = "\n            <p>\uBC8C\uC368 <span>".concat(hours, "</span>\uC2DC\uAC04 <span>").concat(minutes, "</span>\uBD84 <span>").concat(seconds, "</span>\uCD08 \uB3D9\uC548 \uC800\uC5D0\uAC8C \uAD00\uC2EC\uC744 \uBCF4\uC5EC\uC8FC\uC168\uC5B4\uC694!</p>\n            <p>\uC800\uC5D0 \uB300\uD574 \uB354\uC6B1 \uB9CE\uC740 \uAC83\uC744 \uC54C\uACE0 \uC2F6\uC73C\uC2DC\uBA74, <br />\n            \uC544\uB798 \uC5F0\uB77D\uCC98\uB85C \uC5F0\uB77D \uC8FC\uC138\uC694</p>\n            <p>\u2193</p>\n        ");
    }
    return {
        playClock: function () {
            startClockTimer = setInterval(paintingClock, 1000);
        },
        stopClock: function () {
            clearInterval(startClockTimer);
        }
    };
}
function getElapsedTime(oldTime, newTime) {
    var oldYear = oldTime.getFullYear();
    var oldMonth = oldTime.getMonth() + 1;
    var oldDay = oldTime.getDate();
    var oldHour = oldTime.getHours();
    var oldMinute = oldTime.getMinutes();
    var oldSecond = oldTime.getSeconds();
    var newYear = newTime.getFullYear();
    var newMonth = newTime.getMonth() + 1;
    var newDay = newTime.getDate();
    var newHour = newTime.getHours();
    var newMinute = newTime.getMinutes();
    var newSecond = newTime.getSeconds();
    var oldDate = new Date(oldYear, oldMonth, oldDay, oldHour, oldMinute, oldSecond);
    var newDate = new Date(newYear, newMonth, newDay, newHour, newMinute, newSecond);
    var elapsedTime = newDate.getTime() - oldDate.getTime();
    return elapsedTime;
}
function getHoursMinutesSecondsFromMilliseconds(milliseconds) {
    var hours = milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60);
    var minutes = milliseconds % (1000 * 60 * 60) / (1000 * 60);
    var seconds = milliseconds % (1000 * 60) / (1000);
    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);
    return {
        hours: function () {
            return hours;
        },
        minutes: function () {
            return minutes;
        }, seconds: function () {
            return seconds;
        }
    };
}

;// CONCATENATED MODULE: ./src/client/js/module/actionTab.ts
function filteringCategoryByTab(currentBtn) {
    var portfolios = document.querySelector('#portfolio-section .portfolio-list');
    var portfolioListPositionRelativeTop = window.pageYOffset + portfolios.getBoundingClientRect().top + window.innerHeight;
    var list = document.querySelectorAll('#portfolio-section .portfolio-list > li');
    var CLASS_NAME_HIDDEN = 'hidden';
    window.scrollTo(0, portfolioListPositionRelativeTop);
    list.forEach(function (item) {
        item.classList.add(CLASS_NAME_HIDDEN);
        if (currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
            item.classList.remove(CLASS_NAME_HIDDEN);
        }
    });
}

;// CONCATENATED MODULE: ./src/client/js/module/bindTabButton.ts


function bindTabButton(tabArea, winInnerHeight) {
    var CLASS_NAME_ON = 'on';
    var currentTab = tabArea.querySelector("button.".concat(CLASS_NAME_ON));
    filteringCategoryByTab(tabArea.querySelector(".".concat(CLASS_NAME_ON)));
    tabArea.addEventListener('click', tabClickHandler);
    function tabClickHandler(event) {
        if (event.target.type === 'button') {
            currentTab.classList.remove(CLASS_NAME_ON);
            event.target.classList.add(CLASS_NAME_ON);
            currentTab = event.target;
            filteringCategoryByTab(event.target);
        }
        motionContactAreaByScroll.get(winInnerHeight);
    }
}

;// CONCATENATED MODULE: ./src/client/js/index.ts











var mainSection, winInnerHeight, scrollBottom;
document.addEventListener('DOMContentLoaded', mainHandler);
window.addEventListener('load', windowLoadHandler);
window.addEventListener('resize', windowResizeHandler);
document.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
document.addEventListener('mousemove', documentMouseMoveHandler);
document.addEventListener('scroll', documentScrollHandler, { passive: true });
document.addEventListener('mouseenter', function (e) {
    document.body.style.transition = '0s';
});
document.addEventListener('mouseleave', function (e) {
    setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    document.body.style.transition = "1s";
});
function mainHandler() {
    mainSection = document.querySelector('#main-section');
    checkTimeUserStay().playClock();
    setIntervalTitle();
    accessibility();
    bindLnbButton();
    bindMainMenuButton();
    bindContactForm();
    bindFooterCard();
}
function windowLoadHandler() {
    winInnerHeight = window.innerHeight;
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    setHeaderColorByScroll(mainSection);
    lnbStylingByScroll();
    setBackgroundStyleByScroll.setInit();
    setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    activePortfolioByScroll.action(scrollBottom);
    motionContactAreaByScroll.get(winInnerHeight);
    motionContactAreaByScroll.scrollHandler(scrollBottom);
    rotateFooterCardByScoll(scrollBottom, winInnerHeight);
    bindTabButton(document.querySelector('#portfolio-section .category-tab-wrap'), winInnerHeight);
}
function windowResizeHandler() {
    (winInnerHeight = window.innerHeight),
        (scrollBottom = document.documentElement.scrollTop + winInnerHeight);
    activePortfolioByScroll.action(scrollBottom);
    motionContactAreaByScroll.get(winInnerHeight);
    motionContactAreaByScroll.scrollHandler(scrollBottom);
    rotateFooterCardByScoll(scrollBottom, winInnerHeight);
}
function documentMouseMoveHandler(event) {
    setBackgroundColorByMouseMove.getMouseMove(event, mainSection);
    setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
}
function documentScrollHandler(event) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    setHeaderColorByScroll(mainSection);
    lnbStylingByScroll(event);
    setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    animationMainSectionByScroll();
    setBackgroundStyleByScroll.move(scrollBottom);
    scrollRotate('circle-scroll-svg');
    activePortfolioByScroll.action(scrollBottom);
    optimizeAnimation(motionContactAreaByScroll.scrollHandler(scrollBottom));
    rotateFooterCardByScoll(scrollBottom, winInnerHeight);
}
function animationMainSectionByScroll() {
    mainSection.querySelector('.tit').style['left'] = "-".concat(document.documentElement.scrollTop * 1, "px");
    mainSection.querySelector('.txt').style['top'] = "-".concat(document.documentElement.scrollTop * 0.02, "px");
    mainSection.querySelector('.vertical').style['top'] = "".concat(document.documentElement.scrollTop * 0.4, "px");
}

/******/ })()
;
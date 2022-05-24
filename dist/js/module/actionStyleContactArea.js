import { getPercentage } from "../utils/utils.js";
var portfolioSection = document.querySelector('#portfolio-section');
var contactSection = document.querySelector('#contact-section');
var joinArea = document.querySelector('.join-motion-txt-area');
var joinLine = joinArea.querySelectorAll('.line');
var joinTxt = joinArea.querySelectorAll('.txt');
var joinTxt01 = joinArea.querySelector('.txt01');
var joinTxt02 = joinArea.querySelector('.txt02');
var contactSectionHeading = contactSection.querySelector('h2');
var formArea = contactSection.querySelector('.form-area');
var portfolioSectionHeight = portfolioSection.offsetHeight;
export var motionContactAreaByScroll = {
    option: {
        animateSpeed: 1
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
        }
    },
    get: function (winInnerHeight) {
        var speed = Math.abs(this.option.animateSpeed);
        portfolioSection = document.querySelector('#portfolio-section');
        contactSection = document.querySelector('#contact-section');
        joinArea = document.querySelector('.join-motion-txt-area');
        joinLine = joinArea.querySelectorAll('.line');
        joinTxt = joinArea.querySelectorAll('.txt');
        joinTxt01 = joinArea.querySelector('.txt01');
        joinTxt02 = joinArea.querySelector('.txt02');
        contactSectionHeading = contactSection.querySelector('h2');
        formArea = contactSection.querySelector('.form-area');
        portfolioSectionHeight = portfolioSection.offsetHeight;
        contactSection.classList.add('animation-by-scroll-style');
        this.winInnerHeight = winInnerHeight;
        this.actionScrollPoint.moveJoinTxt.showReady =
            window.pageYOffset + portfolioSection.getBoundingClientRect().top + portfolioSectionHeight + (this.winInnerHeight * .5);
        this.actionScrollPoint.moveJoinTxt.lineStart =
            this.actionScrollPoint.moveJoinTxt.showReady + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.moveJoinTxt.lineEnd =
            this.actionScrollPoint.moveJoinTxt.lineStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.moveJoinTxt.txtStart =
            this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd =
            this.actionScrollPoint.moveJoinTxt.txtStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.moveJoinTxt.posiStart =
            this.actionScrollPoint.moveJoinTxt.txtEnd + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.heading.fadeInStart =
            this.actionScrollPoint.moveJoinTxt.posiStart + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.heading.fadeInEnd =
            this.actionScrollPoint.heading.fadeInStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.heading.scaleStart =
            this.actionScrollPoint.heading.fadeInEnd;
        this.actionScrollPoint.heading.scaleEnd =
            this.actionScrollPoint.heading.scaleStart + (this.winInnerHeight * (1.5 * speed));
        this.actionScrollPoint.formArea.scaleStart =
            this.actionScrollPoint.heading.scaleEnd - (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.formArea.scaleEnd =
            this.actionScrollPoint.formArea.scaleStart + (this.winInnerHeight * (1.5 * speed));
        this.actionScrollPoint.formArea.posiStart =
            this.actionScrollPoint.formArea.scaleEnd + (this.winInnerHeight * (.5 * speed));
    },
    convertScrollToPercentage: function (startScroll, endScroll, percentTotal, currentScroll) {
        if (currentScroll >= startScroll && currentScroll <= endScroll) {
            var percentage = getPercentage((currentScroll - startScroll), (endScroll - startScroll), percentTotal);
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
        var positionValue = maxpositionValue - this.convertScrollToPercentage(startScroll, endScroll, maxpositionValue, this.scrollBottom);
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
        var opacity = this.setOpacity(startScroll, endScroll, 0, .6);
        var maxShadowSizeValue = .4;
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
        var scaleValue = minScale + this.convertScrollToPercentage(startScroll, endScroll, maxScale, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            scaleValue = minScale;
        }
        else if (this.scrollBottom > endScroll) {
            scaleValue = maxScale;
        }
        target.style['transform'] = "scale(".concat(scaleValue, ")");
    },
    setColorMono: function (startScroll, endScroll, target, minValue, maxValue) {
        var ColorValue = maxValue - this.convertScrollToPercentage(startScroll, endScroll, maxValue, this.scrollBottom);
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
            if (this.scrollBottom < startScroll) {
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
        contactSectionHeading.style.opacity = "".concat(1 - this.setOpacity(this.actionScrollPoint.heading.fadeInEnd, this.actionScrollPoint.heading.scaleEnd, 0, 1));
        this.moveEmboss(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.fadeInEnd);
        this.extendScale(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.heading.scaleEnd, contactSectionHeading, 1, 100);
        this.setDisplay(this.actionScrollPoint.formArea.scaleStart, '', formArea, 'flex');
        this.extendScale(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.scaleEnd, formArea, 0, 1);
        this.fixedPosition(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.posiStart, formArea);
        this.setColorMono(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.formArea.posiStart, contactSection, 0, 255);
    },
    portfolioSectionHeight: 0
};
export var bindContactForm = function () {
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
//# sourceMappingURL=actionStyleContactArea.js.map
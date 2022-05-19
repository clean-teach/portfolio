import { getScrollDirection } from "../utils/utils.js";
var header = document.querySelector('header');
var btnMainMenu = header.querySelector('.btn-main-menu');
var lnb = header.querySelector('#lnb');
var lnbBtn = lnb.querySelectorAll('a');
var portfolioSection = document.querySelector('#portfolio-section');
// LNB 버튼 이벤트 바인드
export var bindLnbButton = function () {
    lnb.addEventListener('click', function (e) {
        actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
        setMoveScrollByAnchor(e);
    });
    lnb.addEventListener('focus', actionToggleHeaderByScroll(portfolioSection).show);
    lnb.addEventListener('blur', actionToggleHeaderByScroll(portfolioSection).hide);
};
// 메인메뉴 버튼 (햄버거 버튼) 이벤트 바인드
export var bindMainMenuButton = function () {
    var mainMenuButton = header.querySelector('.btn-main-menu');
    mainMenuButton.addEventListener('click', function () {
        actionToggleMainMenu.actionToggle(btnMainMenu, lnb);
    });
};
// scroll 상태에 따른 Local Navigation Button Style
export function lnbStylingByScroll() {
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
// scroll에 따른 색상 값 (LNB, MainMenu)
export var setHeaderColorByScroll = function (mainSection) {
    var mainMenuObj = header.querySelectorAll('.btn-main-menu i');
    var colorRGB = 255 - ((document.documentElement.scrollTop / mainSection.offsetHeight) * 255);
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
// 메인메뉴 버튼 동작함수용 객체
var actionToggleMainMenu = {
    state: false,
    className: {
        btnOnClassName: 'mode-close',
        menuOnClassName: 'on'
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
    }
};
// 스크롤 위아래 방향에 따른 헤더 노출 여부
function actionToggleHeaderByScroll(portfolioSection) {
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        return {
            hide: function () {
                header.style['top'] = "-".concat(header.offsetHeight, "px");
            },
            show: function () {
                header.style['top'] = "".concat(0);
                header.style['transition'] = '1s';
            }
        };
    }
    else {
        return {
            hide: function () {
                null;
            },
            show: function () {
                null;
            }
        };
    }
}
// 앵커태그 부드러운 동작 함수
export function setMoveScrollByAnchor(event, targetHref) {
    event.preventDefault();
    var target = event.target || event.srcElement;
    if (target.tagName === 'A') {
        if (event.type === 'click') {
            targetHref = target.getAttribute('href');
        }
        var scrollTo_1;
        if (targetHref === '#footer') {
            scrollTo_1 = document.body.scrollHeight;
        }
        else if (targetHref === '#contact-section') {
            scrollTo_1 = document.querySelector(targetHref).offsetTop + document.querySelector(targetHref).clientHeight - window.innerHeight;
        }
        else {
            scrollTo_1 = document.querySelector(targetHref).offsetTop;
        }
        window.scrollTo({
            top: scrollTo_1,
            behavior: 'smooth'
        });
    }
}
//# sourceMappingURL=actionHeader.js.map
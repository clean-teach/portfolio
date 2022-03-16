import { getScrollDirection } from "../utils/utils.js";

const header = document.querySelector('header');
const btnMainMenu = header.querySelector('.btn-main-menu');
const lnb = header.querySelector('#lnb');
const lnbBtn = lnb.querySelectorAll('a');
const portfolioSection = document.querySelector('#portfolio-section');

// 메인메뉴 버튼 동작함수용 객체
const actionToggleMainMenu = {
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
        } else {
            this.actionMenuClose(btn, menu);
        }
    }

};

// 스크롤 위아래 방향에 따른 헤더 노출 여부
function actionToggleHeader() {
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        return {
            hide: function () {
                header.style['top'] = `-${header.offsetHeight}px`;
            },
            show: function () {
                header.style['top'] = 0;
                header.style['transition'] = '1s';
            }
        };
    } else {
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
function moveScrollByAnchor(event) {
    const target = event.target || event.srcElement;
    event.preventDefault();
    window.scrollTo({
        top: document.querySelector(target.getAttribute('href')).offsetTop,
        behavior: 'smooth'
    });
}

// scroll 상태에 따른 Local Navigation Button Style
export function lnbStylingByScroll(e) {
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        header.classList.add('on');
    } else {
        header.style['transition'] = 'none';
        header.classList.remove('on');
    }
    if (e && getScrollDirection() === 'DOWN') {
        actionToggleHeader().hide();
    } else if (e && getScrollDirection() === 'UP') {
        actionToggleHeader().show();
    }
}

// scroll에 따른 색상 값 (LNB, MainSection)
export function setColor(mainSection) {
    let colorRGB = 255 - ((document.documentElement.scrollTop / mainSection.offsetHeight) * 255);

    if (colorRGB < 0) { colorRGB = 0 }
    lnbBtn.forEach(tg => {
        tg.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });

    header.querySelectorAll('.btn-main-menu i').forEach(tg => {
        tg.style.backgroundColor = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });
}

header.querySelector('.btn-main-menu').addEventListener('click', function () {
    actionToggleMainMenu.actionToggle(btnMainMenu, lnb)
});

lnbBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
        moveScrollByAnchor(e);
    });
    btn.addEventListener('focus', function () {
        actionToggleHeader().show();
    });
    btn.addEventListener('blur', function () {
        actionToggleHeader().hide();
    });
});
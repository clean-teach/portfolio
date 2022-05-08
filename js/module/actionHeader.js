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
function actionToggleHeaderByScroll(portfolioSection) {
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
function setMoveScrollByAnchor(event) {
    event.preventDefault();
    const target = event.target || event.srcElement;
    const targetHref = target.getAttribute('href');
    let scrollTo;
    if(targetHref === '#footer'){
        scrollTo = document.body.scrollHeight;
    }else if(targetHref === '#contact-section'){
        scrollTo = document.querySelector(targetHref).offsetTop + document.querySelector(targetHref).clientHeight - window.innerHeight;
    }else{
        scrollTo = document.querySelector(targetHref).offsetTop;
    }
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
    });
}

// LNB 버튼 이벤트 바인드
export const bindLnbButton = () => {
    lnb.addEventListener('click', function (e) {
        actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
        setMoveScrollByAnchor(e);
    });
    lnb.addEventListener('focus', function () {
        actionToggleHeaderByScroll(portfolioSection).show();
    });
    lnb.addEventListener('blur', function () {
        actionToggleHeaderByScroll(portfolioSection).hide();
    });
};

// 메인메뉴 버튼 (햄버거 버튼) 이벤트 바인드
export const bindMainMenuButton = () => {
    const mainMenuButton = header.querySelector('.btn-main-menu');

    mainMenuButton.addEventListener('click', function () {
        actionToggleMainMenu.actionToggle(btnMainMenu, lnb);
    });
};

// scroll 상태에 따른 Local Navigation Button Style
export function lnbStylingByScroll(e) {
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        header.classList.add('on');
    } else {
        header.style['transition'] = 'none';
        header.classList.remove('on');
    }
    if (e && getScrollDirection() === 'DOWN') {
        actionToggleHeaderByScroll(portfolioSection).hide();
    } else if (e && getScrollDirection() === 'UP') {
        actionToggleHeaderByScroll(portfolioSection).show();
    }
}

// scroll에 따른 색상 값 (LNB, MainMenu)
export const setHeaderColorByScroll = (mainSection) => {
    const mainMenuObj = header.querySelectorAll('.btn-main-menu i');
    let colorRGB = 255 - ((document.documentElement.scrollTop / mainSection.offsetHeight) * 255);

    mainMenuObj.forEach(tg => {
        tg.style.backgroundColor = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });

    if (colorRGB < 0) { colorRGB = 0 }
    lnbBtn.forEach(tg => {
        tg.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });
}
import { getScrollDirection } from "../utils/utils.js";

const header = document.querySelector('header') as HTMLElement;
const btnMainMenu = header.querySelector('.btn-main-menu') as HTMLElement;
const lnb = header.querySelector('#lnb') as HTMLElement;
const lnbBtn = lnb.querySelectorAll('a');
const portfolioSection = document.querySelector('#portfolio-section') as HTMLElement;

// LNB 버튼 이벤트 바인드
export const bindLnbButton = () => {
    lnb.addEventListener('click', function (e) {
        actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
        setMoveScrollByAnchor(e);
    });
    lnb.addEventListener('focus', actionToggleHeaderByScroll(portfolioSection).show);
    lnb.addEventListener('blur', actionToggleHeaderByScroll(portfolioSection).hide);
};

// 메인메뉴 버튼 (햄버거 버튼) 이벤트 바인드
export const bindMainMenuButton = () => {
    const mainMenuButton = header.querySelector('.btn-main-menu') as HTMLParagraphElement;

    mainMenuButton.addEventListener('click', function () {
        actionToggleMainMenu.actionToggle(btnMainMenu, lnb);
    });
};

// scroll 상태에 따른 Local Navigation Button Style
export function lnbStylingByScroll(...e:any) {
    const CLASS_NAME_ON = 'on';

    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        header.classList.add(CLASS_NAME_ON);
    } else {
        header.style['transition'] = 'none';
        header.classList.remove(CLASS_NAME_ON);
    }
    if (e && getScrollDirection() === 'DOWN') {
        actionToggleHeaderByScroll(portfolioSection).hide();
    } else if (e && getScrollDirection() === 'UP') {
        actionToggleHeaderByScroll(portfolioSection).show();
    }
}

// scroll에 따른 색상 값 (LNB, MainMenu)
export const setHeaderColorByScroll = (mainSection: HTMLElement) => {
    const mainMenuObj = header.querySelectorAll('.btn-main-menu i');
    let colorRGB = 255 - ((document.documentElement.scrollTop / mainSection.offsetHeight) * 255);

    mainMenuObj.forEach((tg:any) => {
        tg.style.backgroundColor = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });

    if (colorRGB < 0) { colorRGB = 0 }
    lnbBtn.forEach(tg => {
        tg.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
    });
}

// 메인메뉴 버튼 동작함수용 객체
const actionToggleMainMenu = {
    state: false,
    className: {
        btnOnClassName: 'mode-close',
        menuOnClassName: 'on'
    },
    actionMenuOpen: function (btn: { classList: { add: (arg0: string) => void; }; }, menu: { classList: { add: (arg0: string) => void; }; }):void {
        btn.classList.add(this.className.btnOnClassName);
        menu.classList.add(this.className.menuOnClassName);
        this.state = true;
    },
    actionMenuClose: function (btn: { classList: { remove: (arg0: string) => void; }; }, menu: { classList: { remove: (arg0: string) => void; }; }):void {
        btn.classList.remove(this.className.btnOnClassName);
        menu.classList.remove(this.className.menuOnClassName);
        this.state = false;
    },
    actionToggle: function (btn:any, menu:any):void {
        if (this.state === false) {
            this.actionMenuOpen(btn, menu);
        } else {
            this.actionMenuClose(btn, menu);
        }
    }

};

// 스크롤 위아래 방향에 따른 헤더 노출 여부
function actionToggleHeaderByScroll(portfolioSection:any) {
    if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
        return {
            hide: function ():void {
                header.style['top'] = `-${header.offsetHeight}px`;
            },
            show: function ():void {
                header.style['top'] = `${0}`;
                header.style['transition'] = '1s';
            }
        };
    } else {
        return {
            hide: function ():void {
                null;
            },
            show: function ():void {
                null;
            }
        };
    }
}

// 앵커태그 부드러운 동작 함수
export function setMoveScrollByAnchor(event:any, targetHref?:any):void {
    event.preventDefault();
    const target = event.target || event.srcElement;
    if(target.tagName === 'A'){
        if(event.type === 'click'){
            targetHref = target.getAttribute('href');
        }  
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
}
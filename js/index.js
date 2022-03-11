import {getScrollDirection, getPythagorean} from "./utils/utils.js";
import { mouseMoveColor } from "./module/MouseMoveColor.js";
import { setFooterCardRotate } from "./module/footerCard.js";
import { backgroundStyleMotion } from "./module/backgroundMotionStyle.js";
import { actionContactTxtMotion } from "./module/actionContactTxtMotion.js";
import { setIntervalTitle } from "./module/setIntervalTitle.js";

(function () {
    const header = document.querySelector('header');
    const btnMainMenu = header.querySelector('.btn-main-menu')
    const lnb = header.querySelector('#lnb')
    const lnbBtn = lnb.querySelectorAll('a');
    const mainSection = document.querySelector('#main-section');
    const portfolioSection = document.querySelector('#portfolio-section');
    const portfolioList = document.querySelectorAll('.portfolio-list>li');
    const contactSection = document.querySelector('#contact-section');
    const card = document.querySelector('footer .card');

    let winInnerHeight = window.innerHeight,
        pageScrollHeight = document.body.scrollHeight,
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight,
        scrollBottom,
        effectClassName,
        portfolioSectionPosiTop = portfolioSection.offsetTop;

    

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

    // 앵커태그 부드러운 동작 함수
    function actionAnchorScrollMove(event) {
        const target = event.target || event.srcElement;
        event.preventDefault();
        window.scrollTo({
            top: document.querySelector(target.getAttribute('href')).offsetTop,
            behavior: 'smooth'
        });
    }

    // scroll에 따른 회전
    function scrollRotate(id) {
        let obj = document.getElementById(id);
        obj.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
        if (document.documentElement.scrollTop !== 0) {
            obj.classList.remove('rotate-animate');
        } else {
            obj.classList.add('rotate-animate');
        }
    }

    // scroll에 따른 색상 값 (LNB, MainSection)
    function setColor() {
        let colorRGB = 255 - ((document.documentElement.scrollTop / mainSection.offsetHeight) * 255);

        if (colorRGB < 0) { colorRGB = 0 }
        lnbBtn.forEach(tg => {
            tg.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
        });

        header.querySelectorAll('.btn-main-menu i').forEach(tg => {
            tg.style.backgroundColor = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`
        });
    }

    // scroll 상태에 따른 Local Navigation Button Style
    function setLnbStyle(e) {
        if (document.documentElement.scrollTop >= portfolioSection.offsetTop) {
            header.classList.add('on');
        } else {
            header.style['transition'] = 'none';
            header.classList.remove('on');
        }
        if (e && getScrollDirection() === 'DOWN') {
            actionHeaderToggle().hide();
        } else if (e && getScrollDirection() === 'UP') {
            actionHeaderToggle().show();
        }
    }
    function actionHeaderToggle() {
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

    // 스크롤 이벤트에 따른 포트폴리오 영역 활성화
    function actionPortfolioScrollActive() {
        let winHeightHalf = (window.innerHeight / 2);

        // 포트폴리오 글자 영역 나타나는 조건에 대한 함수
        function setImgActive(obj, i, arr) {
            const target = arr[i].querySelector('.img-area');
            let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;

            if (startPoint) {
                target.classList.add('on');
            } else {
                target.classList.remove('on');
            }
        }

        function setTxtActive(obj, i, arr) {
            const txtBox = arr[i].querySelector('.txt-area');
            let
                startPoint = scrollBottom - winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top,
                endPoint = scrollBottom - winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;

            if (startPoint && endPoint) {
                txtBox.classList.add('on');
            } else {
                txtBox.classList.remove('on');
            }
        }

        portfolioList.forEach((obj, i, arr) => {
            setImgActive(obj, i, arr);
            setTxtActive(obj, i, arr);
        });
    }
    portfolioList.forEach((obj, i, arr) => {
        arr[i].querySelector('.txt-area button').addEventListener('focus', function (e) {
            window.scrollTo(0, window.pageYOffset + arr[i].getBoundingClientRect().top);
            arr[i].querySelector('.img-area').classList.add('on');
            arr[i].querySelector('.txt-area').classList.add('on');
        });
        arr[i].querySelector('.txt-area button').addEventListener('blur', function () {
            window.scrollTo(0, 0);
            arr[i].querySelector('.img-area').classList.remove('on');
            arr[i].querySelector('.txt-area').classList.remove('on');
        });
    });

    // Contact Section의 form 태그 focus 효과
    contactSection.querySelectorAll('input, textarea').forEach(formBox => {
        formBox.addEventListener('focus', function () {
            this.parentNode.querySelector('label').classList.add('on');
        });
        formBox.addEventListener('blur', function () {
            this.parentNode.querySelector('label').classList.remove('on');
        });
    });

    window.addEventListener('load', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;

        setIntervalTitle();
        setColor();
        setLnbStyle();
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));
        actionPortfolioScrollActive();
        setFooterCardRotate(scrollBottom, cardOffsetTop, pageScrollHeight);
    });

    header.querySelector('.btn-main-menu').addEventListener('click', function () {
        actionToggleMainMenu.actionToggle(btnMainMenu, lnb)
    });

    lnbBtn.forEach(btn => {
        btn.addEventListener('click', function (e) {
            actionToggleMainMenu.actionMenuClose(btnMainMenu, lnb);
            actionAnchorScrollMove(e);
        });
        btn.addEventListener('focus', function () {
            actionHeaderToggle().show();
        });
        btn.addEventListener('blur', function () {
            actionHeaderToggle().hide();
        });
    });

    // 마우스 우클릭 금지
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.addEventListener('mousemove', function (e) {
        mouseMoveColor.getMouseMoveColor(e, mainSection);
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));
    });

    document.addEventListener('scroll', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setColor();
        setLnbStyle(e);
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));

        mainSection.querySelector('.tit').style['left'] = `-${document.documentElement.scrollTop * 1}px`;
        mainSection.querySelector('.txt').style['top'] = `-${document.documentElement.scrollTop * .02}px`;
        mainSection.querySelector('.vertical').style['top'] = `${document.documentElement.scrollTop * .4}px`;

        backgroundStyleMotion.move(scrollBottom, contactSection);
        scrollRotate('circle-scroll-svg');
        actionPortfolioScrollActive();
        actionContactTxtMotion(winInnerHeight).move(scrollBottom);
        setFooterCardRotate(scrollBottom, cardOffsetTop, pageScrollHeight);
    });
    document.addEventListener('mouseenter', function (e) {
        document.body.style.transition = '0s';
    });
    document.addEventListener('mouseleave', function (e) {
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));
        document.body.style.transition = `1s`;
    });
}());
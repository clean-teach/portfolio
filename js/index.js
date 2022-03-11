import { scrollRotate } from "./utils/utils.js";
import { mouseMoveColor } from "./module/MouseMoveColor.js";
import { setFooterCardRotate } from "./module/footerCard.js";
import { backgroundStyleMotion } from "./module/backgroundMotionStyle.js";
import { actionContactTxtMotion } from "./module/actionContactTxtMotion.js";
import { setIntervalTitle } from "./module/setIntervalTitle.js";
import { setColor, setLnbStyle } from "./module/actionHeader.js";
import { actionPortfolioScrollActive } from "./module/actionPortfolioScrollActive.js";

(function () {
    const mainSection = document.querySelector('#main-section');
    const contactSection = document.querySelector('#contact-section');
    const card = document.querySelector('footer .card');

    let winInnerHeight = window.innerHeight,
        pageScrollHeight = document.body.scrollHeight,
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight,
        scrollBottom,
        effectClassName;

    window.addEventListener('load', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;

        setIntervalTitle();
        setColor(mainSection);
        setLnbStyle();
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));
        actionPortfolioScrollActive(scrollBottom);
        setFooterCardRotate(scrollBottom, cardOffsetTop, pageScrollHeight);
    });

    // 마우스 우클릭 금지
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('mousemove', function (e) {
        mouseMoveColor.getMouseMoveColor(e, mainSection);
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));
    });
    document.addEventListener('scroll', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setColor(mainSection);
        setLnbStyle(e);
        mouseMoveColor.setBackgroundColor(1 - (document.documentElement.scrollTop / mainSection.offsetHeight));

        mainSection.querySelector('.tit').style['left'] = `-${document.documentElement.scrollTop * 1}px`;
        mainSection.querySelector('.txt').style['top'] = `-${document.documentElement.scrollTop * .02}px`;
        mainSection.querySelector('.vertical').style['top'] = `${document.documentElement.scrollTop * .4}px`;

        backgroundStyleMotion.move(scrollBottom, contactSection);
        scrollRotate('circle-scroll-svg');
        actionPortfolioScrollActive(scrollBottom);
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
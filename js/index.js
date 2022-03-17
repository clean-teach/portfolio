import { setIntervalTitle } from "./module/setIntervalTitle.js";
import { accessibility } from "./module/accessibility.js";
import { scrollRotate } from "./utils/utils.js";
import { setHeaderColorByScroll, lnbStylingByScroll, bindLnbButton, bindMainMenuButton } from "./module/actionHeader.js";
import { setBackgroundColorByMouseMove } from "./module/setBackgroundColorByMouseMove.js";
import { setBackgroundStyleByScroll } from "./module/backgroundMotionStyle.js";
import { activePortfolioByScroll } from "./module/activePortfolioByScroll.js";
import { actionContactTxtByScroll, bindContactForm, motionContactAreaByScroll } from "./module/actionContactArea.js";
import { bindFooterCard, rotateFooterCardByScoll } from "./module/footerCard.js";

function main(){
    const mainSection = document.querySelector('#main-section');
    
    let winInnerHeight = window.innerHeight,
        pageScrollHeight = document.body.scrollHeight,
        scrollBottom;

    setIntervalTitle();
    accessibility();
    bindLnbButton();
    bindMainMenuButton();
    bindContactForm();
    bindFooterCard();

    window.addEventListener('load', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setHeaderColorByScroll(mainSection);
        lnbStylingByScroll();
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
        activePortfolioByScroll.action(scrollBottom);
        motionContactAreaByScroll(scrollBottom);
        rotateFooterCardByScoll(scrollBottom, pageScrollHeight, winInnerHeight);
    });

    // 마우스 우클릭 금지
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('mousemove', function (e) {
        setBackgroundColorByMouseMove.getMouseMove(e, mainSection);
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    });
    document.addEventListener('scroll', function (e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setHeaderColorByScroll(mainSection);
        lnbStylingByScroll(e);
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);

        mainSection.querySelector('.tit').style['left'] = `-${document.documentElement.scrollTop * 1}px`;
        mainSection.querySelector('.txt').style['top'] = `-${document.documentElement.scrollTop * .02}px`;
        mainSection.querySelector('.vertical').style['top'] = `${document.documentElement.scrollTop * .4}px`;

        setBackgroundStyleByScroll.move(scrollBottom);
        scrollRotate('circle-scroll-svg');
        activePortfolioByScroll.action(scrollBottom);
        motionContactAreaByScroll(scrollBottom);
        actionContactTxtByScroll(winInnerHeight).move(scrollBottom);
        rotateFooterCardByScoll(scrollBottom, pageScrollHeight, winInnerHeight);
    });
    document.addEventListener('mouseenter', function (e) {
        document.body.style.transition = '0s';
    });
    document.addEventListener('mouseleave', function (e) {
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
        document.body.style.transition = `1s`;
    });
}
document.addEventListener('DOMContentLoaded', main);

// 브라우저 사이즈 변경시 새로고침
window.addEventListener('resize', function(){
    document.location.reload();
});
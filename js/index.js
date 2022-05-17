import { setIntervalTitle } from "./module/setIntervalTitle.js";
import { accessibility } from "./module/accessibility.js";
import { optimizeAnimation, scrollRotate } from "./utils/utils.js";
import { setHeaderColorByScroll, lnbStylingByScroll, bindLnbButton, bindMainMenuButton } from "./module/actionHeader.js";
import { setBackgroundColorByMouseMove } from "./module/setBackgroundColorByMouseMove.js";
import { setBackgroundStyleByScroll } from "./module/setBackgroundStyleByScroll.js";
import { activePortfolioByScroll } from "./module/actionStylePortfolioByScroll.js";
import { bindContactForm, motionContactAreaByScroll } from "./module/actionStyleContactArea.js";
import { bindFooterCard, rotateFooterCardByScoll } from "./module/actionStyleFooterCard.js";

(function(){
    let mainSection,
        winInnerHeight,
        pageScrollHeight,
        scrollBottom;

    /*** Event ***/
    ///////////////////////////////////////////
    document.addEventListener('DOMContentLoaded', mainHandler);
    window.addEventListener('load', windowLoadHandler);

    // 브라우저 사이즈 변경시 새로고침
    window.addEventListener('resize', function(){
        document.location.reload();
    });
    
    // 마우스 우클릭 금지
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('scroll', documentScrollHandler, { passive: true });
    document.addEventListener('mouseenter', function (e) {
        document.body.style.transition = '0s';
    });
    document.addEventListener('mouseleave', function (e) {
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
        document.body.style.transition = `1s`;
    });

    /*** Event Handler ***/
    ///////////////////////////////////////////
    function mainHandler(){
        mainSection = document.querySelector('#main-section');
    
        setIntervalTitle();
        accessibility();
        bindLnbButton();
        bindMainMenuButton();
        bindContactForm();
        bindFooterCard();
    }
    function windowLoadHandler(){
        winInnerHeight = window.innerHeight,
        pageScrollHeight = document.body.scrollHeight;
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setHeaderColorByScroll(mainSection);
        lnbStylingByScroll();
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
        activePortfolioByScroll.action(scrollBottom);
        motionContactAreaByScroll.get(winInnerHeight);
        motionContactAreaByScroll.scroll(scrollBottom);
        rotateFooterCardByScoll(scrollBottom, pageScrollHeight, winInnerHeight);
    }
    function documentMouseMoveHandler(e){
        setBackgroundColorByMouseMove.getMouseMove(e, mainSection);
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    }
    function documentScrollHandler(e){
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
        optimizeAnimation(
            motionContactAreaByScroll.scroll(scrollBottom)
        );
        rotateFooterCardByScoll(scrollBottom, pageScrollHeight, winInnerHeight);
    }
})()
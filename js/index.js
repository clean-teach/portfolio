import { setIntervalTitle } from "./module/setIntervalTitle.js";
import { accessibility } from "./module/accessibility.js";
import { optimizeAnimation, scrollRotate } from "./utils/utils.js";
import { setHeaderColorByScroll, lnbStylingByScroll, bindLnbButton, bindMainMenuButton } from "./module/actionHeader.js";
import { setBackgroundColorByMouseMove } from "./module/setBackgroundColorByMouseMove.js";
import { setBackgroundStyleByScroll } from "./module/setBackgroundStyleByScroll.js";
import { activePortfolioByScroll } from "./module/actionStylePortfolioByScroll.js";
import { bindContactForm, motionContactAreaByScroll } from "./module/actionStyleContactArea.js";
import { bindFooterCard, rotateFooterCardByScoll } from "./module/actionStyleFooterCard.js";
import { bindTabButton } from "./module/actionTab.js";

(function(){
    let mainSection,
        winInnerHeight,
        scrollBottom;

    /*** Event ***/
    ///////////////////////////////////////////
    document.addEventListener('DOMContentLoaded', mainHandler);
    window.addEventListener('load', windowLoadHandler);

    // 브라우저 사이즈 변경시 새로고침
    window.addEventListener('resize', windowResizeHandler);
    
    // 마우스 우클릭 금지
    document.addEventListener('contextmenu', e => e.preventDefault());
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
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setHeaderColorByScroll(mainSection);
        lnbStylingByScroll();
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
        activePortfolioByScroll.action(scrollBottom);
        motionContactAreaByScroll.get(winInnerHeight);
        motionContactAreaByScroll.scrollHandler(scrollBottom);
        rotateFooterCardByScoll(scrollBottom, winInnerHeight);
        bindTabButton(document.querySelector('#portfolio-section .category-tab-wrap'));
        function bindTabButton (tabArea) {
            const CLASS_NAME_ON = 'on';
            let currentTab = tabArea.querySelector(`button.${CLASS_NAME_ON}`);
        
            filteringCategoryByTab(tabArea.querySelector(`.${CLASS_NAME_ON}`));
            tabArea.addEventListener('click', tabClickHandler);
        
            function tabClickHandler(event){
                if(event.target.type === 'button'){
                    currentTab.classList.remove(CLASS_NAME_ON);
                    event.target.classList.add(CLASS_NAME_ON);
                    currentTab = event.target;
                    filteringCategoryByTab(event.target);
                }
                motionContactAreaByScroll.get(winInnerHeight);
            }
        };
        
        function filteringCategoryByTab(currentBtn){
            const list = document.querySelectorAll('#portfolio-section .portfolio-list > li');
            const CLASS_NAME_HIDDEN = 'hidden';
        
            list.forEach(item => {
                item.classList.add(CLASS_NAME_HIDDEN);
                if(currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
                    item.classList.remove(CLASS_NAME_HIDDEN);
                }
            });
        }
    }
    function windowResizeHandler(){
        activePortfolioByScroll.action(scrollBottom);
        motionContactAreaByScroll.get(winInnerHeight);
        motionContactAreaByScroll.scrollHandler(scrollBottom);
        rotateFooterCardByScoll(scrollBottom, winInnerHeight);
        // document.location.reload();
    }
    function documentMouseMoveHandler(event){
        setBackgroundColorByMouseMove.getMouseMove(event, mainSection);
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    }
    function documentScrollHandler(event){
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    
        setHeaderColorByScroll(mainSection);
        lnbStylingByScroll(event);
        setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
    
        animationMainSectionByScroll();
    
        setBackgroundStyleByScroll.move(scrollBottom);
        scrollRotate('circle-scroll-svg');
        activePortfolioByScroll.action(scrollBottom);
        optimizeAnimation(
            motionContactAreaByScroll.scrollHandler(scrollBottom)
        );
        rotateFooterCardByScoll(scrollBottom, winInnerHeight);
    }
    function animationMainSectionByScroll(){
        mainSection.querySelector('.tit').style['left'] = `-${document.documentElement.scrollTop * 1}px`;
        mainSection.querySelector('.txt').style['top'] = `-${document.documentElement.scrollTop * .02}px`;
        mainSection.querySelector('.vertical').style['top'] = `${document.documentElement.scrollTop * .4}px`;
    }
})()
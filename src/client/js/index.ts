import { setIntervalTitle } from './module/setIntervalTitle';
import { accessibility } from './module/accessibility';
import { optimizeAnimation, scrollRotate } from './utils/utils';
import {
  setHeaderColorByScroll,
  lnbStylingByScroll,
  bindLnbButton,
  bindMainMenuButton,
} from './module/actionHeader';
import { setBackgroundColorByMouseMove } from './module/setBackgroundColorByMouseMove';
import { setBackgroundStyleByScroll } from './module/setBackgroundStyleByScroll';
import { activePortfolioByScroll } from './module/actionStylePortfolioByScroll';
import {
  bindContactForm,
  motionContactAreaByScroll,
} from './module/actionStyleContactArea';
import {
  bindFooterCard,
  rotateFooterCardByScoll,
} from './module/actionStyleFooterCard';
import { filteringCategoryByTab } from './module/actionTab';
import { checkTimeUserStay } from './module/clock';

let mainSection: any, winInnerHeight: number, scrollBottom;

/*** Event ***/
///////////////////////////////////////////
document.addEventListener('DOMContentLoaded', mainHandler);
window.addEventListener('load', windowLoadHandler);

// 브라우저 사이즈 변경시 새로고침
window.addEventListener('resize', windowResizeHandler);

// 마우스 우클릭 금지
document.addEventListener('contextmenu', (e) => e.preventDefault());
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
function mainHandler(): void {
  mainSection = document.querySelector('#main-section');

  checkTimeUserStay().playClock();
  setIntervalTitle();
  accessibility();
  bindLnbButton();
  bindMainMenuButton();
  bindContactForm();
  bindFooterCard();
}
function windowLoadHandler(): void {
  winInnerHeight = window.innerHeight;
  scrollBottom = document.documentElement.scrollTop + winInnerHeight;

  setHeaderColorByScroll(mainSection);
  lnbStylingByScroll();
  setBackgroundStyleByScroll.setInit();
  setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
  activePortfolioByScroll.action(scrollBottom);
  motionContactAreaByScroll.get(winInnerHeight);
  motionContactAreaByScroll.scrollHandler(scrollBottom);
  rotateFooterCardByScoll(scrollBottom, winInnerHeight);
  bindTabButton(
    document.querySelector('#portfolio-section .category-tab-wrap'),
  );
}
function windowResizeHandler(): void {
  (winInnerHeight = window.innerHeight),
    (scrollBottom = document.documentElement.scrollTop + winInnerHeight);

  activePortfolioByScroll.action(scrollBottom);
  motionContactAreaByScroll.get(winInnerHeight);
  motionContactAreaByScroll.scrollHandler(scrollBottom);
  rotateFooterCardByScoll(scrollBottom, winInnerHeight);
  // document.location.reload();
}
function documentMouseMoveHandler(event: any): void {
  setBackgroundColorByMouseMove.getMouseMove(event, mainSection);
  setBackgroundColorByMouseMove.setBackgroundColor(mainSection);
}
function documentScrollHandler(event: any): void {
  scrollBottom = document.documentElement.scrollTop + winInnerHeight;

  setHeaderColorByScroll(mainSection);
  lnbStylingByScroll(event);
  setBackgroundColorByMouseMove.setBackgroundColor(mainSection);

  animationMainSectionByScroll();

  setBackgroundStyleByScroll.move(scrollBottom);
  scrollRotate('circle-scroll-svg');
  activePortfolioByScroll.action(scrollBottom);
  optimizeAnimation(motionContactAreaByScroll.scrollHandler(scrollBottom));
  rotateFooterCardByScoll(scrollBottom, winInnerHeight);
}
function animationMainSectionByScroll(): void {
  mainSection.querySelector('.tit').style['left'] = `-${
    document.documentElement.scrollTop * 1
  }px`;
  mainSection.querySelector('.txt').style['top'] = `-${
    document.documentElement.scrollTop * 0.02
  }px`;
  mainSection.querySelector('.vertical').style['top'] = `${
    document.documentElement.scrollTop * 0.4
  }px`;
}

function bindTabButton(tabArea: any): void {
  const CLASS_NAME_ON = 'on';
  let currentTab = tabArea.querySelector(`button.${CLASS_NAME_ON}`);

  filteringCategoryByTab(tabArea.querySelector(`.${CLASS_NAME_ON}`));
  tabArea.addEventListener('click', tabClickHandler);

  function tabClickHandler(event: any) {
    if (event.target.type === 'button') {
      currentTab.classList.remove(CLASS_NAME_ON);
      event.target.classList.add(CLASS_NAME_ON);
      currentTab = event.target;
      filteringCategoryByTab(event.target);
    }
    motionContactAreaByScroll.get(winInnerHeight);
  }
}

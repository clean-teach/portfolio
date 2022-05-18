// import { motionContactAreaByScroll } from "./actionStyleContactArea";

export function bindTabButton (tabArea) {
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
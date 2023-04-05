import { motionContactAreaByScroll } from './actionStyleContactArea';
import { filteringCategoryByTab } from './actionTab';

export function bindTabButton(tabArea: any, winInnerHeight: number): void {
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

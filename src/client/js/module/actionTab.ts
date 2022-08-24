export function filteringCategoryByTab(currentBtn: HTMLElement){
    const list = document.querySelectorAll('#portfolio-section .portfolio-list > li') as NodeListOf<HTMLElement>;
    const CLASS_NAME_HIDDEN = 'hidden';

    list.forEach((item:HTMLElement): void => {
        item.classList.add(CLASS_NAME_HIDDEN);
        if(currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
            item.classList.remove(CLASS_NAME_HIDDEN);
        }
    });
}
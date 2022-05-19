export function filteringCategoryByTab(currentBtn: HTMLElement){
    const list = document.querySelectorAll('#portfolio-section .portfolio-list > li');
    const CLASS_NAME_HIDDEN = 'hidden';

    list.forEach(item => {
        item.classList.add(CLASS_NAME_HIDDEN);
        if(currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
            item.classList.remove(CLASS_NAME_HIDDEN);
        }
    });
}
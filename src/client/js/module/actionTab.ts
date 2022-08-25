export function filteringCategoryByTab(currentBtn: HTMLElement){
    const portfolios = document.querySelector('#portfolio-section .portfolio-list') as HTMLElement;
    const portfolioListPositionRelativeTop = window.pageYOffset + portfolios.getBoundingClientRect().top + window.innerHeight;
    const list = document.querySelectorAll('#portfolio-section .portfolio-list > li') as NodeListOf<HTMLElement>;
    const CLASS_NAME_HIDDEN = 'hidden';

    window.scrollTo(0, portfolioListPositionRelativeTop);

    list.forEach((item:HTMLElement): void => {
        item.classList.add(CLASS_NAME_HIDDEN);
        if(currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
            item.classList.remove(CLASS_NAME_HIDDEN);
        }
    });
}
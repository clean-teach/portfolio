export function filteringCategoryByTab(currentBtn) {
    var list = document.querySelectorAll('#portfolio-section .portfolio-list > li');
    var CLASS_NAME_HIDDEN = 'hidden';
    list.forEach(function (item) {
        item.classList.add(CLASS_NAME_HIDDEN);
        if (currentBtn.dataset.category === 'total' || currentBtn.dataset.category === item.dataset.category) {
            item.classList.remove(CLASS_NAME_HIDDEN);
        }
    });
}
//# sourceMappingURL=actionTab.js.map
export var activePortfolioByScroll = {
    portfolioList: document.querySelectorAll('.portfolio-list>li'),
    winHeightHalf: (window.innerHeight / 2),
    setImgActive: function (scrollBottom, i, arr) {
        var target = arr[i].querySelector('.img-area');
        if (target) {
            var CLASS_NAME_ON = 'on';
            var startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;
            if (startPoint) {
                target.classList.add(CLASS_NAME_ON);
            }
            else {
                target.classList.remove(CLASS_NAME_ON);
            }
        }
    },
    setTxtActive: function (scrollBottom, i, arr) {
        var currentElement = arr[i];
        var txtBox = currentElement.querySelector('.txt-area');
        if (txtBox) {
            var CLASS_NAME_ON = 'on';
            var startPoint = scrollBottom - this.winHeightHalf > window.pageYOffset + currentElement.getBoundingClientRect().top, endPoint = scrollBottom - this.winHeightHalf < window.pageYOffset + currentElement.getBoundingClientRect().top + currentElement.offsetHeight;
            if (startPoint && endPoint) {
                txtBox.classList.add(CLASS_NAME_ON);
            }
            else {
                txtBox.classList.remove(CLASS_NAME_ON);
            }
        }
    },
    action: function (scrollBottom) {
        var _this = this;
        this.portfolioList.forEach(function (obj, i, arr) {
            _this.setImgActive(scrollBottom, i, arr);
            _this.setTxtActive(scrollBottom, i, arr);
        });
    }
};
//# sourceMappingURL=actionStylePortfolioByScroll.js.map
// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
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
        var txtBox = arr[i].querySelector('.txt-area');
        if (txtBox) {
            var CLASS_NAME_ON = 'on';
            var startPoint = scrollBottom - this.winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top, endPoint = scrollBottom - this.winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;
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
// export function actionPortfolioScrollActive(scrollBottom) {
//     const portfolioList: document.querySelectorAll('.portfolio-list>li'),
//     const winHeightHalf = (window.innerHeight / 2);
//     // 포트폴리오 글자 영역 나타나는 조건에 대한 함수
//     function setImgActive(obj, i, arr) {
//         const target = arr[i].querySelector('.img-area');
//         let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;
//         if (startPoint) {
//             target.classList.add('on');
//         } else {
//             target.classList.remove('on');
//         }
//     }
//     function setTxtActive(obj, i, arr) {
//         const txtBox = arr[i].querySelector('.txt-area');
//         let
//             startPoint = scrollBottom - winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top,
//             endPoint = scrollBottom - winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;
//         if (startPoint && endPoint) {
//             txtBox.classList.add('on');
//         } else {
//             txtBox.classList.remove('on');
//         }
//     }
//     portfolioList.forEach((obj, i, arr) => {
//         setImgActive(obj, i, arr);
//         setTxtActive(obj, i, arr);
//     });
// }
//# sourceMappingURL=actionStylePortfolioByScroll.js.map
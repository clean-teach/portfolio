// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
export const activePortfolioByScroll = {
    portfolioList: document.querySelectorAll('.portfolio-list>li'),
    winHeightHalf : (window.innerHeight / 2),
    setImgActive(scrollBottom, i, arr) {
        const target = arr[i].querySelector('.img-area');
        let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;

        if (startPoint) {
            target.classList.add('on');
        } else {
            target.classList.remove('on');
        }
    },
    setTxtActive(scrollBottom, i, arr) {
        const txtBox = arr[i].querySelector('.txt-area');
        let
            startPoint = scrollBottom - this.winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top,
            endPoint = scrollBottom - this.winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;

        if (startPoint && endPoint) {
            txtBox.classList.add('on');
        } else {
            txtBox.classList.remove('on');
        }
    },
    action(scrollBottom){
        this.portfolioList.forEach((obj, i, arr) => {
            this.setImgActive(scrollBottom, i, arr);
            this.setTxtActive(scrollBottom, i, arr);
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
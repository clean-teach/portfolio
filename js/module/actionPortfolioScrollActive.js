const portfolioList = document.querySelectorAll('.portfolio-list>li');
// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
export function actionPortfolioScrollActive(scrollBottom) {
    let winHeightHalf = (window.innerHeight / 2);

    // 포트폴리오 글자 영역 나타나는 조건에 대한 함수
    function setImgActive(obj, i, arr) {
        const target = arr[i].querySelector('.img-area');
        let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;

        if (startPoint) {
            target.classList.add('on');
        } else {
            target.classList.remove('on');
        }
    }

    function setTxtActive(obj, i, arr) {
        const txtBox = arr[i].querySelector('.txt-area');
        let
            startPoint = scrollBottom - winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top,
            endPoint = scrollBottom - winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;

        if (startPoint && endPoint) {
            txtBox.classList.add('on');
        } else {
            txtBox.classList.remove('on');
        }
    }

    portfolioList.forEach((obj, i, arr) => {
        setImgActive(obj, i, arr);
        setTxtActive(obj, i, arr);
    });
}
portfolioList.forEach((obj, i, arr) => {
    arr[i].querySelector('.txt-area button').addEventListener('focus', function (e) {
        window.scrollTo(0, window.pageYOffset + arr[i].getBoundingClientRect().top);
        arr[i].querySelector('.img-area').classList.add('on');
        arr[i].querySelector('.txt-area').classList.add('on');
    });
    arr[i].querySelector('.txt-area button').addEventListener('blur', function () {
        window.scrollTo(0, 0);
        arr[i].querySelector('.img-area').classList.remove('on');
        arr[i].querySelector('.txt-area').classList.remove('on');
    });
});
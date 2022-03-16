export function accessibility() {
// 웹 접근성 관련 코드
    const portfolioList = document.querySelectorAll('.portfolio-list>li');
    const arrActiveTargetClassName = [
        '.img-area',
        '.txt-area'
    ];

    // 포트폴리오 영역 버튼에 대한 포커스 접근성 코드
    function focusPortfolioButton(targetPortfolio, scrollY, active){
        for(let i; i < arrActiveTargetClassName.length; i++){
            if(active){
                targetPortfolio.querySelector(arrActiveTargetClassName[i]).classList.add('on');
            }else if(active == ''){
                targetPortfolio.querySelector(arrActiveTargetClassName[i]).classList.remove('on');
            }
        }
        if(!scrollY == ''){
            window.scrollTo(0, scrollY);
        }
    }
    portfolioList.forEach((obj, i, arr) => {
        const targetPortfolio = arr[i];
        const button = targetPortfolio.querySelector('.txt-area button');

        button.addEventListener('focus', function (e) {
            focusPortfolioButton(targetPortfolio, window.pageYOffset + targetPortfolio.getBoundingClientRect().top, true);
        });
        button.addEventListener('blur', function () {
            focusPortfolioButton(targetPortfolio);
        });
    });
}
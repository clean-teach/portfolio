import { setMoveScrollByAnchor } from "./actionHeader.js";

export function accessibility() {
// 웹 접근성 관련 코드
    const portfolioList = document.querySelectorAll('.portfolio-list>li') as NodeListOf<HTMLElement>;
    const lastPortfolioButtons = portfolioList[portfolioList.length-1].querySelectorAll('.txt-area button');
    const lastPortfolioLastButton = lastPortfolioButtons[lastPortfolioButtons.length-1];
    let activePortfolioButton: any = null;
    const CLASS_NAME_ON = 'on';

    // 포트폴리오 영역 버튼에 대한 포커스 접근성 코드
    portfolioList.forEach((obj, i, arr) => {
        const targetPortfolio = arr[i];
        const button = targetPortfolio.querySelector('.txt-area button');
        if(button){
            button.addEventListener('focus', (e) => {
                focusPortfolioButtonHandler(e, window.pageYOffset + targetPortfolio.getBoundingClientRect().top);
            });
            button.addEventListener('blur', blurPortfolioButtonHandler);
        }
    });
    lastPortfolioLastButton.addEventListener('blur', lastPortfolioLastButtonHandler);

    function lastPortfolioLastButtonHandler(event: any) {
        const contactSection:any = '#contact-section';
        setMoveScrollByAnchor(event, contactSection);
        document.querySelector(contactSection).querySelector('input').focus();
    }
    function focusPortfolioButtonHandler(event:any, scrollY:number){
        activePortfolioButton = event.target;
        activePortfolioButton.classList.add(CLASS_NAME_ON);
        if(scrollY !== null){
            window.scrollTo(0, scrollY);
        }
    }
    function blurPortfolioButtonHandler(){
        activePortfolioButton.classList.remove(CLASS_NAME_ON);
    }
}
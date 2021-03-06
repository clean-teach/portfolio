import { setMoveScrollByAnchor } from "./actionHeader.js";
export function accessibility() {
    var portfolioList = document.querySelectorAll('.portfolio-list>li');
    var lastPortfolioButtons = portfolioList[portfolioList.length - 1].querySelectorAll('.txt-area button');
    var lastPortfolioLastButton = lastPortfolioButtons[lastPortfolioButtons.length - 1];
    var activePortfolioButton = null;
    var CLASS_NAME_ON = 'on';
    portfolioList.forEach(function (obj, i, arr) {
        var targetPortfolio = arr[i];
        var button = targetPortfolio.querySelector('.txt-area button');
        if (button) {
            button.addEventListener('focus', function (e) {
                focusPortfolioButtonHandler(e, window.pageYOffset + targetPortfolio.getBoundingClientRect().top);
            });
            button.addEventListener('blur', blurPortfolioButtonHandler);
        }
    });
    lastPortfolioLastButton.addEventListener('blur', lastPortfolioLastButtonHandler);
    function lastPortfolioLastButtonHandler(event) {
        var contactSection = '#contact-section';
        setMoveScrollByAnchor(event, contactSection);
        document.querySelector(contactSection).querySelector('input').focus();
    }
    function focusPortfolioButtonHandler(event, scrollY) {
        activePortfolioButton = event.target;
        activePortfolioButton.classList.add(CLASS_NAME_ON);
        if (scrollY !== null) {
            window.scrollTo(0, scrollY);
        }
    }
    function blurPortfolioButtonHandler() {
        activePortfolioButton.classList.remove(CLASS_NAME_ON);
    }
}
//# sourceMappingURL=accessibility.js.map
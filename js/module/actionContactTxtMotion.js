import { getPercentage } from "../utils/utils.js";

const contactSection = document.querySelector('#contact-section');

// scroll 상태에 따른 Contact 글자
export function actionContactTxtMotion(winInnerHeight) {
    const contactSection = document.querySelector('#contact-section');
    const footerDoor = document.querySelector('footer .door');
    // const startPoint = window.pageYOffset + contactSection.querySelector('.sub-tit').getBoundingClientRect().top;
    // const endPoint = window.pageYOffset + contactSection.querySelector('.sub-tit').getBoundingClientRect().top + winInnerHeight / 1.5;
    // console.log('function');
    
    function moveJoinTxt(moveValue) {
        const leftObj = footerDoor.querySelector('.sub-tit01');
        const rightObj = footerDoor.querySelector('.sub-tit02');

        leftObj.style['left'] = moveValue;
        rightObj.style['right'] = moveValue;
    }
    function rotateYForm(degree) {
        contactSection.querySelector('.center-wrap').style['transform'] = `rotateY(${degree}deg)`;
    }
    return {
        move: function (scrollBottom) {
            // console.log('move');
            // if (scrollBottom <= startPoint) {
            //     rotateYForm(0);
            // } else if (scrollBottom > startPoint && scrollBottom <= endPoint) {
            //     let percentageMove = getPercentage((endPoint - scrollBottom), (endPoint - startPoint), 20);
            //     let percentageRotate = 90 - getPercentage((endPoint - scrollBottom), (endPoint - startPoint), 90);

            //     moveJoinTxt(`${-percentageMove}%`);
            //     rotateYForm(percentageRotate);
                
            // } else if (scrollBottom >= endPoint) {
            //     moveJoinTxt('0');
            //     rotateYForm(90);
            // }
        }
    }
}

// Contact Section의 form 태그 focus 효과
contactSection.querySelectorAll('input, textarea').forEach(formBox => {
    formBox.addEventListener('focus', function () {
        this.parentNode.querySelector('label').classList.add('on');
    });
    formBox.addEventListener('blur', function () {
        this.parentNode.querySelector('label').classList.remove('on');
    });
});
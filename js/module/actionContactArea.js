import { getPercentage } from "../utils/utils.js";

const contactSection = document.querySelector('#contact-section');
const portfolioSection = document.querySelector('#portfolio-section');
const contactSectionHeight = contactSection.offsetHeight;
const portfolioSectionHeight = portfolioSection.offsetHeight;
const readyPoint = window.pageYOffset + portfolioSection.getBoundingClientRect().top + portfolioSectionHeight - contactSectionHeight;
const startPoint = window.pageYOffset + portfolioSection.getBoundingClientRect().top + portfolioSectionHeight;
const endPoint =  startPoint + contactSectionHeight;

// scroll 상태에 따른 contact 영역 모션
export const viewContactAreaByScroll = (scrollBottom) => {
    // console.log(contactSectionHeight);
    // console.log(readyPoint);
    // console.log(startPoint);
    // console.log(endPoint);
    // console.log(scrollBottom);
    // if(scrollBottom > readyPoint){
    //     contactSection.style.position = 'fixed';
    // }else if(scrollBottom <= readyPoint){
    // }
    // if(scrollBottom > startPoint){
    //     portfolioSection.style.marginBottom = '0';
    // }
    // if(scrollBottom >= endPoint){
    //     contactSection.style.position = 'relative';
    // }
};

// scroll 상태에 따른 Contact 글자
export function actionContactTxtByScroll(winInnerHeight) {
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
export const bindContactForm = () => {
    const contactFormTag = contactSection.querySelectorAll('input, textarea');

    contactFormTag.forEach(formBox => {
        formBox.addEventListener('focus', function () {
            this.parentNode.querySelector('label').classList.add('on');
        });
        formBox.addEventListener('blur', function () {
            this.parentNode.querySelector('label').classList.remove('on');
        });
    });
};
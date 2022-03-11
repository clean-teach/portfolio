const contactSection = document.querySelector('#contact-section');

// scroll 상태에 따른 Contact 글자
export function actionContactTxtMotion(winInnerHeight) {
    const contactSection = document.querySelector('#contact-section');
    const startPoint = window.pageYOffset + contactSection.querySelector('.sub-tit').getBoundingClientRect().top;
    const endPoint = window.pageYOffset + contactSection.querySelector('.sub-tit').getBoundingClientRect().top + winInnerHeight / 1.5;
    const initialFromRotate = 0;
    function getPercentage(parts, whole, standard) {
        if (whole == '' || parts == '' || standard == '') {
            return null;
        } else {
            return parseFloat(parts / whole) * standard;
        }
    }
    return {
        move: function (scrollBottom) {
            if (scrollBottom <= startPoint) {
                contactSection.querySelector('form').style['transform'] = `rotateY(0deg)`;
            } else if (scrollBottom > startPoint && scrollBottom <= endPoint) {
                let percentageMove = getPercentage((endPoint - scrollBottom), (endPoint - startPoint), 20);
                let percentageRotate = 90 - getPercentage((endPoint - scrollBottom), (endPoint - startPoint), 90);

                contactSection.querySelector('.sub-tit01').style['left'] = `${-percentageMove}%`;
                contactSection.querySelector('.sub-tit02').style['right'] = `${-percentageMove}%`;
                contactSection.querySelector('form').style['transform'] = `rotateY(${percentageRotate}deg)`;
            } else if (scrollBottom >= endPoint) {
                contactSection.querySelector('.sub-tit01').style['left'] = `0px`;
                contactSection.querySelector('.sub-tit02').style['right'] = `0`;
                contactSection.querySelector('form').style['transform'] = `rotateY(90deg)`;
            }
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
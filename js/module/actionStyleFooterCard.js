import { getCurrentScrollBottomEnd } from "../utils/utils.js";

const footer = document.querySelector('footer');
const footerCard = footer.querySelector('.card');
const cardOffsetTop = footer.offsetTop + footerCard.offsetTop;
const footerCardInitialAngleValue = 180;
const sensitiveY = 20;
const sensitiveX = 10;
const direction = 1; // positive or negative

export function bindFooterCard() {
    const card = document.querySelector('footer .card');

    card.addEventListener('mousemove', twistCardHandler);
    card.addEventListener('mouseleave', returnToOriginStateCardHandler);
    card.querySelectorAll('a').forEach((a, i) => {
        a.addEventListener('mouseenter', function () {
            hoverFootCardButton.enter(i);
        });
        a.addEventListener('focus', function () {
            hoverFootCardButton.enter(i);
            window.scrollTo(0, document.body.scrollHeight);
        });
        a.addEventListener('mouseleave', function(){
            hoverFootCardButton.leave(i);
        });
        a.addEventListener('blur', function(){
            hoverFootCardButton.leave(i);
        });
    });

    function twistCardHandler (event) {
        if (getCurrentScrollBottomEnd()){
            this.style.transform = `
                rotateY(${direction * (window.innerWidth / 2 - event.x) / sensitiveY}deg) 
                rotateX(${direction * (window.innerHeight / 2 - event.y) / -sensitiveX}deg)
            `;
            this.style.transition = '0s';
        }
    }
    function returnToOriginStateCardHandler() {
        if (getCurrentScrollBottomEnd()){
            this.style.transform = `rotateY(0deg) rotateX(0deg)`;
            this.style.transition = '.4s';
        }
    }
    const hoverFootCardButton = {
        target: document.querySelector('footer .card-space'),
        ARR_CLASS_NAME: [
            'bg-mobile',
            'bg-email',
            'bg-git',
            'bg-notion'
        ],
        enter(i) {
            this.target.classList.add(this.ARR_CLASS_NAME[i]);
        },
        leave(i) {
            this.target.classList.remove(this.ARR_CLASS_NAME[i]);
        }
    };
}

// scroll 상태에 따른 footer card 회전 모션
export function rotateFooterCardByScoll(scrollBottom, winInnerHeight) {
    const pageScrollHeight = document.body.scrollHeight;
    const startPoint = pageScrollHeight - winInnerHeight;

    if (scrollBottom > startPoint) {
        let percentage = (scrollBottom - startPoint) / (pageScrollHeight - startPoint) * 90;

        footerCard.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
        footerCard.style.transition = '0s';
    }
}
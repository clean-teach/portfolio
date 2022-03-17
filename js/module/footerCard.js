import { getCurrentScrollBottomEnd } from "../utils/utils.js";

const footer = document.querySelector('footer');
const footerCard = footer.querySelector('.card');
const cardOffsetTop = footer.offsetTop + footerCard.offsetTop;
const footerCardInitialAngleValue = 180;
const sensitiveY = 20;
const sensitiveX = 10;
const direction = 1; // positive or negative

// scroll 상태에 따른 footer card 회전 모션
export function rotateFooterCardByScoll(scrollBottom, pageScrollHeight, winInnerHeight) {
    const startPoint = pageScrollHeight - winInnerHeight;
    if (scrollBottom > startPoint) {
        pageScrollHeight = document.body.scrollHeight;
        let percentage = (scrollBottom - startPoint) / (pageScrollHeight - startPoint) * 90;

        footerCard.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
        footerCard.style.transition = '0s';
    }
}

export function bindFooterCard() {
    const card = document.querySelector('footer .card');
    const twistCard = (card, e) => {
        if (getCurrentScrollBottomEnd()){
            card.style.transform = `
                rotateY(${direction * (window.innerWidth / 2 - e.x) / sensitiveY}deg) 
                rotateX(${direction * (window.innerHeight / 2 - e.y) / -sensitiveX}deg)
            `;
            card.style.transition = '0s';
        }
    }
    const returnToOriginStateCard = (card) => {
        if (getCurrentScrollBottomEnd()){
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = '.4s';
        }
    }
    const hoverFootCardButton = {
        target: document.querySelector('footer .card-space'),
        arrClassName: [
            'bg-mobile',
            'bg-email',
            'bg-git',
            'bg-notion'
        ],
        enter(i) {
            this.target.classList.add(this.arrClassName[i]);
        },
        leave(i) {
            this.target.classList.remove(this.arrClassName[i]);
        }
    };

    card.addEventListener('mousemove', function (e) {
        twistCard(card, e);
    });
    card.addEventListener('mouseleave', function () {
        returnToOriginStateCard(card)
    });

    card.querySelectorAll('a').forEach((a, i) => {
        a.addEventListener('mouseenter', function () {
            hoverFootCardButton.enter(i);
        });
        a.addEventListener('mouseleave', function(){
            hoverFootCardButton.leave(i);
        });
    });
}
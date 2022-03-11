import { getCurrentScrollBottomEnd } from "../utils/utils.js";

const card = document.querySelector('footer .card');
const footerCardInitialAngleValue = 90;
const sensitiveY = 20;
const sensitiveX = 10;
const direction = 1; // positive or negative

// scroll 상태에 따른 footer card 회전 모션
export function setFooterCardRotate(scrollBottom, cardOffsetTop, pageScrollHeight) {
    if (scrollBottom > cardOffsetTop) {
        pageScrollHeight = document.body.scrollHeight;
        let percentage = (scrollBottom - cardOffsetTop) / (pageScrollHeight - cardOffsetTop) * -90;

        card.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
        card.style.transition = '0s';
    }
}

card.addEventListener('mousemove', function (e) {
    if (getCurrentScrollBottomEnd())
        card.style.transform = `
        rotateY(${direction * (window.innerWidth / 2 - e.x) / sensitiveY}deg) 
        rotateX(${direction * (window.innerHeight / 2 - e.y) / -sensitiveX}deg)
    `;
    card.style.transition = '0s';
});
card.addEventListener('mouseleave', function () {
    if (getCurrentScrollBottomEnd())
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = '1s';
});
card.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', function () {
        document.querySelector('footer').classList.add('on');
    });
});
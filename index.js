const winInnerHeight = window.innerHeight;
const pageHeight = document.documentElement.offsetHeight;
const mainSection = document.querySelector('.main-section');
const portfolioImgBox = document.querySelectorAll('.portfolio-img-list li');
const card = document.querySelector('footer .card');
const cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;
const initialAngleValue = 90;
const percentage = () => resetSct/(pageHeight-cardOffsetTop)*-90;

let mainBackColorR = 0, mainBackColorG = 0, mainBackColorB = 0, effectClassName;

window.addEventListener('load', function(e) {
    setBackgroundColor();
});

mainSection.addEventListener('mousemove', function(e){
    if(document.documentElement.scrollTop <= 0) {
        let moveX = parseInt(e.x/mainSection.offsetWidth*255);
        let moveY = parseInt(e.y/mainSection.offsetHeight*255);

        setBackgroundColor();
        mainBackColorR = moveX;
        mainBackColorG = 0;
        mainBackColorB = moveY;
    }
});

document.addEventListener('scroll', function(e) {
    let scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setBackgroundColor();

    if(document.documentElement.scrollTop <= 0) {
        mainSection.classList.remove('blow');
    }else{
        mainSection.classList.add('blow');
    }
    getScrollDirection() == 'DOWN' && portfolioImgBox.forEach((obj,i,arr) => {
        if(arr[i].offsetTop < scrollBottom - 200){
            arr[i].classList.add('on');
        }
    });
    getScrollDirection() == 'UP' && portfolioImgBox.forEach((obj,i,arr) => {
        if(arr[i].offsetTop > scrollBottom){
            arr[i].classList.remove('on');
        }
    });
    
    // footer card
    if(scrollBottom > cardOffsetTop) {
        let resetSct = scrollBottom - cardOffsetTop;
        let percentage = resetSct/(pageHeight-cardOffsetTop)*-90;

        card.style.transform = `rotateX(${initialAngleValue + percentage}deg)`;
        card.style.transition = '0s';
    }
});

const sensitiveY = 40;
const sensitiveX = 20;
const direction = 1; // positive or negative
card.addEventListener('mousemove', function(e){
    card.style.transform = `
        rotateY(${direction*(window.innerWidth/2 - e.x)/sensitiveY}deg) 
        rotateX(${direction*(window.innerHeight/2 - e.y)/-sensitiveX}deg)
    `;
    card.style.transition = '0s';
});
card.addEventListener('mouseleave', function(){
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    card.style.transition = '1s';
});

function setBackgroundColor(){
    document.body.style.backgroundColor= `rgba(${mainBackColorR},${mainBackColorG},${mainBackColorB},${1-(document.documentElement.scrollTop/mainSection.offsetHeight)})`;
}

// 스크롤 방향 감지
let scrollBaseValue = 0;
function getScrollDirection(){
    let result;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

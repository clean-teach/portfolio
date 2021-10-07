const winInnerHeight = window.innerHeight;
const pageHeight = document.documentElement.offsetHeight;
const mainSection = document.querySelector('.main-section');
const portfolioImgBox = document.querySelectorAll('.portfolio-img-list li');
const portfolioTxtBox = document.querySelectorAll('.portfolio-txt-area li');
const card = document.querySelector('footer .card');
const cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;
const initialAngleValue = 90;
const percentage = () => resetSct/(pageHeight-cardOffsetTop)*-90;

let mainBackColorR = 0, 
    mainBackColorG = 0, 
    mainBackColorB = 0, 
    effectClassName, 
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

window.addEventListener('load', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    portfolioImgBox.forEach((obj,i,arr) => {
        if(arr[i].offsetTop < scrollBottom - 200){
            arr[i].classList.add('on');
        }
        setPortfolioTxtAreaAddClass(i,arr);
    });

    setBackgroundColor();
    window.scrollBy( 0, 1 );
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
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setBackgroundColor();

    if(document.documentElement.scrollTop <= 0) {
        mainSection.classList.remove('blow');
    }else{
        mainSection.classList.add('blow');
    }

    portfolioTxtBox.forEach((obj) => {
        obj.classList.remove('on');
    });
    if(getScrollDirection() == 'DOWN') {
        portfolioImgBox.forEach((obj,i,arr) => {
            if(arr[i].offsetTop < scrollBottom - 200){
                arr[i].classList.add('on');
            }
            setPortfolioTxtAreaAddClass(i,arr);
        });
    }
    if(getScrollDirection() == 'UP') {
        portfolioImgBox.forEach((obj,i,arr) => {
            if(arr[i].offsetTop > scrollBottom){
                arr[i].classList.remove('on');
            }
            setPortfolioTxtAreaAddClass(i,arr);
        });
    }
    
    // footer card
    if(scrollBottom > cardOffsetTop) {
        let resetSct = scrollBottom - cardOffsetTop;
        let percentage = resetSct/(pageHeight-cardOffsetTop)*-90;

        card.style.transform = `rotateX(${initialAngleValue + percentage}deg)`;
        card.style.transition = '0s';
    }
});

// footer card
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

// 포트폴리오 글자 영역 나타나는 조건에 대한 함수
function setPortfolioTxtAreaAddClass(i,arr) {
    const startPoint = document.documentElement.scrollTop > arr[i].offsetTop - (window.innerHeight/2);
    const endPoint = scrollBottom < (arr[i].offsetTop + arr[i].offsetHeight) + (window.innerHeight/2);

    if(startPoint && endPoint) {
        portfolioTxtBox[i].classList.add('on');
    }
}

// scroll, mousemove 에 따른 배경색상 설정 함수
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

const winInnerHeight = window.innerHeight;
const header = document.querySelector('header');
const lnbBtn = header.querySelectorAll('#lnb button');
const mainSection = document.querySelector('#main-section');
const portfolioImgBox = document.querySelectorAll('.portfolio-img-list li');
const portfolioTxtBox = document.querySelectorAll('.portfolio-txt-area li');
const card = document.querySelector('footer .card');
const footerCardInitialAngleValue = 90;

let mainBackColorR = 0, 
    mainBackColorG = 0, 
    mainBackColorB = 0, 
    effectClassName, 
    pageScrollHeight = document.body.scrollHeight,
    scrollBottom = document.documentElement.scrollTop + winInnerHeight,
    cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;

window.addEventListener('load', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    portfolioImgBox.forEach((obj,i,arr) => {
        if(arr[i].offsetTop < scrollBottom - 200){
            arr[i].classList.add('on');
        }
        setPortfolioTxtAreaAddClass(i,arr);
    });

    setLnbStyle();
    setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    setFooterCardRotate();
});

lnbBtn.forEach(btn => {
    btn.addEventListener('click', function(){
        window.scrollTo({
            top: document.getElementById(this.dataset.targetid).offsetTop,
            behavior: 'smooth'
        });
        setFooterCardRotate();
    });
});

mainSection.addEventListener('mousemove', function(e){
    if(document.documentElement.scrollTop <= 0) {
        let moveX = parseInt(e.x/mainSection.offsetWidth*255);
        let moveY = parseInt(e.y/mainSection.offsetHeight*255);

        setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
        mainBackColorR = moveX;
        mainBackColorG = 0;
        mainBackColorB = moveY;
    }
});

document.addEventListener('scroll', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setLnbStyle();
    setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));

    mainSection.querySelector('.tit').style.left = `-${document.documentElement.scrollTop}px`;
    mainSection.querySelector('.sub').style.left = `${document.documentElement.scrollTop}px`;
    mainSection.querySelector('.vertical').style.top = `-${document.documentElement.scrollTop*.8}px`;

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
    
    setFooterCardRotate();
});
document.addEventListener('mouseenter', function(e) {
    document.body.style.transition = '0s';
});
document.addEventListener('mouseleave', function(e) {
    setBackgroundColor(0, 0, 0, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    document.body.style.transition = `1s`;
});

// footer card
const sensitiveY = 20;
const sensitiveX = 10;
const direction = 1; // positive or negative
card.addEventListener('mousemove', function(e){
    if(getCurrentScrollBottomEnd())
    card.style.transform = `
        rotateY(${direction*(window.innerWidth/2 - e.x)/sensitiveY}deg) 
        rotateX(${direction*(window.innerHeight/2 - e.y)/-sensitiveX}deg)
    `;
    card.style.transition = '0s';
});
card.addEventListener('mouseleave', function(){
    if(getCurrentScrollBottomEnd())
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    card.style.transition = '1s';
});
card.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', function(){
        document.querySelector('footer').classList.add('on');
    });
});

// scroll, mousemove 에 따른 배경색상 설정 함수
function setBackgroundColor(R, G, B, alpha){
    document.body.style.backgroundColor= `rgba(${R},${G},${B},${alpha})`;
}

// scroll 상태에 따른 Local Navigation Button Style
function setLnbStyle() {
    let colorRGB = 255 - ((document.documentElement.scrollTop/mainSection.offsetHeight)*255);
    if(colorRGB < 0) {colorRGB = 0}
    lnbBtn.forEach(btn => btn.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`);

    if(document.documentElement.scrollTop >= winInnerHeight-300) {
        header.classList.add('on');
    }else{
        header.classList.remove('on');
    }
}

// 포트폴리오 글자 영역 나타나는 조건에 대한 함수
function setPortfolioTxtAreaAddClass(i,arr) {
    const startPoint = document.documentElement.scrollTop > arr[i].offsetTop - (window.innerHeight/2);
    const endPoint = scrollBottom < (arr[i].offsetTop + arr[i].offsetHeight) + (window.innerHeight/2);

    if(startPoint && endPoint) {
        portfolioTxtBox[i].classList.add('on');
    }
}

// scroll 상태에 따른 footer card 회전 모션
function setFooterCardRotate() {
    if(scrollBottom > cardOffsetTop) {
        pageScrollHeight = document.body.scrollHeight;
        let percentage = (scrollBottom - cardOffsetTop)/(pageScrollHeight-cardOffsetTop)*-90;

        card.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
        card.style.transition = '0s';
    }
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

// 현재 스크롤 상태 맨 아래에 있는지 반환
function getCurrentScrollBottomEnd(){
    if((pageScrollHeight - scrollBottom) == 0) return true;
    return false;
}
const winInnerHeight = window.innerHeight;
const pageHeight = document.documentElement.offsetHeight;
const lnb = document.querySelector('#lnb');
const lnbBtn = lnb.querySelectorAll('button');
const mainSection = document.querySelector('#main-section');
const portfolioImgBox = document.querySelectorAll('.portfolio-img-list li');
const portfolioTxtBox = document.querySelectorAll('.portfolio-txt-area li');
const card = document.querySelector('footer .card');
const footerCardInitialAngleValue = 90;

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

    setLnbStyle();
    setMainSectionStyle();
    setBackgroundColor();
    setFooterCardRotate();
});

lnbBtn.forEach(btn => {
    btn.addEventListener('click', function(){
        console.log(document.getElementById(this.dataset.targetid).offsetTop);
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

        setBackgroundColor();
        mainBackColorR = moveX;
        mainBackColorG = 0;
        mainBackColorB = moveY;
    }
});

document.addEventListener('scroll', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setLnbStyle();
    setMainSectionStyle();
    setBackgroundColor();

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
    setFooterCardRotate();
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

// scroll, mousemove 에 따른 배경색상 설정 함수
function setBackgroundColor(){
    document.body.style.backgroundColor= `rgba(${mainBackColorR},${mainBackColorG},${mainBackColorB},${1-(document.documentElement.scrollTop/mainSection.offsetHeight)})`;
}

// scroll 상태에 따른 로컬네비게이션 버튼 색상
function setLnbStyle() {
    let colorRGB = 255 - ((document.documentElement.scrollTop/mainSection.offsetHeight)*255);
    if(colorRGB < 0) {colorRGB = 0}
    lnbBtn.forEach(btn => btn.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`);
}

// scroll 상태에 따른 메인화면 style
function setMainSectionStyle() {
    if(document.documentElement.scrollTop <= 0) {
        mainSection.classList.remove('blow');
    }else{
        mainSection.classList.add('blow');
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
    const cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;
    let percentage

    if(scrollBottom > cardOffsetTop) {
        percentage = (scrollBottom - cardOffsetTop)/(pageHeight-cardOffsetTop)*-90;
    }
    card.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
    card.style.transition = '0s';
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
    if((pageHeight - scrollBottom) == 0) return true;
    return false;
}
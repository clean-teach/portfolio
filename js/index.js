const winInnerHeight = window.innerHeight;
const header = document.querySelector('header');
const lnbBtn = header.querySelectorAll('#lnb button');
const mainSection = document.querySelector('#main-section');
const portfolioSection = document.querySelector('#portfolio-section');
const portfolioSectionPosiTop = portfolioSection.offsetTop;
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

// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
function portfolioScrollActive(){
    let current = null;
    let winHeightHalf = (window.innerHeight/2);

    // 포트폴리오 글자 영역 나타나는 조건에 대한 함수
    function setTxtActive(i,arr) {
        if(i === 0) {
            winHeightHalf = 0;
        }
        const startPoint = document.documentElement.scrollTop > arr[i].offsetTop - winHeightHalf;
        const endPoint = scrollBottom < (arr[i].offsetTop + arr[i].offsetHeight) + winHeightHalf;

        portfolioTxtBox[i].classList.remove('on');
        if(startPoint && endPoint) {
            portfolioTxtBox[i].classList.add('on');
        }
    }
    function setImgActive(i, arr){

    }
    
    portfolioImgBox.forEach((obj,i,arr) => {
        obj.classList.remove('on');
        console.log(arr[i]);
        console.log(arr[i].offsetTop);
        if(portfolioSectionPosiTop < scrollBottom){
            if(getScrollDirection() == 'DOWN') {
                if(arr[i].offsetTop < scrollBottom - 200){
                    arr[i].classList.add('on');
                }else{
                    arr[i].classList.remove('on');
                }
            }
            if(getScrollDirection() == 'UP') {
                if(arr[i].offsetTop > scrollBottom){
                    arr[i].classList.remove('on');
                }
            }
        }else{
            arr[i].classList.remove('on');
        }
        setTxtActive(i,arr);
    });
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

window.addEventListener('load', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setLnbStyle();
    setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    portfolioScrollActive();
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

document.addEventListener('mousemove', function(e){
    let moveX = parseInt(e.x/mainSection.offsetWidth*255);
    let moveY = parseInt(e.y/mainSection.offsetHeight*255);

    setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    mainBackColorR = 255-moveX;
    mainBackColorG = moveX-moveY;
    mainBackColorB = 255-moveY-moveX;
});

document.addEventListener('scroll', function(e) {
    scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    setLnbStyle();
    setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));

    mainSection.querySelector('.tit').style.left = `-${document.documentElement.scrollTop*4}px`;
    mainSection.querySelector('.vertical').style.top = `${document.documentElement.scrollTop * .4}px`;
    
    portfolioScrollActive();
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
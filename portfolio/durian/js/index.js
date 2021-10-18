const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const rollingBanners = document.querySelectorAll('.rolling-banner');

let eventClick = new MouseEvent('click',{
    'view': window,
    'bubbles' : true,
    'cancelable' : true
});

document.querySelector('h1 a').addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({
        top: document.querySelector(this.getAttribute('href')).offsetTop,
        left: 0,
        behavior: 'smooth'
    });
    console.log(headerHeight);
});

document.querySelectorAll('.lnb a').forEach(btn => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector(this.getAttribute('href')).offsetTop - headerHeight,
            left: 0,
            behavior: 'smooth'
        });
        console.log(headerHeight);
    });
});

rollingBanners.forEach(rollingBanner => {
    let ClickedIndicatorBtn = 0;
    const banner = rollingBanner.querySelectorAll('.banners>li');

    rollingBanner.append(createIndicator(banner.length));

    banner.forEach(banner => {
        banner.style.left = `${window.innerWidth}px`;
    });
    rollingBanner.querySelector(`.banners>li:nth-child(${ClickedIndicatorBtn+1})`).style.left = `0px`;

    rollingBanner.querySelectorAll('.indicator button').forEach(indicatorBtn => {
        indicatorBtn.addEventListener('click', function(){
            ClickedIndicatorBtn = getIndex(this.parentNode);

            moveSlideBanner();

            // rollingBanner.querySelectorAll('.indicator button').forEach(indicatorBtn => {
            //     indicatorBtn.classList.remove('on');
            // });
            // this.classList.add('on');

            // banner.forEach(banner => {
            //     banner.style.left = `${window.innerWidth}px`;
            // });
            // this.parentNode.parentNode.parentNode.querySelector(`.banners>li:nth-child(${ClickedIndicatorBtn+1})`).style.left = `0px`;
        });
    });

    setInterval(function(){
        ClickedIndicatorBtn ++;
        if(ClickedIndicatorBtn >= banner.length) {
            ClickedIndicatorBtn = 0;
        }
        moveSlideBanner();
    }, 5000);

    function moveSlideBanner(){
        banner.forEach(banner => {
            banner.style.left = `${window.innerWidth}px`;
        });
        rollingBanner.querySelector(`.banners>li:nth-child(${ClickedIndicatorBtn+1})`).style.left = `0px`;
        rollingBanner.querySelectorAll('.indicator button').forEach(indicatorBtn => {
            indicatorBtn.classList.remove('on');
        });
        rollingBanner.querySelector(`.indicator>li:nth-child(${ClickedIndicatorBtn+1}) button`).classList.add('on');
    }
});

// 인디케이터 버튼 생성
function createIndicator(length) {
    const elUl = document.createElement('ul');
    elUl.classList.add('indicator');

    for(i=0; i<length; i++){
        const elLi = document.createElement('li');
        const elBtn = document.createElement('button');
        elLi.append(elBtn);
        elUl.append(elLi)
        elBtn.setAttribute('title', '해당 배너로 이동');
    }
    elUl.querySelector('li:nth-child(1) button').classList.add('on');
    return elUl;
}

// 순서 반환
function getIndex(ele) {
    let _i = 0;
    while((ele = ele.previousSibling) != null ) {
      _i++;
    } 
    return _i;
}
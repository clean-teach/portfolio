(function(){
    const header = document.querySelector('header');
    const lnbBtn = header.querySelectorAll('#lnb a');
    const mainSection = document.querySelector('#main-section');
    const portfolioSection = document.querySelector('#portfolio-section');
    const portfolioSectionPosiTop = portfolioSection.offsetTop;
    const portfolioList = document.querySelectorAll('.portfolio-list>li');
    const contactSection = document.querySelector('#contact-section');
    const card = document.querySelector('footer .card');
    const footerCardInitialAngleValue = 90;

    let mainBackColorR = 0, 
        mainBackColorG = 0, 
        mainBackColorB = 0, 
        effectClassName, 
        winInnerHeight = window.innerHeight;
        pageScrollHeight = document.body.scrollHeight,
        scrollBottom = document.documentElement.scrollTop + winInnerHeight,
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;

    // 앵커태그 부드러운 동작 함수
    function actionAnchorScrollMove(event){
        const target = event.target || event.srcElement;
        event.preventDefault();
        window.scrollTo({
            top: document.querySelector(target.getAttribute('href')).offsetTop,
            behavior: 'smooth'
        });
    }

    // scroll, mousemove 에 따른 배경색상 추출 및 설정 함수
    function getMouseMoveColor(event){
        let moveX = parseInt(event.x/mainSection.offsetWidth*255);
        let moveY = parseInt(event.y/mainSection.offsetHeight*255);

        mainBackColorR = 255-moveX;
        mainBackColorG = moveX-moveY;
        mainBackColorB = 255-moveY-moveX;
    }

    // scroll, mousemove 에 따른 배경색상 적용 함수
    function setBackgroundColor(R, G, B, alpha){
        document.body.style.backgroundColor= `rgba(${R},${G},${B},${alpha})`;
    }

    // Background Motion Style create
    const elBackCircle = document.querySelector('#bg-area .circle');
    const viewportHypotenuse = getPythagorean(document.documentElement.clientWidth, document.documentElement.clientHeight);
    elBackCircle.style['width'] = `${viewportHypotenuse}px`;
    elBackCircle.style['height'] = `${viewportHypotenuse}px`;
    elBackCircle.style['transform'] = `scale(0)`;
    let start = null;
    function setBackMotionStyle(){
        start = contactSection.offsetTop;
        if(scrollBottom > start){
            elBackCircle.style['transform'] = `scale(${(scrollBottom - start)/1000})`;
        }else{
            elBackCircle.style['transform'] = `scale(0)`;
        }
    }

    // scroll에 따른 회전
    function scrollRotate(id) {
        let obj = document.getElementById(id);
        obj.style.transform = "rotate(" + window.pageYOffset/10 + "deg)";
        if (document.documentElement.scrollTop !== 0) {
            obj.classList.remove('rotate-animate');
        }else {
            obj.classList.add('rotate-animate');
        }
    }

    // scroll에 따른 색상 값 (LNB, MainSection)
    function setColor(){
        let colorRGB = 255 - ((document.documentElement.scrollTop/mainSection.offsetHeight)*255);
        if(colorRGB < 0) {colorRGB = 0}
        lnbBtn.forEach(btn => btn.style.color = `rgba(${colorRGB}, ${colorRGB}, ${colorRGB}, 1)`);
    }

    // scroll 상태에 따른 Local Navigation Button Style
    function setLnbStyle(e) {
        if(document.documentElement.scrollTop >= portfolioSection.offsetTop) {
            header.classList.add('on');
        }else{
            header.style['transition'] = 'none';
            header.classList.remove('on');
        }
        if(e && getScrollDirection() === 'DOWN'){
            actionHeaderToggle().hide();
        } else if(e && getScrollDirection() === 'UP'){
            actionHeaderToggle().show();
        }
    }
    function actionHeaderToggle(){
        if(document.documentElement.scrollTop >= portfolioSection.offsetTop) {
            return {
                hide: function(){
                    header.style['top'] = `-${header.offsetHeight}px`;
                },
                show: function(){
                    header.style['top'] = 0;
                    header.style['transition'] = '1s';
                }
            };
        }else{
            return {
                hide: function(){
                    null;
                },
                show: function(){
                    null;
                }
            };
        }
    }

    // 스크롤 이벤트에 따른 포트폴리오 영역 활성화
    function actionPortfolioScrollActive(){
        let winHeightHalf = (window.innerHeight/2);

        // 포트폴리오 글자 영역 나타나는 조건에 대한 함수
        function setImgActive(obj, i, arr){
            const target = arr[i].querySelector('.img-area');
            let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;

            if(startPoint){
                target.classList.add('on');
            }else{
                target.classList.remove('on');
            }
        }

        function setTxtActive(obj, i,arr) {
            const txtBox = arr[i].querySelector('.txt-area');
            let 
                startPoint = scrollBottom - winHeightHalf > window.pageYOffset + arr[i].getBoundingClientRect().top,
                endPoint = scrollBottom - winHeightHalf < window.pageYOffset + arr[i].getBoundingClientRect().top + arr[i].offsetHeight;

            if(startPoint && endPoint){
                txtBox.classList.add('on');
            }else{
                txtBox.classList.remove('on');
            }
        }

        portfolioList.forEach((obj,i,arr) => {
            setImgActive(obj, i, arr);
            setTxtActive(obj, i,arr);
        });
    }
    portfolioList.forEach((obj,i,arr) => {
        arr[i].querySelector('.txt-area button').addEventListener('focus', function(e){
            window.scrollTo(0, window.pageYOffset + arr[i].getBoundingClientRect().top);
            arr[i].querySelector('.img-area').classList.add('on');
            arr[i].querySelector('.txt-area').classList.add('on');
        });
        arr[i].querySelector('.txt-area button').addEventListener('blur', function(){
            window.scrollTo(0, 0);
            arr[i].querySelector('.img-area').classList.remove('on');
            arr[i].querySelector('.txt-area').classList.remove('on');
        });
    });

    // scroll 상태에 따른 footer card 회전 모션
    function setFooterCardRotate() {
        if(scrollBottom > cardOffsetTop) {
            pageScrollHeight = document.body.scrollHeight;
            let percentage = (scrollBottom - cardOffsetTop)/(pageScrollHeight-cardOffsetTop)*-90;

            card.style.transform = `rotateX(${footerCardInitialAngleValue + percentage}deg)`;
            card.style.transition = '0s';
        }
    }

    window.addEventListener('load', function(e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;
        cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;

        setColor();
        setLnbStyle();
        setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
        actionPortfolioScrollActive();
        setFooterCardRotate();
    });

    lnbBtn.forEach(btn => {
        btn.addEventListener('click', function(e){
            actionAnchorScrollMove(e);
        });
        btn.addEventListener('focus', function(){
            actionHeaderToggle().show();
        });
        btn.addEventListener('blur', function(){
            actionHeaderToggle().hide();
        });
    });

    document.addEventListener('mousemove', function(e){
        getMouseMoveColor(e);
        setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    });

    document.addEventListener('scroll', function(e) {
        scrollBottom = document.documentElement.scrollTop + winInnerHeight;

        setColor();
        setLnbStyle(e);
        setBackgroundColor(mainBackColorR, mainBackColorG, mainBackColorB, 1-(document.documentElement.scrollTop/mainSection.offsetHeight));

        mainSection.querySelector('.tit').style['left'] = `-${document.documentElement.scrollTop*1}px`;
        mainSection.querySelector('.txt').style['top'] = `-${document.documentElement.scrollTop*.02}px`;
        mainSection.querySelector('.vertical').style['top'] = `${document.documentElement.scrollTop * .4}px`;
        
        setBackMotionStyle();
        scrollRotate('circle-scroll-svg');
        actionPortfolioScrollActive();
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
}());
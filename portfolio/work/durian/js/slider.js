function Slider(target, type, per = 1) {
    // state
    let index = 1; // current page
    let isMoved = true; // slide 이동이 완료 되었는가?
    const speed = 500; // ms
    let interval = 5000; // Auto play interval
    const isLeftRightBtn = true; // 좌우버튼 추가
    const isSwipe = true; // 스와이프 기능 추가

    // 속도 & 방향
    const transform = 'transform ' + speed / 1000 + 's';
    let translate = (i) => 'translateX(-' + (100/per) * i + '%)';
    if (type === 'V') {
        translate = (i) => 'translateY(-' + (100/per) * i + '%)';
    }

    // slider
    const slider = document.querySelector(target);
    slider.style['overflow-x'] = 'hidden';
    if (type === 'V') {
        slider.style['overflow-Y'] = 'hidden';
    }

    // slider container
    const container = document.createElement('div');
    container.style['display'] = 'flex';
    container.style['flex-direction'] = type === 'V' ? 'column' : 'row';
    container.style['max-width'] = '100%';
    container.style['height'] = '100%';
    container.style['transform'] = translate(index);

    // slider list
    let boxes = [].slice.call(slider.children);
    // 처음/끝 요소 복사
    boxes = [].concat(boxes[boxes.length - 1], boxes, boxes[0]);
    // slider list styling
    const size = boxes.length;
    for (let i = 0; i < size; i++) {
        const box = boxes[i];
        box.style['flex'] = 'none';
        box.style['flex-wrap'] = 'wrap';
        box.style['height'] = '100%';
        box.style['width'] = `${100/per}%`;
        container.appendChild(box.cloneNode(true));
    }

    // createIndicator
    const indicators = document.createElement('div');
    indicators.classList.add('indicator');
    for(i=0; i<size-2; i++){
        const indicatorBtn = document.createElement('button');
        indicators.append(indicatorBtn)
        indicatorBtn.setAttribute('title', '해당 배너로 이동');
    }
    indicators.querySelector('button:nth-child(1)').classList.add('on');

    // 애니메이션 시간동안 슬라이드 이동 함수 실행 제약
    container.addEventListener('transitionstart', function (){
        isMoved = false;
        setTimeout(() => {
            isMoved = true;
        }, speed);
    });

    // 시작, 끝 눈속임 event (무한 스크롤)
    container.addEventListener('transitionend', function () {
        // 처음으로 순간이동
        if (index === size - 1) {
            index = 1;
            container.style['transition'] = 'none';
            container.style['transform'] = translate(index);
        }
        // 끝으로 순간이동
        if (index === 0) {
            index = size - 2;
            container.style['transition'] = 'none';
            container.style['transform'] = translate(index);
        }
    });

    // HTML로 작성된 slider를 스크립트로 만든 slider로 대체
    slider.innerHTML = '';
    slider.appendChild(container);
    slider.appendChild(indicators);

    // slidefn
    function moveSlide(index) {
        container.style['transition'] = transform;
        container.style['transform'] = translate(index);
        if(index == size - 1) index = 1;
        if(index == 0) index = size - 2;
        indicators.querySelectorAll('button').forEach(indicatorBtn => {
            indicatorBtn.classList.remove('on');
        });
        indicators.querySelector(`button:nth-child(${index})`).classList.add('on');
    }

    // event method
    const moveFn = (i) =>{ // 특정 순서
        if (isMoved === true) {
            index = i;
            moveSlide(index);
        }
    };
    const nextFn = () =>{
        if (isMoved === true) { // 다음
            index = (index + 1) % size; // 최대 증가 후 0부터 시작
            moveSlide(index);
        }
    };
    const prevFn = () =>{
        if (isMoved === true) { // 이전
            index = index === 0 ? index + size : index;
            index = (index - 1) % size; // 최소 감소 후 최대부터 시작
            moveSlide(index);
        }
    };

    // Slider Auto Play
    let autoPlay = null;
    function startAutoPlay() {
        autoPlay =setInterval(nextFn, interval);
    }
    function stopAutoPlay() {
        if(autoPlay != null) {
            clearInterval(autoPlay);
        }
    }
    startAutoPlay();
    slider.addEventListener('mousedown', function(){
        stopAutoPlay();
    });
    slider.addEventListener('mouseup', function(){
        startAutoPlay();
    });

    indicators.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e){
            moveFn(getIndex(this)+1);
        });
    });

    // 좌우버튼
    if (isLeftRightBtn) {
        const leftBtn = document.createElement('button');
        const rightBtn = document.createElement('button');
        leftBtn.classList.add('btn-left');
        rightBtn.classList.add('btn-right');
        leftBtn.setAttribute('title', '오른쪽으로 이동');;
        rightBtn.setAttribute('title', '왼쪽으로 이동');;
        slider.appendChild(leftBtn);
        slider.appendChild(rightBtn);
        leftBtn.addEventListener('click',function(){
            prevFn();
        });
        rightBtn.addEventListener('click',function(){
            nextFn();
        });
    }

    // Swipe 기능
    if (isSwipe) {
        slider.addEventListener('touchstart', function(e){
            moveTouchSwipe.touchStart(e);
        });
        slider.addEventListener('touchmove', function(e){
            moveTouchSwipe.touchMoveX(e);
        });
        slider.addEventListener('touchend', function(e){
            moveTouchSwipe.touchEnd(e);
        });
        
        const moveTouchSwipe = {
            startX: null, 
            MoveX: null,
            endX: null,
            currentTranslateX: null,
            startMoment: null,
            touchStart: function(e){
                this.startX = e.touches[0].pageX;
                this.currentTranslateX = window.innerWidth/per * index;
                this.startMoment = Date.now();
                stopAutoPlay();
            },
            touchMoveX: function(e){
                this.MoveX = this.startX - e.changedTouches[0].pageX;
                // container.style['transform'] = `translateX(${-this.currentTranslateX - this.MoveX}px)`;
                // if (type === 'V') {
                //     container.style['transform'] = `translateY(${-this.currentTranslateX - this.MoveX}px)`;
                // }
            },
            touchEnd: function(e){
                const touchDuration = Date.now() - this.startMoment;
                this.endX = e.changedTouches[0].pageX

                // if(touchDuration > 300){
                //     if(Math.abs(this.MoveX) > 200){
                //         // if(this.startX > this.endX){
                //         //     nextFn();
                //         // }else if(this.startX < this.endX){
                //         //     prevFn();
                //         // }
                //     }else{
                //         container.style['transition'] = '.1s';
                //         container.style['transform'] = translate(index);
                //     }
                // }else{
                    
                // }
                if(touchDuration > 10 && Math.abs(this.MoveX) > 20){
                    if(this.startX > this.endX){
                        nextFn();
                    }else if(this.startX < this.endX){
                        prevFn();
                    }
                }
                startAutoPlay();
            }
        }
    }

    return {
        move: function (i) {
            moveFn(i);
        },
        next: function () {
            nextFn();
        },
        prev: function () {
            prevFn();
        }
    };
}

const s1 = new Slider('#slider1', 'H');
const s2 = new Slider('#slider2', 'H');

let GridColWhenResponsive;
if(window.innerWidth > 1024){
    GridColWhenResponsive = 4;
}else {
    GridColWhenResponsive = 2;
}
const s3 = new Slider('#slider3', 'H', GridColWhenResponsive);
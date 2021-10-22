function Slider(target, type) {
    // state
    let index = 1; // current page
    let isMoved = true; // slide 이동이 완료 되었는가?
    const speed = 1000; // ms
    let interval = 5000; // Auto play interval
    const leftRightBtn = true; // 좌우버튼 추가

    // 속도 & 방향
    const transform = 'transform ' + speed / 1000 + 's';
    let translate = (i) => 'translateX(-' + 100 * i + '%)';
    if (type === 'V') {
        translate = (i) => 'translateY(-' + 100 * i + '%)';
    }

    // slider
    const slider = document.querySelector(target);
    slider.style['overflow'] = 'hidden';

    // slider container
    const container = document.createElement('div');
    container.style['display'] = 'flex';
    container.style['flex-direction'] = type === 'V' ? 'column' : 'row';
    container.style['width'] = '100%';
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
        box.style['width'] = '100%';
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

    // 좌우버튼
    if (leftRightBtn == true) {
        const leftBtn = document.createElement('button');
        const rightBtn = document.createElement('button');
        leftBtn.classList.add('btn-left');
        rightBtn.classList.add('btn-right');
        leftBtn.setAttribute('title', '오른쪽으로 이동');;
        rightBtn.setAttribute('title', '왼쪽으로 이동');;
        slider.appendChild(leftBtn);
        slider.appendChild(rightBtn);
    }

    // slidefn
    function moveSlide(index) {
        container.style['transition'] = transform;
        container.style['transform'] = translate(index);
        if(index == size - 1) index = 1;
        indicators.querySelectorAll('button').forEach(indicatorBtn => {
            indicatorBtn.classList.remove('on');
        });
        indicators.querySelector(`button:nth-child(${index})`).classList.add('on');
    }

    indicators.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e){
            if (isMoved === true) {
                index = getIndex(this)+1;
                moveSlide(index);
            }
        });
    });

    // Slider Auto Play
    setInterval(() => {
        if (isMoved === true) {
            index = (index + 1) % size; // 최대 증가 후 0부터 시작
            moveSlide(index);
        }
    }, interval);

    // event method
    return {
        move: function (e, i) { // 특정 순서
            if (isMoved === true) {
                index = i;
                moveSlide(index);
            }
        },
        next: function (e) { // 다음
            if (isMoved === true) {
                index = (index + 1) % size; // 최대 증가 후 0부터 시작
                moveSlide(index);
            }
        },
        prev: function (e) { // 이전
            if (isMoved === true) {
                index = index === 0 ? index + size : index;
                index = (index - 1) % size; // 최소 감소 후 최대부터 시작
                moveSlide(index);
            }
        }
    };
}

const s1 = new Slider('#slider1', 'H');
const s2 = new Slider('#slider2', 'H');

document.querySelectorAll('.slider').forEach(slider => {
    // slider.querySelectorAll('.indicator button').forEach(indicatorBtn => {
    //     indicatorBtn.addEventListener('click', function(e){
    //         s1.move(e);
    //         if(this.parentNode.parentNode.getAttribute('id') == 'slider1'){
    //             s1.move(getIndex(this) + 1);
    //         }
    //         if(this.parentNode.parentNode.getAttribute('id') == 'slider2'){
    //             s2.move(getIndex(this) + 1);
    //         }
    //     });
    // });

    slider.querySelector('.btn-left').addEventListener('click',function(){
        if(this.parentNode.getAttribute('id') == 'slider1'){
            s1.prev();
        }
        if(this.parentNode.getAttribute('id') == 'slider2'){
            s2.prev();
        }
    });
    slider.querySelector('.btn-right').addEventListener('click',function(){
        if(this.parentNode.getAttribute('id') == 'slider1'){
            s1.next();
        }
        if(this.parentNode.getAttribute('id') == 'slider2'){
            s2.next();
        }
    });
    slider.addEventListener('touchstart', function(e){
        moveTouchSwipe.touchStart(e)
    });
    slider.addEventListener('touchend', function(e){
        moveTouchSwipe.touchEnd(e)
    });
    // console.log(moveTouchSwipe.touchStart(e));
    // console.log(moveTouchSwipe.touchEnd(e));
});

const moveTouchSwipe = {
    startX: null, 
    endX: null,
    touchStart: function(e){
        this.startX = e.touches[0].pageX;
    },
    touchEnd: function(e){
        this.endX = e.changedTouches[0].pageX
        if(this.startX > this.endX ){
            // if(this.parentNode.getAttribute('id') == 'slider1'){
            //     s1.next();
            // }
            // if(this.parentNode.getAttribute('id') == 'slider2'){
            //     s2.next();
            // }
        }
    }
}
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let eventClick = new MouseEvent('click',{
    'view': window,
    'bubbles' : true,
    'cancelable' : true
});

// 앵커태그 부드럽게 스크롤 이동
function moveAnchorTagSmooth(e){
    e.preventDefault();
    window.scrollTo({
        top: document.querySelector(e.currentTarget.getAttribute('href')).offsetTop - header.clientHeight,
        left: 0,
        behavior: 'smooth'
    });
}

header.querySelector('h1 a').addEventListener('click', function(e){
    moveAnchorTagSmooth(e);
});

header.querySelectorAll('.lnb a').forEach(btn => {
    btn.addEventListener('click', function(e){
        moveAnchorTagSmooth(e);
        header.querySelector('.lnb').classList.remove('on');
        header.querySelector('.btn-drawer-menu').classList.remove('del');
    });
});

header.querySelector('.btn-drawer-menu').addEventListener('click', function(){
    this.classList.toggle('del');
    header.querySelector('.lnb').classList.toggle('on');
});

document.addEventListener('scroll', function(e){
    let ScollT = document.documentElement.scrollTop + header.clientHeight;

    if(window.innerWidth < 1024){
        if(getScrollDirection.direction() === 'DOWN'){
            header.style['top'] = -header.clientHeight + 'px';
        }else {
            header.style['top'] = '0px';
        }
    }else{
        header.style['top'] = '0px';
    }

    document.querySelectorAll('section').forEach((secSCT, i, arr) => {
        // Scroll Menu Active
        let sectionTop = arr[i].offsetTop - 10;
        let sectionBottom = arr[i].offsetTop + arr[i].clientHeight;
        if(sectionTop < ScollT && sectionBottom > ScollT) {
            let target = header.querySelector(`.lnb a[href='#${arr[i].getAttribute('id')}']`);
            header.querySelectorAll('.lnb a').forEach(lnbBtn => lnbBtn.classList.remove('on'));
            if(target){
                target.classList.add('on');
            }
        }
    });
});

// 순서 반환
function getIndex(ele) {
    let _i = 0;
    while((ele = ele.previousSibling) != null ) {
      _i++;
    } 
    return _i;
}

// 객체 형식의 스크롤 방향 감지
const getScrollDirection = {
    lastScroll: document.documentElement.scrollTop,
    direction: function() {
        let result;
        if(this.lastScroll < document.documentElement.scrollTop){
            result = 'DOWN';
        }else if(this.lastScroll > document.documentElement.scrollTop){
            result = 'UP';
        }
        this.lastScroll = document.documentElement.scrollTop;
        return result;
    }
};
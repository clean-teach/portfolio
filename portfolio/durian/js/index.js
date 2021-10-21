const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let eventClick = new MouseEvent('click',{
    'view': window,
    'bubbles' : true,
    'cancelable' : true
});

header.querySelector('h1 a').addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({
        top: document.querySelector(this.getAttribute('href')).offsetTop,
        left: 0,
        behavior: 'smooth'
    });
});

header.querySelectorAll('.lnb a').forEach(btn => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector(this.getAttribute('href')).offsetTop - headerHeight,
            left: 0,
            behavior: 'smooth'
        });
        header.querySelector('.lnb').classList.remove('on');
    });
});

header.querySelector('.btn-drawer-menu').addEventListener('click', function(){
    this.classList.toggle('del');
    header.querySelector('.lnb').classList.toggle('on');
});

window.addEventListener('resize', function() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
});


document.addEventListener('scroll', function(){
    let ScollT = document.documentElement.scrollTop + header.clientHeight;
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
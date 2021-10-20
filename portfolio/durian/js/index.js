const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

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
});

document.querySelectorAll('.lnb a').forEach(btn => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector(this.getAttribute('href')).offsetTop - headerHeight,
            left: 0,
            behavior: 'smooth'
        });
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
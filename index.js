const winInnerHeight = window.innerHeight;
const pageHeight = document.documentElement.offsetHeight;
const mainSection = document.querySelector('.main-section');
const card = document.querySelector('footer .card');
const cardOffsetTop = card.parentElement.offsetTop + card.offsetTop + card.clientHeight;
const initialAngleValue = 90;
const percentage = () => resetSct/(pageHeight-cardOffsetTop)*-90;

let mainBackColorR, mainBackColorG, mainBackColorB;

document.addEventListener('mousemove', function(e){
    let moveX = parseInt(e.x/mainSection.offsetWidth*255);
    let moveY = parseInt(e.y/mainSection.offsetHeight*255);

    console.log(mainBackColorR);
    console.log(mainBackColorG);
    console.log(mainBackColorB);

    mainSection.style.backgroundColor= `${moveX},0,${moveY},.8)`;
    mainBackColorR = moveX;
    mainBackColorG = 0;
    mainBackColorB = moveY;
});

document.addEventListener('scroll', function() {
    let scrollBottom = document.documentElement.scrollTop + winInnerHeight;

    // main section
    mainSection.style.backgroundColor= `rgba(${mainBackColorR},${mainBackColorG},${mainBackColorB},${1-(document.documentElement.scrollTop/mainSection.offsetHeight)})`;
    console.log(1-(document.documentElement.scrollTop/mainSection.offsetHeight));
    if(document.documentElement.scrollTop <= 0) {
        mainSection.classList.remove('blow');
    }else{
        mainSection.classList.add('blow');
    }
    
    // footer card
    if(scrollBottom > cardOffsetTop) {
        let resetSct = scrollBottom - cardOffsetTop;
        let percentage = resetSct/(pageHeight-cardOffsetTop)*-90;

        card.style.transform = `rotateX(${initialAngleValue + percentage}deg)`;
        card.style.transition = '0s';
    }
});

const sensitiveY = 40;
const sensitiveX = 20;
const direction = 1; // positive or negative
card.addEventListener('mousemove', function(e){
    card.style.transform = `
        rotateY(${direction*(window.innerWidth/2 - e.x)/sensitiveY}deg) 
        rotateX(${direction*(window.innerHeight/2 - e.y)/-sensitiveX}deg)
    `;
    card.style.transition = '0s';
});
card.addEventListener('mouseleave', function(){
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    card.style.transition = '1s';
});
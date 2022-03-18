// 스크롤 방향 감지
let scrollBaseValue = 0;
export const getScrollDirection = function(){
    let result;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

// 현재 스크롤 상태 맨 아래에 있는지 반환
export function getCurrentScrollBottomEnd(){
    const pageScrollHeight = document.body.scrollHeight;
    const scrollBottom = document.documentElement.scrollTop;
    if((pageScrollHeight - scrollBottom) == 0){
        return true;
    }else {
        return false;
    }
}

// 직사각형의 대각선 구하기
export function getPythagorean(a, b){
    const result = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return result;
}

// 랜덤 생성 함수
export function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// 퍼센티지 구하기
export function getPercentage(parts, whole, standard) {
    if (whole == '' || parts == '' || standard == '') {
        return null;
    } else {
        return parseFloat(parts / whole) * standard;
    }
}

// scroll에 따른 회전
export function scrollRotate(id) {
    let obj = document.getElementById(id);
    obj.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
    if (document.documentElement.scrollTop !== 0) {
        obj.classList.remove('rotate-animate');
    } else {
        obj.classList.add('rotate-animate');
    }
}

// 애니메이션 최적화
export function optimizeAnimation(callback) {
    let ticking = false;

    return () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
        }
    };
}
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
    const winInnerHeight = window.innerHeight;
    const pageScrollHeight = document.body.scrollHeight;
    const scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    if((pageScrollHeight - scrollBottom) == 0) return true;
    return false;
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
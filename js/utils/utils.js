// 스크롤 방향 감지
let scrollBaseValue = 0;
function getScrollDirection(){
    let result;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

// 현재 스크롤 상태 맨 아래에 있는지 반환
function getCurrentScrollBottomEnd(){
    const winInnerHeight = window.innerHeight;
    const pageScrollHeight = document.body.scrollHeight;
    const scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    if((pageScrollHeight - scrollBottom) == 0) return true;
    return false;
}

// 직사각형의 대각선 구하기
function getPythagorean(a, b){
    const result = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return result;
}
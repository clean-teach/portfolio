// 직사각형의 대각선 구하기
function getPythagorean(a, b){
    const result = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return result;
}

// 현재 스크롤 상태 맨 아래에 있는지 반환
function getCurrentScrollBottomEnd(){
    if((pageScrollHeight - scrollBottom) == 0) return true;
    return false;
}
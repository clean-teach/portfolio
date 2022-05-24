// 스크롤 방향 감지
var scrollBaseValue = 0;
export var getScrollDirection = function () {
    var result;
    if (scrollBaseValue < window.scrollY)
        result = 'DOWN';
    else
        result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
};
// 현재 스크롤 상태 맨 아래에 있는지 반환
export function getCurrentScrollBottomEnd() {
    var pageScrollHeight = document.body.scrollHeight;
    var winInnerHeight = window.innerHeight;
    var scrollBottom = document.documentElement.scrollTop + winInnerHeight;
    if ((pageScrollHeight - scrollBottom) == 0) {
        return true;
    }
    else {
        return false;
    }
}
// 직사각형의 대각선 구하기
export function getPythagorean(a, b) {
    var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return result;
}
// 랜덤 생성 함수
export function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
// 퍼센티지 구하기
export function getPercentage(parts, whole, standard) {
    return (parts / whole) * standard;
}
// scroll에 따른 회전
export function scrollRotate(id) {
    var obj = document.getElementById(id);
    var CLASS_NAME_ANIMATION = 'rotate-animate';
    obj.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
    if (document.documentElement.scrollTop !== 0) {
        obj.classList.remove(CLASS_NAME_ANIMATION);
    }
    else {
        obj.classList.add(CLASS_NAME_ANIMATION);
    }
}
// 애니메이션 최적화
export function optimizeAnimation(callback) {
    var ticking = false;
    return function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                callback();
                ticking = false;
            });
        }
    };
}
//# sourceMappingURL=utils.js.map
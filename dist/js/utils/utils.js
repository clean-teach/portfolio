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
export function getPythagorean(a, b) {
    var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return result;
}
export function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
export function getPercentage(parts, whole, standard) {
    return (parts / whole) * standard;
}
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
export var padStart = function (targetLength, padString, str) {
    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;
};
//# sourceMappingURL=utils.js.map
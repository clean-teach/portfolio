"use strict";
(function loadingPage() {
    var loader;
    document.addEventListener('DOMContentLoaded', function () {
        loader = document.querySelector('#loader');
    });
    window.addEventListener('load', windowLoadHandler);
    function windowLoadHandler() {
        var opacity = Number(window.getComputedStyle(loader).getPropertyValue('opacity'));
        window.scrollTo({ top: 0, left: 0 });
        setTimeout(function () {
            var fadeOut = setInterval(function () {
                if (opacity > 0) {
                    opacity -= .01;
                    loader.querySelectorAll('p').forEach(function (p) {
                        p.style.opacity = "".concat(opacity);
                    });
                }
                else {
                    clearInterval(fadeOut);
                }
            }, 10);
        }, 3000);
        setTimeout(function () {
            window.scrollTo({ top: 0, left: 0 });
            loader.remove();
        }, 5000);
    }
}());
//# sourceMappingURL=loadingPage.js.map
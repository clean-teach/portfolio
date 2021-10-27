(function loadingPage(){
    let loader;
    document.addEventListener('DOMContentLoaded', function () {
        loader = document.getElementById('loader');
    });
    window.onload = function () {
        let opacity = Number(window.getComputedStyle(loader).getPropertyValue('opacity'));

        window.scrollTo({top: 0, left: 0, behavior: 'instant'});
        setTimeout(function(){
            let fadeOut = setInterval(() => {
                if(opacity > 0) {
                    opacity -= .01;
                    loader.querySelectorAll('p').forEach(p => p.style.opacity = opacity);
                }else{
                    clearInterval(fadeOut);
                }
            }, 10);
        }, 4000);
        setTimeout(function(){
            window.scrollTo({top: 0, left: 0, behavior: 'instant'});
            loader.remove();
        },6000);
    };
}());
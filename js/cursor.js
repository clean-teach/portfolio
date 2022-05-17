(function createSetMouseCursorStyle () {
    const mouseCursorId = 'mouseCursor'
    const mouseCursorPointerClassName = 'pointer';
    const mouseCursor = document.createElement('div');
    mouseCursor.id = mouseCursorId;
    mouseCursor.innerHTML = '<div><div></div></div>';
    document.body.appendChild(mouseCursor);
    document.querySelectorAll('a, button').forEach(tg => {
        tg.addEventListener('mouseenter',function(e){
            mouseCursor.classList.add(mouseCursorPointerClassName);
        });
        tg.addEventListener('mouseleave',function(e){
            mouseCursor.classList.remove(mouseCursorPointerClassName)
        });
    });
    document.addEventListener('mousemove',function(e){
        mouseCursor.style['top'] = e.clientY - (mouseCursor.clientHeight/2) + 'px';
        mouseCursor.style['left'] = e.clientX - (mouseCursor.clientWidth/2) + 'px';
    });
}());
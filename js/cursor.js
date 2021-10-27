(function CreateSetMouseCursorStyle () {
    const mouseCursorId = 'mouseCursor'
    const mouseCursor = document.createElement('div');
    mouseCursor.id = mouseCursorId;
    mouseCursor.innerHTML = '<div><div></div></div>';
    document.body.appendChild(mouseCursor);
    document.querySelectorAll('a, button').forEach(tg => {
        tg.addEventListener('mouseenter',function(e){
            mouseCursor.classList.add('pointer');
        });
        tg.addEventListener('mouseleave',function(e){
            mouseCursor.classList.remove('pointer')
        });
    });
    document.addEventListener('mousemove',function(e){
        mouseCursor.style['top'] = e.clientY - (mouseCursor.clientHeight/2) + 'px';
        mouseCursor.style['left'] = e.clientX - (mouseCursor.clientWidth/2) + 'px';
    });
}());
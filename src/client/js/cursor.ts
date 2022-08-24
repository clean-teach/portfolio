(function createSetMouseCursorStyle ():void {
    const ID_NAME_MOUSE_CURSOR:string = 'mouseCursor'
    const CLASS_NAME_MOUSE_CURSOR_POINTER:string = 'pointer';
    const mouseCursor:HTMLElement = document.createElement('div');
    mouseCursor.id = ID_NAME_MOUSE_CURSOR;
    mouseCursor.innerHTML = '<div><div></div></div>';
    document.body.appendChild(mouseCursor);
    document.querySelectorAll('a, button').forEach(tg => {
        tg.addEventListener('mouseenter',function(e){
            mouseCursor.classList.add(CLASS_NAME_MOUSE_CURSOR_POINTER);
        });
        tg.addEventListener('mouseleave',function(e){
            mouseCursor.classList.remove(CLASS_NAME_MOUSE_CURSOR_POINTER)
        });
    });
    document.addEventListener('mousemove',function(e){
        mouseCursor.style['top'] = e.clientY - (mouseCursor.clientHeight/2) + 'px';
        mouseCursor.style['left'] = e.clientX - (mouseCursor.clientWidth/2) + 'px';
    });
}());
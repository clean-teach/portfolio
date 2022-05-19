// 타이틀 연속 변경
export function setIntervalTitle() {
    var title = document.querySelector('title');
    var ARR_TITLE_NAME = [
        '안녕하세요',
        'CH Portfolio',
        '입니다.'
    ];
    var i = 0;
    setInterval(function () {
        title.textContent = ARR_TITLE_NAME[i];
        i++;
        if (i >= ARR_TITLE_NAME.length) {
            i = 0;
        }
    }, 1000);
}
//# sourceMappingURL=setIntervalTitle.js.map
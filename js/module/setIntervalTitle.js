// 타이틀 연속 변경
export function setIntervalTitle() {
    const title = document.querySelector('title');
    const arrTitleName = [
        '안녕하세요',
        'CH Portfolio',
        '입니다.'
    ];
    let i = 0;
    setInterval(() => {
        title.textContent = arrTitleName[i];
        i++;
        if (i >= arrTitleName.length) {
            i = 0;
        }
    }, 1000);
}
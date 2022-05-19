// 타이틀 연속 변경
export function setIntervalTitle() {
    const title = document.querySelector('title') as HTMLElement;
    const ARR_TITLE_NAME:string[] = [
        '안녕하세요',
        'CH Portfolio',
        '입니다.'
    ];
    let i:number = 0;
    setInterval(() => {
        title.textContent = ARR_TITLE_NAME[i];
        i++;
        if (i >= ARR_TITLE_NAME.length) {
            i = 0;
        }
    }, 1000);
}
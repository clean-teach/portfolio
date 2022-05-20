// 스크롤 방향 감지
let scrollBaseValue = 0;
export const getScrollDirection = function():string {
    let result:string;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

// 현재 스크롤 상태 맨 아래에 있는지 반환
export function getCurrentScrollBottomEnd():boolean {
    const pageScrollHeight:number = document.body.scrollHeight;
    const scrollBottom:number = document.documentElement.scrollTop;
    if((pageScrollHeight - scrollBottom) == 0){
        return true;
    }else {
        return false;
    }
}

// 직사각형의 대각선 구하기
export function getPythagorean(a:number, b:number):number {
    const result:number = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return result;
}

// 랜덤 생성 함수
export function random(min:number, max:number):number {
    const num:number = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// 퍼센티지 구하기
export function getPercentage(parts:number, whole:number, standard:number ):number {
    return Math.floor(parts / whole) * standard;
}

// scroll에 따른 회전
export function scrollRotate(id:any):void {
    const obj = document.getElementById(id) as HTMLElement;
    const CLASS_NAME_ANIMATION:string = 'rotate-animate';
    obj.style.transform = "rotate(" + window.pageYOffset / 10 + "deg)";
    if (document.documentElement.scrollTop !== 0) {
        obj.classList.remove(CLASS_NAME_ANIMATION);
    } else {
        obj.classList.add(CLASS_NAME_ANIMATION);
    }
}

// 애니메이션 최적화
export function optimizeAnimation(callback: any) {
    let ticking:boolean = false;

    return () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
        }
    };
}
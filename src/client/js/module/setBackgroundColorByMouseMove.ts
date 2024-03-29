import { random } from "../utils/utils";

export const setBackgroundColorByMouseMove = {
    gradient : true,
    mediaCondition : matchMedia("screen and (min-width: 768px)").matches,
    eventX: 0,
    eventY: 0,
    R : random(0, 255),
    G : random(0, 255),
    B : random(0, 255),
    degree : 90,
    getScrollForAlpha(targetSection: HTMLElement): number{
        return 1 - (document.documentElement.scrollTop / targetSection.offsetHeight);
    },
    getMouseMove (event: any, target: HTMLElement):void {
    // scroll, mousemove 에 따른 배경색상 추출 및 설정 함수
        if(!target){
            return
        }
        if(this.mediaCondition){
            this.eventX = Math.floor(event.x / target.offsetWidth * 100);
            this.eventY = Math.floor(event.y / target.offsetHeight * 100);

            const getColor = ():void => {
                let moveXColor = Math.floor(event.x / target.offsetWidth * 255);
                let moveYColor = Math.floor(event.y / target.offsetHeight * 255);
            
                this.R = 255 - moveXColor;
                this.G = moveXColor;
                this.B = 255 - moveYColor;
            };
            const getDegree = ():void => {
                // 마우스 움직입을 통해서 각도 얻기
                if(this.gradient){
                    const center = {
                        x : target.getBoundingClientRect().left + (target.clientWidth/2), // target 절대위치 중심 x값
                        y : target.getBoundingClientRect().top + (target.clientHeight/2) // target 절대위치 중심 y값
                    }
                    const x = center.x - event.clientX;  // 타겟 중심점 x값 - 마우스 위치 x값
                    const y = center.y - event.clientY;  // 타겟 중심점 y값 - 마우스 위치 y값
                    
                    const radian = Math.atan2(y, x); // atan2함수
                    this.degree = Number((radian * 180 / Math.PI).toFixed(0));  // radian -> degree 변환
                }
            };
            getColor();
            getDegree();
        }
    },
    setBackgroundColor (targetSection: HTMLElement):void {
    // scroll, mousemove 에 따른 배경색상 적용 함수
        const bgTg = document.querySelector('#main-background-area') as HTMLElement;
        const alpha:number = this.getScrollForAlpha(targetSection);
        
        if(this.mediaCondition){
            if(this.gradient){
                bgTg.style.background = `linear-gradient(${this.degree}deg, rgba(${this.G},${this.B},${this.R},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
            }else{
                bgTg.style.background = `rgba(${this.R},${this.G},${this.B},${alpha})`;
            }
        }else{
            bgTg.style.background = `linear-gradient(90deg, rgba(${this.G},${this.B},${this.R},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
        }
        if(alpha <= 0) {
            bgTg.style.display = 'none';
        }else{
            bgTg.style.display = 'block';
        }
    }
};
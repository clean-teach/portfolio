import { random } from "../utils/utils.js";

// const btnSwitchModeGradient = document.querySelector('#btn-switch-mode-gradient');
// btnSwitchModeGradient.addEventListener('click', function(){
//     mouseMoveColor.gradient ? mouseMoveColor.gradient = false :  mouseMoveColor.gradient = true;
// });

export const mouseMoveColor = {
    gradient : true,
    mediaCondition : matchMedia("screen and (min-width: 768px)").matches,
    eventX: 0,
    eventY: 0,
    R : random(0, 255),
    G : random(0, 255),
    B : random(0, 255),
    degree : 90,
    getScrollForAlpha(targetSection){
        return 1 - (document.documentElement.scrollTop / targetSection.offsetHeight);
    },
    getMouseMove (event, target) {
    // scroll, mousemove 에 따른 배경색상 추출 및 설정 함수
        if(this.mediaCondition){
            this.eventX = parseInt(event.x / target.offsetWidth * 100);
            this.eventY = parseInt(event.y / target.offsetHeight * 100);

            const getColor = () => {
                let moveXColor = parseInt(event.x / target.offsetWidth * 255);
                let moveYColor = parseInt(event.y / target.offsetHeight * 255);
            
                this.R = 255 - moveXColor;
                this.G = moveXColor;
                this.B = 255 - moveYColor;
            };
            const getDegree = () => {
                // 마우스 움직입을 통해서 각도 얻기
                if(this.gradient){
                    const center = {
                        x : target.getBoundingClientRect().left + (target.clientWidth/2), // target 절대위치 중심 x값
                        y : target.getBoundingClientRect().top + (target.clientHeight/2) // target 절대위치 중심 y값
                    }
                    const x = center.x - event.clientX;  // 타겟 중심점 x값 - 마우스 위치 x값
                    const y = center.y - event.clientY;  // 타겟 중심점 y값 - 마우스 위치 y값
                    
                    const radian = Math.atan2(y, x); // atan2함수
                    this.degree = (radian * 180 / Math.PI).toFixed(0);  // radian -> degree 변환
                }
            };
            getColor();
            getDegree();
        }
    },
    setBackgroundColor (targetSection) {
    // scroll, mousemove 에 따른 배경색상 적용 함수
        const bgTg = document.querySelector('#main-background-area');
        let alpha = this.getScrollForAlpha(targetSection);
        
        if(this.mediaCondition){
            if(this.gradient){
                bgTg.style.background = `linear-gradient(${this.degree}deg, rgba(${this.G},${this.B},${this.R},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
                // bgTg.style.background = `conic-gradient(at ${this.eventX}% ${this.eventY}%, rgba(${this.R},${this.G},${this.B},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
            }else{
                bgTg.style.background = `rgba(${this.R},${this.G},${this.B},${alpha})`;
            }
        }else{
            bgTg.style.background = `linear-gradient(90deg, rgba(${this.G},${this.B},${this.R},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
        }
    }
};
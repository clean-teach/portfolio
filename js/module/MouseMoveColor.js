import { random } from "../utils/utils.js";

export const mouseMoveColor = {
    gradient: true,
    R: random(0, 255),
    G: random(0, 255),
    B: random(0, 255),
    // scroll, mousemove 에 따른 배경색상 추출 및 설정 함수
    getMouseMoveColor: function (event, tg) {
        let moveX = parseInt(event.x / tg.offsetWidth * 255);
        let moveY = parseInt(event.y / tg.offsetHeight * 255);
    
        this.R = 255 - moveX;
        this.G = moveX;
        this.B = 255 - moveY;
    },
    // scroll, mousemove 에 따른 배경색상 적용 함수
    setBackgroundColor: function (alpha) {
        if(this.gradient){
            document.body.style.background = `linear-gradient(90deg, rgba(${this.R},${this.G},${this.B},${alpha}) 0%, rgba(${this.G},${this.B},${this.R},${alpha}) 50%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
        }else{
            document.body.style.backgroundColor = `rgba(${this.R},${this.G},${this.B},${alpha})`;
        }
    }
};
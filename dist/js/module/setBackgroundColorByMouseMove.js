import { random } from "../utils/utils.js";
// const btnSwitchModeGradient = document.querySelector('#btn-switch-mode-gradient');
// btnSwitchModeGradient.addEventListener('click', function(){
//     mouseMoveColor.gradient ? mouseMoveColor.gradient = false :  mouseMoveColor.gradient = true;
// });
export var setBackgroundColorByMouseMove = {
    gradient: true,
    mediaCondition: matchMedia("screen and (min-width: 768px)").matches,
    eventX: 0,
    eventY: 0,
    R: random(0, 255),
    G: random(0, 255),
    B: random(0, 255),
    degree: 90,
    getScrollForAlpha: function (targetSection) {
        return 1 - (document.documentElement.scrollTop / targetSection.offsetHeight);
    },
    getMouseMove: function (event, target) {
        var _this = this;
        // scroll, mousemove 에 따른 배경색상 추출 및 설정 함수
        if (this.mediaCondition) {
            this.eventX = Math.floor(event.x / target.offsetWidth * 100);
            this.eventY = Math.floor(event.y / target.offsetHeight * 100);
            var getColor = function () {
                var moveXColor = Math.floor(event.x / target.offsetWidth * 255);
                var moveYColor = Math.floor(event.y / target.offsetHeight * 255);
                _this.R = 255 - moveXColor;
                _this.G = moveXColor;
                _this.B = 255 - moveYColor;
            };
            var getDegree = function () {
                // 마우스 움직입을 통해서 각도 얻기
                if (_this.gradient) {
                    var center = {
                        x: target.getBoundingClientRect().left + (target.clientWidth / 2),
                        y: target.getBoundingClientRect().top + (target.clientHeight / 2) // target 절대위치 중심 y값
                    };
                    var x = center.x - event.clientX; // 타겟 중심점 x값 - 마우스 위치 x값
                    var y = center.y - event.clientY; // 타겟 중심점 y값 - 마우스 위치 y값
                    var radian = Math.atan2(y, x); // atan2함수
                    _this.degree = Number((radian * 180 / Math.PI).toFixed(0)); // radian -> degree 변환
                }
            };
            getColor();
            getDegree();
        }
    },
    setBackgroundColor: function (targetSection) {
        // scroll, mousemove 에 따른 배경색상 적용 함수
        var bgTg = document.querySelector('#main-background-area');
        var alpha = this.getScrollForAlpha(targetSection);
        if (this.mediaCondition) {
            if (this.gradient) {
                bgTg.style.background = "linear-gradient(".concat(this.degree, "deg, rgba(").concat(this.G, ",").concat(this.B, ",").concat(this.R, ",").concat(alpha, ") 0%, rgba(").concat(this.B, ",").concat(this.R, ",").concat(this.G, ",").concat(alpha, ") 100%)");
                // bgTg.style.background = `conic-gradient(at ${this.eventX}% ${this.eventY}%, rgba(${this.R},${this.G},${this.B},${alpha}) 0%, rgba(${this.B},${this.R},${this.G},${alpha}) 100%)`;
            }
            else {
                bgTg.style.background = "rgba(".concat(this.R, ",").concat(this.G, ",").concat(this.B, ",").concat(alpha, ")");
            }
        }
        else {
            bgTg.style.background = "linear-gradient(90deg, rgba(".concat(this.G, ",").concat(this.B, ",").concat(this.R, ",").concat(alpha, ") 0%, rgba(").concat(this.B, ",").concat(this.R, ",").concat(this.G, ",").concat(alpha, ") 100%)");
        }
        if (alpha <= 0) {
            bgTg.style.display = 'none';
        }
        else {
            bgTg.style.display = 'block';
        }
    }
};
//# sourceMappingURL=setBackgroundColorByMouseMove.js.map
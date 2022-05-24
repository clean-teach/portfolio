import { random } from "../utils/utils.js";
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
                if (_this.gradient) {
                    var center = {
                        x: target.getBoundingClientRect().left + (target.clientWidth / 2),
                        y: target.getBoundingClientRect().top + (target.clientHeight / 2)
                    };
                    var x = center.x - event.clientX;
                    var y = center.y - event.clientY;
                    var radian = Math.atan2(y, x);
                    _this.degree = Number((radian * 180 / Math.PI).toFixed(0));
                }
            };
            getColor();
            getDegree();
        }
    },
    setBackgroundColor: function (targetSection) {
        var bgTg = document.querySelector('#main-background-area');
        var alpha = this.getScrollForAlpha(targetSection);
        if (this.mediaCondition) {
            if (this.gradient) {
                bgTg.style.background = "linear-gradient(".concat(this.degree, "deg, rgba(").concat(this.G, ",").concat(this.B, ",").concat(this.R, ",").concat(alpha, ") 0%, rgba(").concat(this.B, ",").concat(this.R, ",").concat(this.G, ",").concat(alpha, ") 100%)");
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
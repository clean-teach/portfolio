import { getPythagorean } from "../utils/utils.js";
// create Background Style by Motion
export var setBackgroundStyleByScroll = {
    elBackCircle: document.querySelector('#main-background-area .circle'),
    contactSection: document.querySelector('#contact-section'),
    viewportHypotenuse: getPythagorean(document.documentElement.clientWidth, document.documentElement.clientHeight),
    start: 0,
    setInit: function () {
        this.start = this.contactSection.offsetTop;
        this.elBackCircle.style['width'] = "".concat(this.viewportHypotenuse, "px");
        this.elBackCircle.style['height'] = "".concat(this.viewportHypotenuse, "px");
        this.elBackCircle.style['transform'] = "scale(0)";
    },
    move: function (scrollBottom) {
        if (scrollBottom > this.start) {
            this.elBackCircle.style['transform'] = "scale(".concat((scrollBottom - this.start) / 1000, ")");
        }
        else {
            this.elBackCircle.style['transform'] = "scale(0)";
        }
    }
};
//# sourceMappingURL=setBackgroundStyleByScroll.js.map
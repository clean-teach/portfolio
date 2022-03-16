import { getPythagorean } from "../utils/utils.js";

// Background Motion Style create
export const backgroundStyleMotion = {
    elBackCircle: document.querySelector('#main-background-area .circle'),
    viewportHypotenuse: getPythagorean(document.documentElement.clientWidth, document.documentElement.clientHeight),
    start: null,
    setInit: function() {
        this.elBackCircle.style['width'] = `${viewportHypotenuse}px`;
        this.elBackCircle.style['height'] = `${viewportHypotenuse}px`;
        this.elBackCircle.style['transform'] = `scale(0)`;
    },
    move: function (scrollBottom, contactSection) {
        this.start = contactSection.offsetTop;
        if (scrollBottom > this.start) {
            this.elBackCircle.style['transform'] = `scale(${(scrollBottom - this.start) / 1000})`;
        } else {
            this.elBackCircle.style['transform'] = `scale(0)`;
        }
    }
};
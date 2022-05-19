import { getPythagorean } from "../utils/utils.js";

// create Background Style by Motion
export const setBackgroundStyleByScroll = {
    elBackCircle: document.querySelector('#main-background-area .circle') as HTMLElement,
    contactSection: document.querySelector('#contact-section') as HTMLElement,
    viewportHypotenuse: getPythagorean(document.documentElement.clientWidth, document.documentElement.clientHeight),
    start: 0 as number,
    setInit: function():void {
        this.start = this.contactSection.offsetTop;
        this.elBackCircle.style['width'] = `${this.viewportHypotenuse}px`;
        this.elBackCircle.style['height'] = `${this.viewportHypotenuse}px`;
        this.elBackCircle.style['transform'] = `scale(0)`;
    },
    move: function (scrollBottom: number):void {
        if (scrollBottom > this.start) {
            this.elBackCircle.style['transform'] = `scale(${(scrollBottom - this.start) / 1000})`;
        } else {
            this.elBackCircle.style['transform'] = `scale(0)`;
        }
    }
};
import { getPercentage } from "../utils/utils";

let portfolioSection = document.querySelector('#portfolio-section') as HTMLElement;
let contactSection = document.querySelector('#contact-section') as HTMLElement;
let joinArea = document.querySelector('.join-motion-txt-area') as HTMLElement;
let joinLine = joinArea.querySelectorAll('.line') as NodeListOf<HTMLElement>;
let joinTxt = joinArea.querySelectorAll('.txt') as NodeListOf<HTMLElement>;
let joinTxt01 = joinArea.querySelector('.txt01') as HTMLElement;
let joinTxt02 = joinArea.querySelector('.txt02') as HTMLElement;
let contactSectionHeading = contactSection.querySelector('h2') as HTMLElement;
let formArea = contactSection.querySelector('.form-area') as HTMLElement;
let portfolioSectionHeight = portfolioSection.offsetHeight;

export const motionContactAreaByScroll: {
    option: {
        animateSpeed: number;
    };
    scrollBottom: number;
    winInnerHeight: number;
    portfolioSectionHeight: number;
    actionScrollPoint: {
        moveJoinTxt: {
            showReady: number;
            lineStart: number;
            lineEnd: number;
            txtStart: number;
            txtEnd: number;
            posiStart: number;
        };
        heading: {
            fadeInStart: number;
            fadeInEnd: number;
            scaleStart: number;
            scaleEnd: number;
        };
        formArea: {
            scaleStart: number;
            scaleEnd: number;
            posiStart: number;
        }
    };
    get(winInnerHeight: number): void;
    convertScrollToPercentage(startScroll: number, endScroll: number, percentTotal: number, currentScroll: number): number;
    rotateYForm(degree: any): void;
    fixedPosition(startScroll: number, endScroll: number, target: HTMLElement):void;
    moveJoinLine(startScroll: number, endScroll: number):void;
    setOpacity(startScroll: number, endScroll: number, minOpacity: number, maxOpacity: number):number;
    moveJoinTxt(startScroll: number, endScroll: number):void;
    moveEmboss(startScroll: number, endScroll: number):void;
    extendScale(startScroll: number, endScroll: number, target: HTMLElement, minScale: number, maxScale: number):void;
    setColorMono(startScroll: number, endScroll: number, target: HTMLElement, minValue: number, maxValue: number):void;
    setDisplay(startScroll: number, endScroll: string | number, target: HTMLElement, display: string):void;
    scrollHandler(scrollBottom: number):void;
} = {
    option: {
        animateSpeed: 1 // 양수 입력
    },
    scrollBottom: 0,
    winInnerHeight: 0,
    actionScrollPoint: {
        moveJoinTxt: {
            showReady: 0,
            lineStart: 0,
            lineEnd: 0,
            txtStart: 0,
            txtEnd: 0,
            posiStart: 0,
        },
        heading: {
            fadeInStart: 0,
            fadeInEnd: 0,
            scaleStart: 0,
            scaleEnd: 0,
        },
        formArea: {
            scaleStart: 0,
            scaleEnd: 0,
            posiStart: 0,
        }
    },
    get(winInnerHeight: number) {
        // 페이지의 모든 리소스가 로딩된 시점에서 가져올 정보 및 세팅
        const speed:number = Math.abs(this.option.animateSpeed);
        portfolioSection = document.querySelector('#portfolio-section') as HTMLElement;
        contactSection = document.querySelector('#contact-section') as HTMLElement;
        joinArea = document.querySelector('.join-motion-txt-area') as HTMLElement;
        joinLine = joinArea.querySelectorAll('.line') as NodeListOf<HTMLElement>;
        joinTxt = joinArea.querySelectorAll('.txt') as NodeListOf<HTMLElement>;
        joinTxt01 = joinArea.querySelector('.txt01') as HTMLElement;
        joinTxt02 = joinArea.querySelector('.txt02') as HTMLElement;
        contactSectionHeading = contactSection.querySelector('h2') as HTMLElement;
        formArea = contactSection.querySelector('.form-area') as HTMLElement;
        portfolioSectionHeight = portfolioSection.offsetHeight;

        contactSection.classList.add('animation-by-scroll-style');

        this.winInnerHeight = winInnerHeight;
        this.actionScrollPoint.moveJoinTxt.showReady =
            window.pageYOffset + portfolioSection.getBoundingClientRect().top + portfolioSectionHeight + (this.winInnerHeight * .5);
        this.actionScrollPoint.moveJoinTxt.lineStart =
            this.actionScrollPoint.moveJoinTxt.showReady + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.moveJoinTxt.lineEnd =
            this.actionScrollPoint.moveJoinTxt.lineStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.moveJoinTxt.txtStart =
            this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd =
            this.actionScrollPoint.moveJoinTxt.txtStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.moveJoinTxt.posiStart =
            this.actionScrollPoint.moveJoinTxt.txtEnd + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.heading.fadeInStart =
            this.actionScrollPoint.moveJoinTxt.posiStart + (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.heading.fadeInEnd =
            this.actionScrollPoint.heading.fadeInStart + (this.winInnerHeight * (2 * speed));
        this.actionScrollPoint.heading.scaleStart =
            this.actionScrollPoint.heading.fadeInEnd;
        this.actionScrollPoint.heading.scaleEnd =
            this.actionScrollPoint.heading.scaleStart + (this.winInnerHeight * (1.5 * speed));
        this.actionScrollPoint.formArea.scaleStart =
            this.actionScrollPoint.heading.scaleEnd - (this.winInnerHeight * (.5 * speed));
        this.actionScrollPoint.formArea.scaleEnd =
            this.actionScrollPoint.formArea.scaleStart + (this.winInnerHeight * (1.5 * speed));
        this.actionScrollPoint.formArea.posiStart =
            this.actionScrollPoint.formArea.scaleEnd + (this.winInnerHeight * (.5 * speed));
    },
    convertScrollToPercentage(startScroll: number, endScroll: number, percentTotal: number, currentScroll: number): number {
        // 스크롤을 퍼센트 값으로 변환 시키는 함수
        if (currentScroll >= startScroll && currentScroll <= endScroll) {
            const percentage = getPercentage((currentScroll - startScroll), (endScroll - startScroll), percentTotal);
            return percentage;
        }
        return 0;
    },
    rotateYForm(degree: any): void {
        const centerWrap = contactSection.querySelector('.center-wrap') as HTMLElement;
        centerWrap.style['transform'] = `rotateY(${degree}deg)`;
    },
    fixedPosition(startScroll: number, endScroll: number, target: HTMLElement): void {
        const CLASS_NAME_FIEXD: string = 'fixed';
        if (this.scrollBottom > startScroll && this.scrollBottom < endScroll) {
            target.classList.add(CLASS_NAME_FIEXD);
        } else {
            target.classList.remove(CLASS_NAME_FIEXD);
        }
    },
    moveJoinLine(startScroll: number, endScroll: number): void {
        const maxScaleXValue:number = 1;
        let scaleXValue:number = this.convertScrollToPercentage(startScroll, endScroll, maxScaleXValue, this.scrollBottom);

        if (this.scrollBottom < startScroll) {
            scaleXValue = 0;
        } else if (this.scrollBottom > endScroll) {
            scaleXValue = maxScaleXValue;
        }

        if (!joinLine) {
            document.location.reload();
        } else {
            joinLine.forEach(line => {
                line.style['transform'] = `scaleX(${scaleXValue})`;
            });
        }
    },
    setOpacity(startScroll: number, endScroll: number, minOpacity: number, maxOpacity: number): number {
        let opacityValue = this.convertScrollToPercentage(startScroll, endScroll, maxOpacity, this.scrollBottom);

        if (this.scrollBottom < startScroll) {
            opacityValue = minOpacity;
        } else if (this.scrollBottom > endScroll) {
            opacityValue = maxOpacity;
        }

        return opacityValue;
    },
    moveJoinTxt(startScroll: number, endScroll: number): void {
        const maxpositionValue: number = 100;

        let positionValue: number = maxpositionValue - this.convertScrollToPercentage(startScroll, endScroll, maxpositionValue, this.scrollBottom);
        if (this.scrollBottom < startScroll) {
            positionValue = maxpositionValue;
        } else if (this.scrollBottom > endScroll) {
            positionValue = 0;
        }

        joinTxt01.style['transform'] = `translateX(${-positionValue}vw)`;
        joinTxt02.style['transform'] = `translateX(${positionValue}vw)`;

        const opacity = this.setOpacity(startScroll, endScroll, 0, 1);
        joinTxt.forEach(txt => {
            txt.style.opacity = `${opacity}`;
        });
    },
    moveEmboss(startScroll: number, endScroll: number): void {
        const opacity = this.setOpacity(startScroll, endScroll, 0, .6);
        const maxShadowSizeValue = .4;
        let shadowSizeValue = this.convertScrollToPercentage(startScroll, endScroll, maxShadowSizeValue, this.scrollBottom);

        if (this.scrollBottom < startScroll) {
            shadowSizeValue = 0;
        } else if (this.scrollBottom > endScroll) {
            shadowSizeValue = maxShadowSizeValue;
        }

        contactSectionHeading.style.textShadow = `0 0 ${shadowSizeValue}rem rgba(0, 0, 0, ${opacity})`;
    },
    extendScale(startScroll: number, endScroll: number, target: HTMLElement, minScale: number, maxScale: number): void {

        let scaleValue = minScale + this.convertScrollToPercentage(startScroll, endScroll, maxScale, this.scrollBottom);

        if (this.scrollBottom < startScroll) {
            scaleValue = minScale;
        } else if (this.scrollBottom > endScroll) {
            scaleValue = maxScale;
        }

        target.style['transform'] = `scale(${scaleValue})`;
    },
    setColorMono(startScroll: number, endScroll: number, target: HTMLElement, minValue: number, maxValue: number): void {
        let ColorValue = maxValue - this.convertScrollToPercentage(startScroll, endScroll, maxValue, this.scrollBottom);

        if (this.scrollBottom < startScroll) {
            ColorValue = maxValue;
        } else if (this.scrollBottom > endScroll) {
            ColorValue = minValue;
        }

        // target.style['background-color'] = `rgb(${ColorValue}, ${ColorValue}, ${ColorValue})`;
    },
    setDisplay(startScroll: number, endScroll: string | number, target: HTMLElement, display: string): void {
        if (endScroll) {
            if (this.scrollBottom > startScroll && this.scrollBottom < endScroll) {
                target.style['display'] = display;
            } else {
                target.style['display'] = 'none';
            }
        } else {
            if (this.scrollBottom < startScroll) {
                target.style['display'] = 'none';
            } else {
                target.style['display'] = display;
            }
        }
    },
    scrollHandler(scrollBottom: number): void {
        this.scrollBottom = scrollBottom;
        this.moveJoinLine(this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd);
        this.moveJoinTxt(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd);
        this.fixedPosition(this.actionScrollPoint.moveJoinTxt.showReady, this.actionScrollPoint.moveJoinTxt.posiStart, joinArea);
        this.setDisplay(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.scaleEnd, contactSectionHeading, 'flex');
        contactSectionHeading.style.opacity = `${1 - this.setOpacity(this.actionScrollPoint.heading.fadeInEnd, this.actionScrollPoint.heading.scaleEnd, 0, 1)}`;
        this.moveEmboss(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.fadeInEnd);
        this.extendScale(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.heading.scaleEnd, contactSectionHeading, 1, 100);
        this.setDisplay(this.actionScrollPoint.formArea.scaleStart, '', formArea, 'flex');
        this.extendScale(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.scaleEnd, formArea, 0, 1);
        this.fixedPosition(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.posiStart, formArea);
        this.setColorMono(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.formArea.posiStart, contactSection, 0, 255);
    },
    portfolioSectionHeight: 0
};

// Contact Section의 form 태그 focus 효과
export const bindContactForm = () => {
    const contactFormTag = document.querySelectorAll('#contact-section input, textarea') as NodeListOf<HTMLElement>;
    const CLASS_NAME_ON = 'on';

    contactFormTag.forEach((formBox: HTMLElement):void => {
        formBox.addEventListener('focus', function ():void {
            const li = this.parentElement;
            if(li !== null){
                li.querySelector('label');
                li.classList.add(CLASS_NAME_ON);
            }
        });
        formBox.addEventListener('blur', function () {
            const li = this.parentElement;
            if(li !== null){
                li.querySelector('label');
                li.classList.remove(CLASS_NAME_ON);
            }
        });
    });
};
import { getPercentage } from "../utils/utils.js";

export const motionContactAreaByScroll = {
    portfolioSection:  null,
    contactSection: null,
    contactSectionHeading: null,
    joinArea: null,
    joinLine: null,
    joinTxt: null,
    portfolioSectionHeight: null,
    contactSectionHeight: null,
    actionScrollPoint: {
        moveJoinTxt: {
            showReady: null,
            lineStart: null,
            lineEnd: null,
            txtStart: null,
            txtEnd: null,
            posiStart: null,
        },
        heading: {
            fadeInStart: null,
            fadeInEnd: null,
            scaleStart: null,
            scaleEnd: null,
        },
        formArea: {
            scaleStart: null,
            scaleEnd: null,
            posiStart: null,
        }
    },
    get(winInnerHeight){
    // 페이지의 모든 리소스가 로딩된 시점에서 가져올 정보들
        this.portfolioSection = document.querySelector('#portfolio-section');
        this.contactSection = document.querySelector
        ('#contact-section');
        this.joinArea = document.querySelector('.join-motion-txt-area');
        this.joinLine = this.joinArea.querySelectorAll('.line');
        this.joinTxt = this.joinArea.querySelectorAll('.txt');
        this.joinTxt01 = this.joinArea.querySelector('.txt01');
        this.joinTxt02 = this.joinArea.querySelector('.txt02');
        this.contactSectionHeight = this.contactSection.offsetHeight;
        this.portfolioSectionHeight = this.portfolioSection.offsetHeight;
        this.actionScrollPoint.moveJoinTxt.showReady = window.pageYOffset + this.portfolioSection.getBoundingClientRect().top + this.portfolioSectionHeight + (winInnerHeight);
        this.contactSectionHeading = this.contactSection.querySelector('h2');
        this.formArea = this.contactSection.querySelector('.form-area');
        this.actionScrollPoint.moveJoinTxt.lineStart = this.actionScrollPoint.moveJoinTxt.showReady + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.lineEnd = this.actionScrollPoint.moveJoinTxt.lineStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.txtStart = this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd = this.actionScrollPoint.moveJoinTxt.txtStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.posiStart = window.pageYOffset + this.joinArea.getBoundingClientRect().top + (winInnerHeight/2);
        this.actionScrollPoint.heading.fadeInStart = this.actionScrollPoint.moveJoinTxt.posiStart + (winInnerHeight/2);
        this.actionScrollPoint.heading.fadeInEnd = this.actionScrollPoint.heading.fadeInStart + (winInnerHeight/2);
        this.actionScrollPoint.heading.scaleStart = this.actionScrollPoint.heading.fadeInEnd;
        this.actionScrollPoint.heading.scaleEnd = this.actionScrollPoint.heading.scaleStart + (winInnerHeight*2);
        this.actionScrollPoint.formArea.scaleStart = this.actionScrollPoint.heading.scaleEnd;
        this.actionScrollPoint.formArea.scaleEnd = this.actionScrollPoint.formArea.scaleStart + winInnerHeight;
        this.actionScrollPoint.formArea.posiStart = window.pageYOffset + this.formArea.getBoundingClientRect().top + (winInnerHeight/2);
    },
    convertScrollToPercentage(startScroll, endScroll, percentTotal, currentScroll){
    // 스크롤을 퍼센트 값으로 변환 시키는 함수
        if(currentScroll >= startScroll && currentScroll <= endScroll){
            let percentage = getPercentage((currentScroll - startScroll), (endScroll - startScroll), percentTotal);

            return percentage;
        }
        return null;
    },
    rotateYForm(degree){
        contactSection.querySelector('.center-wrap').style['transform'] = `rotateY(${degree}deg)`;
    },
    fixedPosition(scrollBottom, startScroll, endScroll, target){
        if(scrollBottom > startScroll && scrollBottom < endScroll){
            target.classList.add('fixed');
        }else{
            target.classList.remove('fixed');
        }
    },
    moveJoinLine(scrollBottom, startScroll, endScroll){  
        const maxScaleXValue = 1;
        let scaleXValue = this.convertScrollToPercentage(startScroll, endScroll, maxScaleXValue, scrollBottom);

        if(scrollBottom < startScroll) {
            scaleXValue = 0;
        }else if(scrollBottom > endScroll){
            scaleXValue = maxScaleXValue;
        }

        this.joinLine.forEach(line => {
            line.style['transform'] = `scaleX(${scaleXValue})`;
        });
    },
    setOpacity(scrollBottom, startScroll, endScroll, minOpacity, maxOpacity){
        let opacityValue = this.convertScrollToPercentage(startScroll, endScroll, maxOpacity, scrollBottom);

        if(scrollBottom < startScroll) {
            opacityValue = minOpacity;
        }else if(scrollBottom > endScroll){
            opacityValue = maxOpacity;
        }

        return opacityValue;
    },
    moveJoinTxt(scrollBottom, startScroll, endScroll) {
        const maxpositionValue = 100;
        
        let positionValue = maxpositionValue - this.convertScrollToPercentage(startScroll, endScroll, maxpositionValue, scrollBottom);

        if(scrollBottom < startScroll) {
            positionValue = maxpositionValue;
        }else if(scrollBottom > endScroll){
            positionValue = 0;
        }

        this.joinTxt01.style['transform'] = `translateX(${-positionValue}vw)`;
        this.joinTxt02.style['transform'] = `translateX(${positionValue}vw)`;

        const opacity = this.setOpacity(scrollBottom, startScroll, endScroll, 0, 1);
        this.joinTxt.forEach(txt => {
            txt.style['opacity'] = opacity;
        });
    },
    moveEmboss(scrollBottom, startScroll, endScroll){
        const opacity = this.setOpacity(scrollBottom, startScroll, endScroll, 0, .8);
        const maxShadowSizeValue = 1.6;
        let shadowSizeValue = this.convertScrollToPercentage(startScroll, endScroll, maxShadowSizeValue, scrollBottom);

        if(scrollBottom < startScroll) {
            shadowSizeValue = 0;
        }else if(scrollBottom > endScroll){
            shadowSizeValue = maxShadowSizeValue;
        }
        
        this.contactSectionHeading.style['text-shadow'] = `0 0 ${shadowSizeValue}rem rgba(0, 0, 0, ${opacity})`;
    },
    extendScale(scrollBottom, startScroll, endScroll, target, minScale, maxScale){
        let scaleValue = minScale + this.convertScrollToPercentage(startScroll, endScroll, maxScale, scrollBottom);

        if(scrollBottom < startScroll) {
            scaleValue = minScale;
        }else if(scrollBottom > endScroll){
            scaleValue = maxScale;
        }
        
        target.style['transform'] = `scale(${scaleValue})`;
    },
    setColorMono(scrollBottom, startScroll, endScroll, target, minValue, maxValue){
        let ColorValue = maxValue - this.convertScrollToPercentage(startScroll, endScroll, maxValue, scrollBottom);

        if(scrollBottom < startScroll) {
            ColorValue = maxValue;
        }else if(scrollBottom > endScroll){
            ColorValue = minValue;
        }
        
        target.style['background-color'] = `rgb(${ColorValue}, ${ColorValue}, ${ColorValue})`;
    },
    setDisplay(scrollBottom, startScroll, endScroll, target, display){
        if(endScroll){
            if(scrollBottom > startScroll && scrollBottom < endScroll){
                target.style['display'] = display;
            }else{
                target.style['display'] = 'none';
            }
        }else{
            if(scrollBottom < startScroll) {
                target.style['display'] = 'none';
            }else{
                target.style['display'] = display;
            }
        }
    },
    scroll(scrollBottom) {
        this.moveJoinLine(scrollBottom, this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd);
        this.moveJoinTxt(scrollBottom, this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd);
        this.fixedPosition(scrollBottom, this.actionScrollPoint.moveJoinTxt.showReady, this.actionScrollPoint.moveJoinTxt.posiStart, this.joinArea);
        this.setDisplay(scrollBottom, this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.scaleEnd, this.contactSectionHeading, 'flex')
        this.contactSectionHeading.style['opacity'] = 1 - this.setOpacity(scrollBottom, this.actionScrollPoint.heading.fadeInEnd, this.actionScrollPoint.heading.scaleEnd, 0, 1);
        this.moveEmboss(scrollBottom, this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.fadeInEnd);
        this.extendScale(scrollBottom, this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.heading.scaleEnd, this.contactSectionHeading, 1, 100);
        this.setDisplay(scrollBottom, this.actionScrollPoint.formArea.scaleStart, '', this.formArea, 'flex');
        this.extendScale(scrollBottom, this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.scaleEnd, this.formArea, 0, 1);
        this.fixedPosition(scrollBottom, this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.posiStart, this.formArea);
        this.setColorMono(scrollBottom, this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.formArea.posiStart, this.contactSection, 0, 255);
    }
};

// Contact Section의 form 태그 focus 효과
export const bindContactForm = () => {
    const contactFormTag = document.querySelectorAll('#contact-section input, textarea');

    contactFormTag.forEach(formBox => {
        formBox.addEventListener('focus', function () {
            this.parentNode.querySelector('label').classList.add('on');
        });
        formBox.addEventListener('blur', function () {
            this.parentNode.querySelector('label').classList.remove('on');
        });
    });
};
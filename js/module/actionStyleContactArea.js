import { getPercentage } from "../utils/utils.js";

export const motionContactAreaByScroll = {
    option: {
        animateSpeed: 1 // 양수 입력
    },
    scrollBottom: null,
    winInnerHeight: null,
    portfolioSection:  null,
    contactSection: null,
    contactSectionHeading: null,
    joinArea: null,
    joinLine: null,
    joinTxt: null,
    portfolioSectionHeight: null,
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
    // 페이지의 모든 리소스가 로딩된 시점에서 가져올 정보 및 세팅
        const speed = Math.abs(this.option.animateSpeed);

        this.winInnerHeight = winInnerHeight;
        this.portfolioSection = document.querySelector('#portfolio-section');
        this.contactSection = document.querySelector
        ('#contact-section');
        this.joinArea = document.querySelector('.join-motion-txt-area');
        this.joinLine = this.joinArea.querySelectorAll('.line');
        this.joinTxt = this.joinArea.querySelectorAll('.txt');
        this.joinTxt01 = this.joinArea.querySelector('.txt01');
        this.joinTxt02 = this.joinArea.querySelector('.txt02');
        this.contactSectionHeading = this.contactSection.querySelector('h2');
        this.formArea = this.contactSection.querySelector('.form-area');
        this.portfolioSectionHeight = this.portfolioSection.offsetHeight;

        this.contactSection.classList.add('animation-by-scroll-style');
        this.actionScrollPoint.moveJoinTxt.showReady = 
            window.pageYOffset + this.portfolioSection.getBoundingClientRect().top + this.portfolioSectionHeight + (this.winInnerHeight*.5);
        this.actionScrollPoint.moveJoinTxt.lineStart = 
            this.actionScrollPoint.moveJoinTxt.showReady + (this.winInnerHeight*(.5 * speed));
        this.actionScrollPoint.moveJoinTxt.lineEnd = 
            this.actionScrollPoint.moveJoinTxt.lineStart + (this.winInnerHeight*(2 * speed));
        this.actionScrollPoint.moveJoinTxt.txtStart = 
            this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd = 
            this.actionScrollPoint.moveJoinTxt.txtStart + (this.winInnerHeight*(2 * speed));
        this.actionScrollPoint.moveJoinTxt.posiStart = 
            this.actionScrollPoint.moveJoinTxt.txtEnd + (this.winInnerHeight*(.5 * speed));
        this.actionScrollPoint.heading.fadeInStart = 
            this.actionScrollPoint.moveJoinTxt.posiStart + (this.winInnerHeight*(.5 * speed));
        this.actionScrollPoint.heading.fadeInEnd = 
            this.actionScrollPoint.heading.fadeInStart + (this.winInnerHeight*(2 * speed));
        this.actionScrollPoint.heading.scaleStart = 
            this.actionScrollPoint.heading.fadeInEnd;
        this.actionScrollPoint.heading.scaleEnd = 
            this.actionScrollPoint.heading.scaleStart + (this.winInnerHeight*(1.5 * speed));
        this.actionScrollPoint.formArea.scaleStart = 
            this.actionScrollPoint.heading.scaleEnd - (this.winInnerHeight*(.5 * speed));
        this.actionScrollPoint.formArea.scaleEnd = 
            this.actionScrollPoint.formArea.scaleStart + (this.winInnerHeight*(1.5 * speed));
        this.actionScrollPoint.formArea.posiStart = 
            this.actionScrollPoint.formArea.scaleEnd + (this.winInnerHeight*(.5 * speed));
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
    fixedPosition(startScroll, endScroll, target){
        const CLASS_NAME_FIEXD = 'fixed';
        if(this.scrollBottom > startScroll && this.scrollBottom < endScroll){
            target.classList.add(CLASS_NAME_FIEXD);
        }else{
            target.classList.remove(CLASS_NAME_FIEXD);
        }
    },
    moveJoinLine(startScroll, endScroll){  
        const maxScaleXValue = 1;
        let scaleXValue = this.convertScrollToPercentage(startScroll, endScroll, maxScaleXValue, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            scaleXValue = 0;
        }else if(this.scrollBottom > endScroll){
            scaleXValue = maxScaleXValue;
        }

        if(!this.joinLine){
            document.location.reload();
        }else{
            this.joinLine.forEach(line => {
                line.style['transform'] = `scaleX(${scaleXValue})`;
            });
        }
    },
    setOpacity(startScroll, endScroll, minOpacity, maxOpacity){
        let opacityValue = this.convertScrollToPercentage(startScroll, endScroll, maxOpacity, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            opacityValue = minOpacity;
        }else if(this.scrollBottom > endScroll){
            opacityValue = maxOpacity;
        }

        return opacityValue;
    },
    moveJoinTxt(startScroll, endScroll) {
        const maxpositionValue = 100;
        
        let positionValue = maxpositionValue - this.convertScrollToPercentage(startScroll, endScroll, maxpositionValue, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            positionValue = maxpositionValue;
        }else if(this.scrollBottom > endScroll){
            positionValue = 0;
        }

        this.joinTxt01.style['transform'] = `translateX(${-positionValue}vw)`;
        this.joinTxt02.style['transform'] = `translateX(${positionValue}vw)`;

        const opacity = this.setOpacity(startScroll, endScroll, 0, 1);
        this.joinTxt.forEach(txt => {
            txt.style['opacity'] = opacity;
        });
    },
    moveEmboss(startScroll, endScroll){
        const opacity = this.setOpacity(startScroll, endScroll, 0, .6);
        const maxShadowSizeValue = .4;
        let shadowSizeValue = this.convertScrollToPercentage(startScroll, endScroll, maxShadowSizeValue, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            shadowSizeValue = 0;
        }else if(this.scrollBottom > endScroll){
            shadowSizeValue = maxShadowSizeValue;
        }
        
        this.contactSectionHeading.style['text-shadow'] = `0 0 ${shadowSizeValue}rem rgba(0, 0, 0, ${opacity})`;
    },
    extendScale(startScroll, endScroll, target, minScale, maxScale){
        let scaleValue = minScale + this.convertScrollToPercentage(startScroll, endScroll, maxScale, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            scaleValue = minScale;
        }else if(this.scrollBottom > endScroll){
            scaleValue = maxScale;
        }
        
        target.style['transform'] = `scale(${scaleValue})`;
    },
    setColorMono(startScroll, endScroll, target, minValue, maxValue){
        let ColorValue = maxValue - this.convertScrollToPercentage(startScroll, endScroll, maxValue, this.scrollBottom);

        if(this.scrollBottom < startScroll) {
            ColorValue = maxValue;
        }else if(this.scrollBottom > endScroll){
            ColorValue = minValue;
        }
        
        // target.style['background-color'] = `rgb(${ColorValue}, ${ColorValue}, ${ColorValue})`;
    },
    setDisplay(startScroll, endScroll, target, display){
        if(endScroll){
            if(this.scrollBottom > startScroll && this.scrollBottom < endScroll){
                target.style['display'] = display;
            }else{
                target.style['display'] = 'none';
            }
        }else{
            if(this.scrollBottom < startScroll) {
                target.style['display'] = 'none';
            }else{
                target.style['display'] = display;
            }
        }
    },
    scrollHandler(scrollBottom) {
        this.scrollBottom = scrollBottom;
        this.moveJoinLine(this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd);
        this.moveJoinTxt(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd);
        this.fixedPosition(this.actionScrollPoint.moveJoinTxt.showReady, this.actionScrollPoint.moveJoinTxt.posiStart, this.joinArea);
        this.setDisplay(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.scaleEnd, this.contactSectionHeading, 'flex')
        this.contactSectionHeading.style['opacity'] = 1 - this.setOpacity(this.actionScrollPoint.heading.fadeInEnd, this.actionScrollPoint.heading.scaleEnd, 0, 1);
        this.moveEmboss(this.actionScrollPoint.heading.fadeInStart, this.actionScrollPoint.heading.fadeInEnd);
        this.extendScale(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.heading.scaleEnd, this.contactSectionHeading, 1, 100);
        this.setDisplay(this.actionScrollPoint.formArea.scaleStart, '', this.formArea, 'flex');
        this.extendScale(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.scaleEnd, this.formArea, 0, 1);
        this.fixedPosition(this.actionScrollPoint.formArea.scaleStart, this.actionScrollPoint.formArea.posiStart, this.formArea);
        this.setColorMono(this.actionScrollPoint.heading.scaleStart, this.actionScrollPoint.formArea.posiStart, this.contactSection, 0, 255);
    }
};

// Contact Section의 form 태그 focus 효과
export const bindContactForm = () => {
    const contactFormTag = document.querySelectorAll('#contact-section input, textarea');
    const CLASS_NAME_ON = 'on';

    contactFormTag.forEach(formBox => {
        formBox.addEventListener('focus', function (e) {
            this.parentNode.querySelector('label').classList.add(CLASS_NAME_ON);
        });
        formBox.addEventListener('blur', function () {
            this.parentNode.querySelector('label').classList.remove(CLASS_NAME_ON);
        });
    });
};
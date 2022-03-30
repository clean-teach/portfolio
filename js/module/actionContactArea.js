import { getPercentage } from "../utils/utils.js";

export const motionContactAreaByScroll = {
    portfolioSection:  null,
    contactSection: null,
    contactSectionHeader: null,
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
        showHeader: {
            showReady: null,
            fadeInStart: null,
            fadeInEnd: null,
            posiStart: null,
        }
    },
    get(winInnerHeight){
    // 페이지의 모든 리소스가 로딩된 시점에서 가져올 정보들
        this.portfolioSection = document.querySelector('#portfolio-section');
        this.contactSection = document.querySelector
        ('#contact-section');
        this.contactSectionHeader = this.contactSection.querySelector('h2');
        this.joinArea = document.querySelector('.join-motion-txt-area');
        this.joinLine = this.joinArea.querySelectorAll('.line');
        this.joinTxt = this.joinArea.querySelectorAll('.txt');
        this.joinTxt01 = this.joinArea.querySelector('.txt01');
        this.joinTxt02 = this.joinArea.querySelector('.txt02');
        this.contactSectionHeight = this.contactSection.offsetHeight;
        this.portfolioSectionHeight = this.portfolioSection.offsetHeight;
        this.actionScrollPoint.moveJoinTxt.showReady = window.pageYOffset + this.portfolioSection.getBoundingClientRect().top + this.portfolioSectionHeight + (winInnerHeight);
        this.actionScrollPoint.moveJoinTxt.lineStart = this.actionScrollPoint.moveJoinTxt.showReady + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.lineEnd = this.actionScrollPoint.moveJoinTxt.lineStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.txtStart = this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd = this.actionScrollPoint.moveJoinTxt.txtStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.posiStart = window.pageYOffset + this.joinArea.getBoundingClientRect().top + (winInnerHeight/2);
        this.actionScrollPoint.showHeader.showReady = this.actionScrollPoint.moveJoinTxt.posiStart + (winInnerHeight/2);
        this.actionScrollPoint.showHeader.fadeInStart = this.actionScrollPoint.showHeader.showReady + (winInnerHeight/2);
        this.actionScrollPoint.showHeader.fadeInEnd = this.actionScrollPoint.showHeader.fadeInStart + (winInnerHeight/2);
        this.actionScrollPoint.showHeader.posiStart = window.pageYOffset + this.contactSectionHeader.getBoundingClientRect().top + winInnerHeight;
        
    },
    convertScrollToPercentage(scrollStart, scrollEnd, percentTotal, currentScroll){
    // 스크롤을 퍼센트 값으로 변환 시키는 함수
        if(currentScroll >= scrollStart && currentScroll <= scrollEnd){
            let percentage = getPercentage((currentScroll - scrollStart), (scrollEnd - scrollStart), percentTotal);

            return percentage;
        }
        return null;
    },
    rotateYForm(degree){
        contactSection.querySelector('.center-wrap').style['transform'] = `rotateY(${degree}deg)`;
    },
    fixedPosition(scrollBottom, target, fixedStart, fixedEnd){
        if(scrollBottom > fixedStart && scrollBottom < fixedEnd){
            target.classList.add('fixed');
        }else{
            target.classList.remove('fixed');
        }
    },
    moveJoinLine(scrollBottom){      
        let value = this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd, 1, scrollBottom);

        if(scrollBottom < this.actionScrollPoint.moveJoinTxt.lineStart) {
            value = 0;
        }else if(scrollBottom > this.actionScrollPoint.moveJoinTxt.lineEnd){
            value = 1;
        }

        this.joinLine.forEach(line => {
            line.style['transform'] = `scaleX(${value})`;
        });
    },
    moveJoinTxt(scrollBottom) {
        let opacityValue = this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd, 1, scrollBottom);
        let positionValue = 100 - this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd, 100, scrollBottom);

        if(scrollBottom < this.actionScrollPoint.moveJoinTxt.txtStart) {
            opacityValue = 0;
            positionValue = 100;
        }else if(scrollBottom > this.actionScrollPoint.moveJoinTxt.txtEnd){
            opacityValue = 1;
            positionValue = 0;
        }

        this.joinTxt01.style['transform'] = `translateX(${-positionValue}vw)`;
        this.joinTxt02.style['transform'] = `translateX(${positionValue}vw)`;
        this.joinTxt.forEach(txt => {
            txt.style['opacity'] = opacityValue;
        });
    },
    moveEmboss(scrollBottom, startScroll, endScroll){
        const opacityValueMax = .8;
        const shadowSizeValueMax = 1.6;
        let opacityValue = this.convertScrollToPercentage(startScroll, endScroll, opacityValueMax, scrollBottom);
        let shadowSizeValue = this.convertScrollToPercentage(startScroll, endScroll, shadowSizeValueMax, scrollBottom);

        if(scrollBottom < startScroll) {
            opacityValue = 0;
            shadowSizeValue = 0;
        }else if(scrollBottom > endScroll){
            opacityValue = opacityValueMax;
            shadowSizeValue = shadowSizeValueMax;
        }
        
        // console.log(opacityValue);
        this.contactSectionHeader.style['text-shadow'] = `0 0 ${shadowSizeValue}rem rgba(0, 0, 0, ${opacityValue})`;
    },
    scroll(scrollBottom) {
        this.moveJoinLine(scrollBottom);
        this.moveJoinTxt(scrollBottom);
        this.fixedPosition(scrollBottom, this.joinArea, this.actionScrollPoint.moveJoinTxt.showReady, this.actionScrollPoint.moveJoinTxt.posiStart);
        this.fixedPosition(scrollBottom, this.contactSectionHeader, this.actionScrollPoint.showHeader.showReady, this.actionScrollPoint.showHeader.posiStart);
        this.moveEmboss(scrollBottom, this.actionScrollPoint.showHeader.fadeInStart, this.actionScrollPoint.showHeader.fadeInEnd);
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
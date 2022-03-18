import { getPercentage } from "../utils/utils.js";

export const motionContactAreaByScroll = {
    portfolioSection:  null,
    contactSection: null,
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
        this.joinArea = document.querySelector('.join-motion-txt-area');
        this.joinLine = this.joinArea.querySelectorAll('.line');
        this.joinTxt = this.joinArea.querySelectorAll('.txt');
        this.joinTxt01 = this.joinArea.querySelector('.txt01');
        this.joinTxt02 = this.joinArea.querySelector('.txt02');
        this.contactSectionHeight = this.contactSection.offsetHeight;
        this.portfolioSectionHeight = this.portfolioSection.offsetHeight;
        this.actionScrollPoint.moveJoinTxt.showReady = window.pageYOffset + this.portfolioSection.getBoundingClientRect().top + this.portfolioSectionHeight + (winInnerHeight);
        this.actionScrollPoint.moveJoinTxt.lineStart = this.actionScrollPoint.moveJoinTxt.showReady + 10;
        this.actionScrollPoint.moveJoinTxt.lineEnd = this.actionScrollPoint.moveJoinTxt.lineStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.txtStart = this.actionScrollPoint.moveJoinTxt.lineEnd + 10;
        this.actionScrollPoint.moveJoinTxt.txtEnd = this.actionScrollPoint.moveJoinTxt.txtStart + (winInnerHeight/2);
        this.actionScrollPoint.moveJoinTxt.posiStart = this.actionScrollPoint.moveJoinTxt.txtEnd + (winInnerHeight/2);
    },
    convertScrollToPercentage(scrollStart, scrollEnd, percentTotal, currentScroll){
    // 스크롤을 퍼센트 값으로 변환 시키는 함수
        if(currentScroll >= scrollStart && currentScroll <= scrollEnd){
            let percentage = getPercentage((currentScroll - scrollStart), (scrollEnd - scrollStart), percentTotal);

            // console.log('current');
            // console.log(scrollEnd - currentScroll);
            // console.log('total');
            // console.log(scrollEnd - scrollStart);
            // console.log('percentTotal');
            // console.log(percentTotal);
            // console.log('percentage');
            // console.log(percentage);

            return percentage;
        }
        return 0;
    },
    rotateYForm(degree){
        contactSection.querySelector('.center-wrap').style['transform'] = `rotateY(${degree}deg)`;
    },
    actionJoinLine(scrollBottom){      
        const value = this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.lineStart, this.actionScrollPoint.moveJoinTxt.lineEnd, 1, scrollBottom);
        
        if(value){
            this.joinLine.forEach(line => {
                line.style['transform'] = `scaleX(${value})`;
            });
        }else{
            return
        }
    },
    moveJoinTxt(scrollBottom) {
        let positionValue = 100 - this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd, 100, scrollBottom);
        const opacityValue = this.convertScrollToPercentage(this.actionScrollPoint.moveJoinTxt.txtStart, this.actionScrollPoint.moveJoinTxt.txtEnd, 1, scrollBottom);

        if(scrollBottom > this.actionScrollPoint.moveJoinTxt.txtEnd) {
            positionValue = 0;
        }
                   
        if(positionValue || opacityValue){
            this.joinTxt01.style['transform'] = `translateX(${-positionValue}vw)`;
            this.joinTxt02.style['transform'] = `translateX(${positionValue}vw)`;
            this.joinTxt.forEach(txt => {
                txt.style['opacity'] = opacityValue;
            });
        }else{
            return
        }
    },
    scroll(scrollBottom) {
        this.actionJoinLine(scrollBottom);
        this.moveJoinTxt(scrollBottom);
        if(scrollBottom > this.actionScrollPoint.moveJoinTxt.posiStart){
            this.joinArea.style['position'] = 'relative';
        }else{
            this.joinArea.style['position'] = 'fixed';
        }
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
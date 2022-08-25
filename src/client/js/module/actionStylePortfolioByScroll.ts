import { getPercentage } from "../utils/utils";

// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
const portfolioSection = document.querySelector('#portfolio-section') as HTMLElement;
const portfolioTitle = document.querySelector('#portfolio-section>h2') as HTMLElement;
const categoryTab = portfolioSection.querySelector('.category-tab-wrap') as HTMLElement;
const portfolioListPc = document.querySelectorAll('.portfolio-list>li.motion.type-pc');
const portfolioListMob = document.querySelectorAll('.portfolio-list>li.motion.type-mobile');

const winHeightHalf = (window.innerHeight / 2);

export const activePortfolioByScroll = {
    titleMotion: {
        startPoint : portfolioSection.offsetTop + window.innerHeight,
        endPoint: portfolioSection.offsetTop + portfolioSection.scrollHeight,
        action(scrollBottom:number) {
            if(scrollBottom > this.startPoint && scrollBottom < this.endPoint){ 
                const parts = scrollBottom - this.startPoint;
                const whole = window.innerHeight;
                let opacityValue = 1 - getPercentage(parts, whole, 1);
                if(opacityValue < 0) {
                    opacityValue = 0;
                }
                portfolioTitle.style.opacity = String(opacityValue);
                portfolioTitle.classList.add('on');
            }else {
                portfolioTitle.classList.remove('on');
            }
        }
    },
    tabMotion: {
        elementRelativeTop: window.pageYOffset + categoryTab.getBoundingClientRect().top,
        endPoint: portfolioSection.offsetTop + portfolioSection.scrollHeight,
        action(scrollBottom:number) {
            if(scrollBottom - window.innerHeight > this.elementRelativeTop && scrollBottom < this.endPoint){
                categoryTab.classList.add('on');
            }else {
                categoryTab.classList.remove('on');
            }
        }
    },
    setImgActive: {
        pc(scrollBottom:number, i: number, arr: NodeListOf<Element>): void  {
            const target = arr[i].querySelector('.img-area');
            if(target){
                const CLASS_NAME_ON = 'on';
                let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;
                if (startPoint) {
                    target.classList.add(CLASS_NAME_ON);
                } else {
                    target.classList.remove(CLASS_NAME_ON);
                }
            }
        },
        mob(scrollBottom:number, i: number, arr: NodeListOf<Element>): void  {
            const mockup = arr[i].querySelector('.img-area');
            const scroll = arr[i].querySelector('.img-area .img-wrap');
            if(mockup){
                const CLASS_NAME_ON = 'on';
                let startPoint = window.pageYOffset + arr[i].getBoundingClientRect().top < scrollBottom;
                if (startPoint) {
                    mockup.classList.add(CLASS_NAME_ON);
                } else {
                    mockup.classList.remove(CLASS_NAME_ON);
                }
                // console.log(scroll);
            }
        },
    },
    setTxtActive:{
        pc(scrollBottom: number, i: number, arr: NodeListOf<Element>): void  {
            const currentElement = arr[i] as HTMLElement;
            const txtBox = currentElement.querySelector('.txt-area') as HTMLElement;
            if(txtBox){
                const CLASS_NAME_ON = 'on';
                // console.log(this);
                let
                    startPoint:boolean = scrollBottom - winHeightHalf > window.pageYOffset + currentElement.getBoundingClientRect().top,
                    endPoint:boolean = scrollBottom - winHeightHalf < window.pageYOffset + currentElement.getBoundingClientRect().top + currentElement.offsetHeight;
    
                if (startPoint && endPoint) {
                    txtBox.classList.add(CLASS_NAME_ON);
                } else {
                    txtBox.classList.remove(CLASS_NAME_ON);
                }
            }
        },
        mob(scrollBottom: number, i: number, arr: NodeListOf<Element>): void  {
            const currentElement = arr[i] as HTMLElement;
            const txtBox = currentElement.querySelector('.txt-area') as HTMLElement;
            if(txtBox){
                const CLASS_NAME_ON = 'on';
                // let
                //     startPoint:boolean = scrollBottom - this.winHeightHalf > window.pageYOffset + currentElement.getBoundingClientRect().top,
                //     endPoint:boolean = scrollBottom - this.winHeightHalf < window.pageYOffset + currentElement.getBoundingClientRect().top + currentElement.offsetHeight;
    
                // if (startPoint && endPoint) {
                //     txtBox.classList.add(CLASS_NAME_ON);
                // } else {
                //     txtBox.classList.remove(CLASS_NAME_ON);
                // }
            }
        },
    },
    action(scrollBottom: number): void {
        this.titleMotion.action(scrollBottom);
        this.tabMotion.action(scrollBottom);
        portfolioListPc.forEach((obj, i, arr) => {
            this.setImgActive.pc(scrollBottom, i, arr);
            this.setTxtActive.pc(scrollBottom, i, arr);
        });
        portfolioListMob.forEach((obj, i, arr) => {
            this.setImgActive.mob(scrollBottom, i, arr);
            this.setTxtActive.mob(scrollBottom, i, arr);
        });
    }
};
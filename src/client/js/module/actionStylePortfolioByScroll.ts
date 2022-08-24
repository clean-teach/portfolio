// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
const portfolioListPc = document.querySelectorAll('.portfolio-list>li.motion.type-pc');
const portfolioListMob = document.querySelectorAll('.portfolio-list>li.motion.type-mobile');

const winHeightHalf = (window.innerHeight / 2);

export const activePortfolioByScroll = {
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
                console.log(this);
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
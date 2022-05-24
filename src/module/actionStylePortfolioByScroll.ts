// 스크롤 이벤트에 따른 포트폴리오 영역 활성화
export const activePortfolioByScroll = {
    portfolioList: document.querySelectorAll('.portfolio-list>li'),
    winHeightHalf : (window.innerHeight / 2),
    setImgActive(scrollBottom:number, i: number, arr: NodeListOf<Element>): void  {
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
    setTxtActive(scrollBottom: number, i: number, arr: NodeListOf<Element>): void  {
        const currentElement = arr[i] as HTMLElement;
        const txtBox = currentElement.querySelector('.txt-area') as HTMLElement;
        if(txtBox){
            const CLASS_NAME_ON = 'on';
            let
                startPoint:boolean = scrollBottom - this.winHeightHalf > window.pageYOffset + currentElement.getBoundingClientRect().top,
                endPoint:boolean = scrollBottom - this.winHeightHalf < window.pageYOffset + currentElement.getBoundingClientRect().top + currentElement.offsetHeight;

            if (startPoint && endPoint) {
                txtBox.classList.add(CLASS_NAME_ON);
            } else {
                txtBox.classList.remove(CLASS_NAME_ON);
            }
        }
    },
    action(scrollBottom: number): void {
        this.portfolioList.forEach((obj, i, arr) => {
            this.setImgActive(scrollBottom, i, arr);
            this.setTxtActive(scrollBottom, i, arr);
        });
    }
};
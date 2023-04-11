import { getPercentage } from './utils/utils';

(function loadingPage() {
  const textFadeOutTime = 5000;
  const pageFadeOutTime = 7000;

  let loader: Element | HTMLElement;
  document.addEventListener('DOMContentLoaded', function () {
    loader = document.querySelector('#loading-area') as Element | HTMLElement;
    useLoadingBar.createLoadingBar(loader);
    useLoadingBar.playLoadingBar(pageFadeOutTime);
  });
  window.addEventListener('load', windowLoadHandler);

  function windowLoadHandler(): void {
    let opacity = Number(
      window.getComputedStyle(loader).getPropertyValue('opacity'),
    );

    window.scrollTo({ top: 0, left: 0 });

    setTimeout(function () {
      let fadeOut = setInterval(() => {
        if (opacity > 0) {
          opacity -= 0.01;
          loader.querySelectorAll('p').forEach((p) => {
            p.style.opacity = `${opacity}`;
          });
        } else {
          clearInterval(fadeOut);
        }
      }, 10);
    }, textFadeOutTime);
    setTimeout(function () {
      window.scrollTo({ top: 0, left: 0 });
      useLoadingBar.stopLoadingBar();
      loader.remove();
    }, pageFadeOutTime);
  }

  const useLoadingBar: {
    loadingBar: {
      element: any;
      color: string;
      weight: number;
    };
    actionLoadingBar: any;
    createLoadingBar: (parentElement: Element | HTMLElement) => void;
    playLoadingBar: (time: number) => void;
    stopLoadingBar: () => void;
  } = {
    loadingBar: {
      element: document.createElement('div'),
      color: '#ffffff',
      weight: 4,
    },
    actionLoadingBar: null,
    createLoadingBar(parentElement: Element | HTMLElement) {
      this.loadingBar.element.style.background = this.loadingBar.color;
      this.loadingBar.element.style.height = `${this.loadingBar.weight}px`;
      this.loadingBar.element.style.position = 'absolute';
      this.loadingBar.element.style.left = '0';
      this.loadingBar.element.style.top = '0';
      parentElement.prepend(this.loadingBar.element);
    },
    playLoadingBar(time: number) {
      let second = 0;
      this.actionLoadingBar = setInterval(() => {
        second += 10;
        this.loadingBar.element.style.width = `${getPercentage(
          second,
          time,
          100,
        )}%`;
      }, 10);
    },
    stopLoadingBar() {
      clearInterval(this.actionLoadingBar);
      this.actionLoadingBar = null;
    },
  };
})();

(function loadingPage() {
  const textFadeOutTime = 5000;
  const pageFadeOutTime = 7000;

  let loader: Element | HTMLElement;
  document.addEventListener('DOMContentLoaded', function () {
    loader = document.querySelector('#loader') as Element | HTMLElement;
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
      loader.remove();
    }, pageFadeOutTime);
  }
})();

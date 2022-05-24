import { getCurrentScrollBottomEnd } from "../utils/utils.js";
var footer = document.querySelector('footer');
var footerCard = footer.querySelector('.card');
var cardOffsetTop = footer.offsetTop + footerCard.offsetTop;
var footerCardInitialAngleValue = 90;
var sensitiveY = 20;
var sensitiveX = 10;
var direction = 1;
export function bindFooterCard() {
    var card = document.querySelector('footer .card');
    card.addEventListener('mousemove', twistCardHandler);
    card.addEventListener('mouseleave', returnToOriginStateCardHandler);
    card.querySelectorAll('a').forEach(function (a, i) {
        a.addEventListener('mouseenter', function () {
            hoverFootCardButton.enter(i);
        });
        a.addEventListener('focus', function () {
            hoverFootCardButton.enter(i);
            window.scrollTo(0, document.body.scrollHeight);
        });
        a.addEventListener('mouseleave', function () {
            hoverFootCardButton.leave(i);
        });
        a.addEventListener('blur', function () {
            hoverFootCardButton.leave(i);
        });
    });
    function twistCardHandler(event) {
        if (getCurrentScrollBottomEnd()) {
            this.style.transform = "\n                rotateY(".concat(direction * (window.innerWidth / 2 - event.x) / sensitiveY, "deg) \n                rotateX(").concat(direction * (window.innerHeight / 2 - event.y) / -sensitiveX, "deg)\n            ");
            this.style.transition = '0s';
        }
    }
    function returnToOriginStateCardHandler() {
        if (getCurrentScrollBottomEnd()) {
            this.style.transform = "rotateY(0deg) rotateX(0deg)";
            this.style.transition = '.4s';
        }
    }
    var hoverFootCardButton = {
        target: document.querySelector('footer .card-space'),
        ARR_CLASS_NAME: [
            'bg-mobile',
            'bg-email',
            'bg-git',
            'bg-notion'
        ],
        enter: function (i) {
            this.target.classList.add(this.ARR_CLASS_NAME[i]);
        },
        leave: function (i) {
            this.target.classList.remove(this.ARR_CLASS_NAME[i]);
        }
    };
}
export function rotateFooterCardByScoll(scrollBottom, winInnerHeight) {
    var pageScrollHeight = document.body.scrollHeight;
    var startPoint = pageScrollHeight - winInnerHeight;
    if (scrollBottom > startPoint) {
        var percentage = (scrollBottom - startPoint) / (pageScrollHeight - startPoint) * 90;
        footerCard.style.display = 'block';
        footerCard.style.transform = "rotateX(".concat(footerCardInitialAngleValue - percentage, "deg)");
        footerCard.style.transition = '0s';
    }
    else {
        footerCard.style.display = 'none';
    }
}
//# sourceMappingURL=actionStyleFooterCard.js.map
var clock = document.querySelector('#time-the-current-user-is-staying');
export function getCurrentClockTime() {
    var currentTime = new Date;
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    clock.innerText = "".concat(hours, " : ").concat(minutes, " : ").concat(seconds);
}
//# sourceMappingURL=clock.js.map
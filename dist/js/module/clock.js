import { padStart } from "../utils/utils.js";
export function checkTimeUserStay() {
    var firstVisitTime;
    var startClockTimer;
    resetTimer();
    function resetTimer() {
        firstVisitTime = new Date();
    }
    function paintingClock() {
        var clock = document.querySelector('#time-the-current-user-is-staying');
        var currentTime = new Date();
        var elapsedTimeMilliseconds = getElapsedTime(firstVisitTime, currentTime);
        var seconds = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).seconds();
        var minutes = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).minutes();
        var hours = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).hours();
        seconds = padStart(2, '0', String(seconds));
        minutes = padStart(2, '0', String(minutes));
        hours = padStart(2, '0', String(hours));
        clock.innerHTML = "\n            <p>\uBC8C\uC368 <span>".concat(hours, "</span>\uC2DC\uAC04 <span>").concat(minutes, "</span>\uBD84 <span>").concat(seconds, "</span>\uCD08 \uB3D9\uC548 \uAD00\uC2EC\uC744 \uBCF4\uC5EC\uC8FC\uC168\uC5B4\uC694!</p>\n            <p>\uC800\uC5D0 \uB300\uD574 \uB354\uC6B1 \uB9CE\uC740 \uAC83\uC744 \uC54C\uACE0 \uC2F6\uC73C\uC2DC\uBA74, <br />\n            \uC544\uB798 \uC5F0\uB77D\uCC98\uB85C \uC5F0\uB77D \uC8FC\uC138\uC694</p>\n            <p>\u2193</p>\n        ");
    }
    return {
        playClock: function () {
            startClockTimer = setInterval(paintingClock, 1000);
        },
        stopClock: function () {
            clearInterval(startClockTimer);
        }
    };
}
function getElapsedTime(oldTime, newTime) {
    var oldYear = oldTime.getFullYear();
    var oldMonth = oldTime.getMonth() + 1;
    var oldDay = oldTime.getDate();
    var oldHour = oldTime.getHours();
    var oldMinute = oldTime.getMinutes();
    var oldSecond = oldTime.getSeconds();
    var newYear = newTime.getFullYear();
    var newMonth = newTime.getMonth() + 1;
    var newDay = newTime.getDate();
    var newHour = newTime.getHours();
    var newMinute = newTime.getMinutes();
    var newSecond = newTime.getSeconds();
    var oldDate = new Date(oldYear, oldMonth, oldDay, oldHour, oldMinute, oldSecond);
    var newDate = new Date(newYear, newMonth, newDay, newHour, newMinute, newSecond);
    var elapsedTime = newDate.getTime() - oldDate.getTime();
    return elapsedTime;
}
function getHoursMinutesSecondsFromMilliseconds(milliseconds) {
    var hours = milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60);
    var minutes = milliseconds % (1000 * 60 * 60) / (1000 * 60);
    var seconds = milliseconds % (1000 * 60) / (1000);
    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);
    return {
        hours: function () {
            return hours;
        },
        minutes: function () {
            return minutes;
        }, seconds: function () {
            return seconds;
        }
    };
}
//# sourceMappingURL=clock.js.map
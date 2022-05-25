import { padStart } from "../utils/utils.js";

export function checkTimeUserStay() {
    let firstVisitTime:Date;
    let startClockTimer:number;

    resetTimer ();

    function resetTimer ():void {
        firstVisitTime = new Date();
    }
    
    function paintingClock ():void {
        const clock = document.querySelector('#time-the-current-user-is-staying') as HTMLElement;
        const currentTime = new Date();
        const elapsedTimeMilliseconds:number = getElapsedTime(firstVisitTime, currentTime);
        let seconds:number | string = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).seconds();
        let minutes:number | string = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).minutes();
        let hours:number | string = getHoursMinutesSecondsFromMilliseconds(elapsedTimeMilliseconds).hours();
        seconds = padStart(2, '0', String(seconds));
        minutes = padStart(2, '0', String(minutes));
        hours = padStart(2, '0', String(hours))  

        clock.innerHTML = `
            <p>벌써 <span>${hours}</span>시간 <span>${minutes}</span>분 <span>${seconds}</span>초 동안 관심을 보여주셨어요!</p>
            <p>저에 대해 더욱 많은 것을 알고 싶으시면, <br />
            아래 연락처로 연락 주세요</p>
            <p>↓</p>
        `;
    }
    
    return {
        playClock : function ():void {
            startClockTimer = setInterval(paintingClock, 1000);
        },
        stopClock : function ():void {
            clearInterval(startClockTimer)
        }
    }
}

function getElapsedTime(oldTime:any, newTime:Date):number {
    const oldYear = oldTime.getFullYear();
    const oldMonth = oldTime.getMonth() + 1;
    const oldDay = oldTime.getDate();
    const oldHour = oldTime.getHours();
    const oldMinute = oldTime.getMinutes();
    const oldSecond = oldTime.getSeconds();
    const newYear = newTime.getFullYear();
    const newMonth = newTime.getMonth() + 1;
    const newDay = newTime.getDate();
    const newHour = newTime.getHours();
    const newMinute = newTime.getMinutes();
    const newSecond = newTime.getSeconds();
    const oldDate = new Date(oldYear, oldMonth, oldDay, oldHour, oldMinute, oldSecond);
    const newDate = new Date(newYear, newMonth, newDay, newHour, newMinute, newSecond);
    const elapsedTime:number = newDate.getTime() - oldDate.getTime();
    return elapsedTime;
}

function getHoursMinutesSecondsFromMilliseconds(milliseconds:number) {
    let hours:number = milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60);
    let minutes:number = milliseconds % (1000 * 60 * 60) / (1000 * 60);
    let seconds:number = milliseconds % (1000 * 60) / (1000);

    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);

    return {
        hours: function ():number {
            return hours;
        }, 
        minutes: function ():number {
            return minutes;
        }, seconds: function ():number {
            return seconds;
        }
    }
}
const clock = document.querySelector('#time-the-current-user-is-staying') as HTMLElement;

export function getCurrentClockTime():void{
    const currentTime = new Date;
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    clock.innerText = `${hours} : ${minutes} : ${seconds}`;
}
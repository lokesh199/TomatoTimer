let countDown;
const timeLeft = document.querySelector('.displayTimeLeft');
timeLeft.textContent = '25:00';

const twentyFiveMinuteButton = document.querySelector('#twentyFiveMin');
twentyFiveMinuteButton.addEventListener('click' , () => {
    if(twentyFiveMinuteButton.textContent == 'RESET'){
        clearInterval(countDown);
        timeLeft.textContent = '00:00';
        twentyFiveMinuteButton.innerHTML = 'RESTART';
    }
    else if(twentyFiveMinuteButton.textContent == 'PAUSE'){
        clearInterval(countDown);
        twentyFiveMinuteButton.innerHTML = 'RESET';
    }
    else{
        pomodoroTimer(1500);
    }
})

function pomodoroTimer(seconds){
    const timeNow = Date.now();
    const timeThen = timeNow + seconds * 1000;
    displayTimeLeft(seconds);
    countDown = setInterval(() => {
        //We are using Date.now() again to get the exact time currently, because timeNow will contain outdated value
        const secondsLeft = Math.round((timeThen - Date.now())/1000);

        //To make sure that our timer doesn't go till negative
        if(secondsLeft==-1){
            clearInterval(countDown);
            twentyFiveMinuteButton.innerHTML = 'RESTART';
            return;
        }
        twentyFiveMinuteButton.innerHTML = 'PAUSE';
        displayTimeLeft(secondsLeft);

    } , 1000);
}
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds%60;
    const display = `${minutes < 10 ? '0' :''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    //const display = `${minutes}:${remainingSeconds < 10 ? '0' : '' }${remainingSeconds}`;
    document.title = display;
    timeLeft.textContent = display;
    console.log({minutes , remainingSeconds});
}

function playSound(url){
    var sound = new Audio(url);
    sound.play();
}

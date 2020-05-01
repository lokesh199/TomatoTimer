let countDown, modeSelected;
let timeLeft = document.querySelector('.displayTimeLeft');
let isPaused = true;
let isTimerSelected = false;
timeLeft.textContent = 'Select a Timer';

function changedTheMode() {
    isPaused = true;
    isTimerSelected = true;
}

const beastMode = document.querySelector('#mostProductive');
beastMode.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "45:00";
    modeSelected = "beast";
});

const pomodoro = document.querySelector('#pomodoroTimer');
pomodoro.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "25:00";
    modeSelected = "pomodoro";
})

const shortBreak = document.querySelector('#shortBreak');
shortBreak.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "5:00";
    modeSelected = "short-break";
});

const longBreak = document.querySelector('#longBreak');
longBreak.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "15:00";
    modeSelected = "long-break";
})

// const customTimer = document.querySelector('#customTimer');

function stringToSeconds(s) {
    let temp = s.split(':');
    let minutes, seconds;
    if (temp.length == 2) {
        minutes = parseInt(temp[0], 10);
        seconds = parseInt(temp[1], 10) + minutes * 60;
    }
    return seconds;
}

const startTimer = document.querySelector('#start');
startTimer.addEventListener('click', () => {
    if (isPaused === true) {
        if (isTimerSelected === true) {
            isPaused = false;
            let totalSeconds = timeLeft.textContent;
            totalSeconds = stringToSeconds(totalSeconds)
            timer(totalSeconds);
        }
        else {
            alert("Select a Timer First!");
        }
    }
});

const pauseTimer = document.querySelector('#pause');
pauseTimer.addEventListener('click', () => {
    if (isPaused === false) {
        isPaused = true;
        console.log('paused');
        clearInterval(countDown);
    }
});

const resetTimer = document.querySelector('#reset');
resetTimer.addEventListener('click', () => {
    isPaused = true;
    console.log('reset done');
    clearInterval(countDown);
    if (modeSelected === "beast") {
        timeLeft.textContent = "45:00";
    }
    else if (modeSelected === "pomodoro") {
        timeLeft.textContent = "25:00";
    }
    else if (modeSelected === "short-break") {
        timeLeft.textContent = "5:00";
    }
    else if (modeSelected === "long-break") {
        timeLeft.textContent = "15:00";
    }
    // else if (modeSelected === "custom")
    // {

    // }
})

// const twentyFiveMinuteButton = document.querySelector('#twentyFiveMin');
// twentyFiveMinuteButton.addEventListener('click', () => {
//     if (twentyFiveMinuteButton.textContent == 'RESET') {
//         clearInterval(countDown);
//         timeLeft.textContent = '00:00';
//         twentyFiveMinuteButton.innerHTML = 'RESTART';
//     }
//     else if (twentyFiveMinuteButton.textContent == 'PAUSE') {
//         clearInterval(countDown);
//         twentyFiveMinuteButton.innerHTML = 'RESET';
//     }
//     else {
//         pomodoroTimer(1500);
//     }
// })

function timer(seconds) {
    const timeThen = Date.now() + seconds * 1000;
    countDown = setInterval(() => {
        //We are using Date.now() again to get the exact time currently, because timeNow will contain outdated value
        const secondsLeft = Math.round((timeThen - Date.now()) / 1000);

        //To make sure that our timer doesn't go till negative
        if (secondsLeft <= -1) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);

    }, 1000);
}
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds}`;
    // const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.title = display;
    timeLeft.textContent = display;
    console.log({ minutes, remainingSeconds });
}

// function playSound(url) {
//     var sound = new Audio(url);
//     sound.play();
// }
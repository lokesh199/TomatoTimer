let countDown, modeSelected;
let timeLeft = document.querySelector('.displayTimeLeft');
let isPaused = true;
let isTimerSelected = false;
timeLeft.textContent = 'Select a Timer';

function changedTheMode() {
    isPaused = true;
    isTimerSelected = true;
}

let closeButton = document.querySelector('#close-button');
closeButton.addEventListener('click', () => {
    document.querySelector('#darker-background').style.display = "none";
})

function customTimerSet() {
    modeSelected = "custom-timer";
    let hours = document.getElementById('hours').value;
    let minutes = document.getElementById('minutes').value;
    let seconds = document.getElementById('seconds').value;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);
    if (isNaN(hours)) {
        hours = 0;
    }
    if (isNaN(minutes)) {
        minutes = 0;
    }
    if (isNaN(seconds)) {
        seconds = 0;
    }
    console.log(hours, minutes, seconds);
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    timeLeft.textContent = ""
    if (hours > 0) {
        timeLeft.textContent += `${hours}`;
        if (minutes > 9) {
            timeLeft.textContent += `:${minutes}`;
            if (seconds > 0) {
                timeLeft.textContent += `:${seconds}`;
            }
            else {
                timeLeft.textContent += `:00`;
            }
        }
        else {
            if (minutes > 0) {
                timeLeft.textContent += `:0${minutes}`;
                if (seconds > 9) {
                    timeLeft.textContent += `:${seconds}`;
                }
                else {
                    timeLeft.textContent += `:0${seconds}`;
                }
            }
            else {
                timeLeft.textContent += `00`;
                if (seconds > 9) {
                    timeLeft.textContent += `:${seconds}`;
                }
                else {
                    timeLeft.textContent += `:0${seconds}`;
                }
            }
        }
    }
    else if (minutes > 9) {
        timeLeft.textContent += `${minutes}`;
        if (seconds > 9) {
            timeLeft.textContent += `:${seconds}`;
        }
        else {
            timeLeft.textContent += `:0${seconds}`;
        }
    }
    else if (minutes > 0) {
        timeLeft.textContent += `0${minutes}`;
        if (seconds > 9) {
            timeLeft.textContent += `:${seconds}`;
        }
        else {
            timeLeft.textContent += `:0${seconds}`;
        }
    }
    else {
        timeLeft.textContent += `${seconds}`;
    }
    document.title = timeLeft.textContent;
    document.getElementById('darker-background').style.display = "none";
    console.log(timeLeft.textContent);
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
    document.title = "25:00";
    modeSelected = "pomodoro";
})

const shortBreak = document.querySelector('#shortBreak');
shortBreak.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "5:00";
    document.title = "5:00";
    modeSelected = "short-break";
});

const longBreak = document.querySelector('#longBreak');
longBreak.addEventListener('click', () => {
    changedTheMode();
    clearInterval(countDown);
    timeLeft.textContent = "15:00";
    document.title = "15:00";
    modeSelected = "long-break";
})

const customTimer = document.querySelector('#customTimer');
customTimer.addEventListener('click', () => {
    document.getElementById("darker-background").style.display = "flex";
    clearInterval(countDown);
    changedTheMode();
})

function stringToSeconds(s) {
    let temp = s.split(':');
    let hours, minutes, seconds;
    if (temp.length == 2) {
        minutes = parseInt(temp[0], 10);
        seconds = parseInt(temp[1], 10) + minutes * 60;
    }
    else if (temp.length == 3) {

        hours = parseInt(temp[0], 10);
        minutes = parseInt(temp[1], 10) + hours * 60;
        seconds = parseInt(temp[2], 10) + minutes * 60;
    }
    else if (temp.length == 1) {
        seconds = parseInt(temp, 10);
    }
    console.log('hi');
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
    else if (modeSelected === "custom-timer") {
        customTimerSet();
    }
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
    console.log(seconds);
    const timeThen = Date.now() + seconds * 1000;
    countDown = setInterval(() => {
        //We are using Date.now() again to get the exact time currently, because timeNow will contain outdated value
        const secondsLeft = Math.round((timeThen - Date.now()) / 1000);

        //To make sure that our timer doesn't go till negative
        if (secondsLeft <= -1) {
            clearInterval(countDown);
            return;
        }
        console.log(secondsLeft);
        displayTimeLeft(secondsLeft);
    }, 1000);
}
function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = seconds % 60;
    let display = '';
    if (hours > 0) {
        display += `${hours}`;
        if (minutes > 9) {
            display += `:${minutes}`;
            if (seconds > 9) {
                display += `:${seconds}`;
            }
            else {
                display += `:0${seconds}`;
            }
        }
        else {
            display += `:0${minutes}`;
            if (seconds > 9) {
                display += `:${seconds}`;
            }
            else {
                display += `:0${seconds}`;
            }
        }
    }
    else {
        if (minutes > 9) {
            display += `${minutes}`;
            if (seconds > 9) {
                display += `:${seconds}`;
            }
            else {
                display += `:0${seconds}`;
            }
        }
        else {
            if (minutes > 0) {
                display += `${minutes}`;
                if (seconds > 9) {
                    display += `:${seconds}`;
                }
                else {
                    if (seconds > 0) {
                        display += `:0${seconds}`;
                    }
                    else {
                        display += `:${seconds}`;
                    }
                }
            }
            else {
                display += `${seconds}`;
            }
        }
    }
    document.title = display;
    timeLeft.textContent = display;
    console.log({ hours, minutes, seconds });

}
// function playSound(url) {
//     var sound = new Audio(url);
//     sound.play();
// }
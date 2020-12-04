const borderBox = document.querySelector(".test-wrapper");
const inputText = document.querySelector("#test-area");
var givenText = document.querySelector('#para').innerHTML;
const resetButton = document.querySelector("#reset");
const timeCounter = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

function leadingZero(time){
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Add leading zero to numbers 9 or below (purely for aesthetics):

// Run a standard minute/second/hundredths timer:
function runTimer(){
    var currentTime = timer[0] + ':' + leadingZero(timer[1]) +':'+ leadingZero(timer[2]);
    timeCounter.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor((timer[3] - (timer[1]*100) - timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellcheck(){
    let textEntered = inputText.value;
    // console.log(textEntered);
    let oneByOneTextMatch = givenText.substring(0,textEntered.length);
    if(textEntered == givenText && !timerRunning){
        timerRunning = true;
        clearInterval(interval);
        borderBox.style.borderColor = "green";
    }
    else{
        if(textEntered == oneByOneTextMatch){
            borderBox.style.borderColor = "green";
        }
        else{
            borderBox.style.borderColor = "red";
        }
    }
}

// Start the timer:
function start(){
    let inputLength = inputText.value.length;
    console.log(inputLength);
    if(inputLength === 0){
        interval = setInterval(runTimer , 10)
    }
    
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    inputText.value = '';
    timeCounter.innerHTML = "00:00:00";
    borderBox.style.borderColor = "green";  
}

// Event listeners for keyboard input and the reset button:
inputText.addEventListener('keypress', start, false);
inputText.addEventListener('keyup', spellcheck, false);
resetButton.addEventListener('click', reset, false);
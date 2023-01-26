// dom elements
const inputEl = document.getElementById("input")
const inputTextPastedEl = document.getElementById("text")
const wordScreenEl = document.querySelector(".letter");
const resetBtn = document.querySelector('.reset-btn')
const startBtn = document.querySelector('.start-btn')
const timerEl = document.getElementById('timer')
let Highest_Score = document.getElementById('Highest_Score')
const span = document.getElementsByTagName('span'); // get all spans , it will used in handleInputChange function

// variables declration
let counter = 0;
let timer = 0;
let timerInterval;

// all event listners
inputEl.addEventListener('keyup', (e) => handleInputChange(e))
startBtn.addEventListener('click', () => handleStart())
resetBtn.addEventListener('click', () => handleReset())
inputTextPastedEl.addEventListener('input', (e) => handlePastedEl(e))


// handle pasted text display
const handlePastedEl = (e) => {
    if (e.target.value.length >= 20) {
        inputTextPastedEl.style.opacity = ".1"
        inputTextPastedEl.disabled = true // disaple input after paste
        const lettersArr = e.target.value.split("")
        lettersArr.forEach(letter => { // loop over text to push every letter in seperate span tag 
            const span = document.createElement("span");
            span.innerHTML = letter
            wordScreenEl.appendChild(span)
        })
    }
    else {
        inputTextPastedEl.style.opacity = "1" // style issu
    }
}


// handle my input
inputEl.disabled = true; // disable input by default
inputEl.onpaste = e => e.preventDefault(); // prevent paste in input filed
const handleInputChange = (e) => {
    let inputVal = e.target.value
    if (inputVal[counter] === wordScreenEl.innerText[counter]) {
        span[counter].classList.add('active') // add active class if letter is correct
        counter++; // increase counter to next letter
    }
    finish(); // if all text is finished
}
// handle finish successfully
const finish = () => {

    if (span[span.length - 1].classList.contains('active')) { // get last span to check end of text
        inputEl.disabled = true; // disable typing untill start first
        setTimeout(() => { // wait last letter to be green then alert success
            clearInterval(timerInterval)
            alert(`good work you finished in ${timer}`)
        }, 10);
    }
}


// handle start
const handleStart = () => {
    if (inputTextPastedEl.value.length < 20) {
        alert('must be greater than 20 letters')
    }
    else {
        inputEl.disabled = false;
        startBtn.disabled = true;
        inputEl.focus() // auto focus on input after start
        inputEl.style.background = "#181D31"
        startBtn.style.background = "gray"
        startBtn.innerText = "Statred"
        timerInterval = setInterval(() => {
            timerEl.innerHTML = timer
            timer++
        }, 1000);
    }
}

// handle resetting
const handleReset = () => {
    wordScreenEl.innerHTML = ""
    inputTextPastedEl.value = ""
    inputEl.value = ""
    inputTextPastedEl.style.opacity = "1"
    inputTextPastedEl.disabled = false
    startBtn.disabled = false;
    inputEl.disabled = true; // disable typing untill start first
    inputEl.style.background = "#000"
    startBtn.style.background = "darkgreen"
    startBtn.innerText = "Start"
    timerEl.innerHTML = ""
    clearInterval(timerInterval)
    counter = 0
    timer = 0
}



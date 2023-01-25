const inputEl = document.getElementById("input")
const inputTextPastedEl = document.getElementById("text")
const wordScreenEl = document.querySelector(".letter");
const resetBtn = document.querySelector('.reset-btn')

let counter =0;

// handle pasted text display
inputTextPastedEl.addEventListener('input',(e)=>{
    if( e.target.value.length >= 20 ){
        inputTextPastedEl.style.opacity=".1"
        inputTextPastedEl.disabled=true // disaple paste after first one 
        const lettersArr = e.target.value.split("")
        lettersArr.forEach(letter=>{ // loop over text to push every letter in seperate span tag 
            const span = document.createElement("span");
            span.innerHTML = letter
            wordScreenEl.appendChild(span)
        })
    }
    else{
        inputTextPastedEl.style.opacity="1" // style issu
    }
})

// handle resetting
const reset = ()=>{
    wordScreenEl.innerHTML = ""
    inputTextPastedEl.value= ""
    inputEl.value= ""
    inputTextPastedEl.style.opacity="1"
    inputTextPastedEl.disabled=false
    counter= 0
}

// handle my input

let span = document.getElementsByTagName('span'); // get all spans
const handleInputChange= (e)=>{
   let inputVal = e.target.value
   if(inputVal[counter] === wordScreenEl.innerText[counter]){
    span[counter].classList.add('active') // add active class if letter is correct
    counter++; // increase counter to next letter
   }
   if( span[span.length-1].classList.contains('active')){ // get last span to check end of text
    setTimeout(() => { // wait last letter to be green then alert success
        alert('good work you win') 
    }, 100);
   }
   
}

inputEl.addEventListener('keyup',(e)=>handleInputChange(e))

inputEl.onpaste = e => e.preventDefault(); // prevent paste in input filed

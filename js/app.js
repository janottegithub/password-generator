// DOM elements
const resultsEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


// Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;


   resultsEl.innerText = generatePassword(
       hasLower, 
       hasUpper, 
       hasNumber, 
       hasSymbol, 
       length
    );
});

const randomFunc ={
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultsEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!')
})

//generate password function
function generatePassword(lower, upper, number, symbol, length){
    //1. initialize a password variable
    //2. Filter out unchecked types
    //3. Loop over length call generator function for each type
    //4. Add final pw to the pw var and return

    let generatePassword = '';

    const typesCount = lower + upper + number + symbol;
    //console.log('typesCount: ', typesCount);

    const typesArr = [{upper}, {lower}, {number}, {symbol}]
    .filter(
        item => Object.values(item)[0]
        );

    //console.log('typesArr: ', typesArr);

    if(typesCount === 0){
       return ''; 
    }

    for(let i = 0; i < length; i +=typesCount){
        typesArr.forEach(type =>{
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName)
            generatePassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatePassword.slice(0, length);
    return finalPassword; 
}

//Generate functions

function getRandomLower(){
 return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()[]=<>/,.';
    return symbols[Math.floor(Math.random() *symbols.length)];
}
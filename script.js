/* -- VARIABILI GLOBALI -- */

// Riferimenti al DOM:
const inputContainerEl = document.querySelector('.input-fields-container');
const inputElFirst = document.querySelector('.input.input-1');
const inputElSecond = document.querySelector('.input.input-2');
const btnEl = document.querySelector('.btn');
const errorContainerEl = document.querySelector('.error-container');
const spinnerEl = document.querySelector('.spinner-container');
const japaneseContainerEl = document.querySelector('.japanese-container');
const japaneseMultiplicationEl = document.querySelector('.japanese-multiplication');
let numberInputFirst;
let numberInputSecond 
// Questa funzione decide se abilitare il pulsante Button o no in base al controllo fatto sui valori degli input immessi
function enableBtnEl() {
    numberInputFirst = Number(inputElFirst.value);
    numberInputSecond = Number(inputElSecond.value);
    console.log(numberInputFirst, numberInputSecond);

    if (inputElFirst.value.trim() !== '' && inputElSecond.value.trim() !== '') {
        errorContainerEl.innerHTML = '';
        btnEl.disabled = false;
        if (!Number.isInteger(numberInputFirst)){
            printError('Inserire nel PRIMO campo un numero INTERO', true);
        }
       
            

        if (!Number.isInteger(numberInputSecond)){
            printError('Inserire nel SECONDO campo un numero INTERO',true);

        }
            

        if (!(numberInputFirst >= 0 && numberInputFirst < 100)){
            printError('Inserire nel PRIMO campo un numero compreso tra 0 e 99',true);

        }
            

        if (!(numberInputSecond >= 0 && numberInputSecond < 100)){
            printError('Inserire nel SECONDO campo un numero compreso tra 0 e 99',true);

        }
            
    } else {
       printError('',false) 
    }
}


inputElFirst.addEventListener('input', enableBtnEl);
inputElSecond.addEventListener('input', enableBtnEl);




// Questa funziona accetta una stringa in base al tipo di errore degli input, stampa l'errore e disabilita il button
printError = (messageError, flag) => {
    errorContainerEl.innerHTML = '';
    btnEl.disabled = true;
    if(flag){
       let errorEl = document.createElement('p');
    errorEl.classList.add('error-message')
    errorEl.innerText = `${messageError}`;
    errorEl.style.display = 'block';
    errorContainerEl.append(errorEl);  
    }
}

btnEl.addEventListener('click', ()=>{
    japaneseMultiplicationEl.innerText ='';
    inputElFirst.value = '';
    inputElSecond.value = '';
    spinnerShow()
})


function spinnerShow(){
    spinnerEl.classList.add('d-flex')
    setTimeout(()=>{
        spinnerEl.classList.add('d-none')
        printJapaneseVisualMultiplication()
        btnEl.disabled = true;
    },1000)
    
}

function tensAndUnit(numberInput){
const tens = Math.floor(numberInput/10);
const units = numberInput%10;
return {tens,units}
}


function printJapaneseVisualMultiplication(){
    japaneseContainerEl.style.display = 'flex'
    console.log('Primo numero: '+numberInputFirst)
    console.log(tensAndUnit(numberInputFirst))
    console.log('Secondo numero: '+numberInputSecond)
    console.log(tensAndUnit(numberInputSecond))
printMoltiplication()

}

printMoltiplication = () => {
    let multiplicationParagraph = document.createElement('p');

  
    let inputFirstTens = tensAndUnit(numberInputFirst).tens;
   

    let inputFirstUnits = tensAndUnit(numberInputFirst).units;
 

    let inputSecondTens = tensAndUnit(numberInputSecond).tens;


    let inputSecondUnits = tensAndUnit(numberInputSecond).units;


    multiplicationParagraph.innerHTML = `
    
    <span class="tens-first-multiplicand">${inputFirstTens === 0 ? '' : inputFirstTens}</span>
    <span class="units-first-multiplicand">${inputFirstUnits}</span>
    <span>✖️</span>
    <span class="tens-second-multiplicand">${inputSecondTens === 0 ? '' : inputSecondTens}</span>
    <span class="units-second-multiplicand">${inputSecondUnits}</span>
<span>🟰</span> ${numberInputFirst*numberInputSecond}

    
    `

    japaneseContainerEl.appendChild(multiplicationParagraph);
}

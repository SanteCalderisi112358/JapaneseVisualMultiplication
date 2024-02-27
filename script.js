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
const japaneseBoxEl = document.querySelector('.japanese-box')
let numberInputFirst;
let numberInputSecond;

let isTensFirstInput;
let isTensSecondInput;
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
    japaneseBoxEl.innerText ='';
    japaneseMultiplicationEl.innerText ='';
    inputElFirst.value = '';
    inputElSecond.value = '';
    spinnerShow()
})


function spinnerShow(){
    spinnerEl.classList.remove('d-none')
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


function printJapaneseVisualMultiplication() {
    japaneseContainerEl.style.display = 'flex';
    const firstInput = tensAndUnit(numberInputFirst);
    const secondInput = tensAndUnit(numberInputSecond);
    isTensFirstInput = firstInput.tens===0?false:true
    isTensSecondInput = secondInput.tens===0?false:true
    printMoltiplication(firstInput, secondInput);
    printParallelLine(firstInput.tens, 'left', 'line-tens-first-multiplicand',isTensFirstInput);
    printParallelLine(firstInput.units, 'right', 'line-units-first-multiplicand',isTensFirstInput);
    printParallelLine(secondInput.tens, 'top', 'line-tens-second-multiplicand',isTensSecondInput);
    printParallelLine(secondInput.units, 'bottom', 'line-units-second-multiplicand',isTensSecondInput);
}


function printMoltiplication(firstInput, secondInput) {
    let multiplicationParagraph = document.createElement('p');
    multiplicationParagraph.innerHTML = `
        <span class="tens-first-multiplicand">${firstInput.tens === 0 ? '' : firstInput.tens}</span>
        <span class="units-first-multiplicand">${firstInput.units}</span>
        <span>✖️</span>
        <span class="tens-second-multiplicand">${secondInput.tens === 0 ? '' : secondInput.tens}</span>
        <span class="units-second-multiplicand">${secondInput.units}</span>
        <span>🟰</span> ${numberInputFirst * numberInputSecond}
    `;
    japaneseMultiplicationEl.appendChild(multiplicationParagraph);
}

printParallelLine =(number,direction,lineClass,isThereTens)=>{
for(i=0;i<number;i++){
    let line = document.createElement('div');
    line.classList.add(`${lineClass}`)
    if(isThereTens)
    line.style[`${direction}`] = `${(20+i*10)/number}%`
else line.style[`${direction}`] = `${((50-number)+i*10)}%`
    japaneseBoxEl.appendChild(line)
}
}
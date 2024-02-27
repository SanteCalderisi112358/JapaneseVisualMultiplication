/* -- VARIABILI GLOBALI -- */

// Riferimenti al DOM:
const inputContainerEl = document.querySelector('.input-fields-container');
const inputElFirst = document.querySelector('.input.input-1');
const inputElSecond = document.querySelector('.input.input-2');
const btnEl = document.querySelector('.btn');
const errorContainerEl = document.querySelector('.error-container')
// Questa funzione decide se abilitare il pulsante Button o no in base al controllo fatto sui valori degli input immessi
// function enableBtnEl() {
//     // Verifica se entrambi i campi di input contengono valori e se sono entrambi numeri interi compresi tra 0 e 99
//     // if (Number.isInteger(parseInt(inputElFirst.value.trim(), 10)) && 
//     //     Number.isInteger(parseInt(inputElSecond.value.trim(), 10)) && 
//     //     parseInt(inputElFirst.value.trim(), 10) >= 0 && 
//     //     parseInt(inputElFirst.value.trim(), 10) <= 99 && 
//     //     parseInt(inputElSecond.value.trim(), 10) >= 0 && 
//     //     parseInt(inputElSecond.value.trim(), 10) <= 99) {
//     //     // Abilita il pulsante se entrambi i campi sono compilati correttamente
//     //     btnEl.disabled = false;
//     //     printError('');
//     // } else {
//     //     // Disabilita il pulsante se uno o entrambi i campi non sono compilati correttamente
//     //     btnEl.disabled = true;
//     //     // Stampa un messaggio di errore appropriato
//     //     if (!Number.isInteger(parseInt(inputElFirst.value.trim(), 10)) || 
//     //         parseInt(inputElFirst.value.trim(), 10) < 0 || 
//     //         parseInt(inputElFirst.value.trim(), 10) > 99) {
//     //         printError('Il primo campo deve essere un numero intero compreso tra 0 e 99');
//     //     } else {
//     //         printError('Il secondo campo deve essere un numero intero compreso tra 0 e 99');
//     //     }
//     // }
//     let numberInputFirst = Number(inputElFirst.value)
//     let numberInputSecond = Number(inputElSecond.value)
//     console.log(numberInputFirst, numberInputSecond)
//     if(inputElFirst.value.trim() !== '' && inputElSecond.value.trim() !== ''){
// if (!Number.isInteger(numberInputFirst))
//         printError('Inserire nel PRIMO campo un numero INTERO')

//     if (!Number.isInteger(numberInputSecond))
//         printError('Inserire nel SECONDO campo un numero INTERO')

//     if (!numberInputFirst >= 0 && !numberInputFirst < 100)
//         printError('Inserire nel PRIMO campo un numero compreso tra 0 e 100')
//     if (!numberInputSecond >= 0 && !numberInputSecond < 100)
//         printError('Inserire nel SECONDO campo un numero compreso tra 0 e 100')

//     }else{
//         errorContainerEl.innerHTML = '';
//         btnEl.disabled = false;
//     }
    
        

// }

function enableBtnEl() {
    let numberInputFirst = Number(inputElFirst.value);
    let numberInputSecond = Number(inputElSecond.value);
    console.log(numberInputFirst, numberInputSecond);

    if (inputElFirst.value.trim() !== '' && inputElSecond.value.trim() !== '') {
        errorContainerEl.innerHTML = ''; // Rimuovi eventuali messaggi di errore precedenti
        btnEl.disabled = false; // Abilita il pulsante
        if (!Number.isInteger(numberInputFirst)){
            printError('Inserire nel PRIMO campo un numero INTERO');
        }
        if (!Number.isInteger(numberInputFirst)){
            printError('Inserire nel PRIMO campo un numero INTERO');
        }
            

        if (!Number.isInteger(numberInputSecond)){
            printError('Inserire nel SECONDO campo un numero INTERO');

        }
            

        if (!(numberInputFirst >= 0 && numberInputFirst < 100)){
            printError('Inserire nel PRIMO campo un numero compreso tra 0 e 99');

        }
            

        if (!(numberInputSecond >= 0 && numberInputSecond < 100)){
            printError('Inserire nel SECONDO campo un numero compreso tra 0 e 99');

        }
            
    } else {
        errorContainerEl.innerHTML = ''; 
        btnEl.disabled = true; 
    }
}


inputElFirst.addEventListener('input', enableBtnEl);
inputElSecond.addEventListener('input', enableBtnEl);




// Questa funziona accetta una stringa in base al tipo di errore degli input, stampa l'errore e disabilita il button
printError = (messageError) => {
    errorContainerEl.innerHTML = '';
    let errorEl = document.createElement('p');
    errorEl.classList.add('error-message')
    errorEl.innerText = `${messageError}`;
    errorEl.style.display = 'block';
    errorContainerEl.append(errorEl);
    btnEl.disabled = true;


}
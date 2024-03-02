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

let areTensFirstInput;
let areTensSecondInput;

let areUnitsFirstInput;
let areUnitsSecondInput;

let areTensBothInput;
let areUnitsBothInput;

let areBothUnitsAndTens;
let intersection = [];
// Questa funzione decide se abilitare il pulsante Button o no in base al controllo fatto sui valori degli input immessi
function enableBtnEl() {
    numberInputFirst = Number(inputElFirst.value);
    numberInputSecond = Number(inputElSecond.value);
    console.log(numberInputFirst, numberInputSecond);

    if (inputElFirst.value.trim() !== '' && inputElSecond.value.trim() !== '') {
        errorContainerEl.innerHTML = '';
        btnEl.disabled = false;
        if (!Number.isInteger(numberInputFirst)) {
            printError('Inserire nel PRIMO campo un numero INTERO', true);
        }



        if (!Number.isInteger(numberInputSecond)) {
            printError('Inserire nel SECONDO campo un numero INTERO', true);

        }


        if (!(numberInputFirst >= 0 && numberInputFirst <= 100)) {
            printError('Inserire nel PRIMO campo un numero compreso tra 0 e 100', true);

        }


        if (!(numberInputSecond >= 0 && numberInputSecond <= 100)) {
            printError('Inserire nel SECONDO campo un numero compreso tra 0 e 100', true);

        }

    } else {
        printError('', false)
    }


}


inputElFirst.addEventListener('input', enableBtnEl);
inputElSecond.addEventListener('input', enableBtnEl);




// Questa funziona accetta una stringa in base al tipo di errore degli input, stampa l'errore e disabilita il button
printError = (messageError, flag) => {
    errorContainerEl.innerHTML = '';
    btnEl.disabled = true;
    if (flag) {
        let errorEl = document.createElement('p');
        errorEl.classList.add('error-message')
        errorEl.innerText = `${messageError}`;
        errorEl.style.display = 'block';
        errorContainerEl.append(errorEl);
    }
}

btnEl.addEventListener('click', () => {
    intersection = []

    const curves = document.querySelectorAll('.curved');
    curves.forEach(curve => curve.style.display = 'none')
    japaneseBoxEl.style.transform = 'rotate(0deg)'
    japaneseBoxEl.innerText = '';
    japaneseMultiplicationEl.innerText = '';
    inputElFirst.value = '';
    inputElSecond.value = '';
    document.querySelector('main').style.marginTop = '500px'
    spinnerShow()
})


function spinnerShow() {
    spinnerEl.classList.remove('d-none')
    spinnerEl.classList.add('d-flex')
    setTimeout(() => {
        spinnerEl.classList.add('d-none')
        printJapaneseVisualMultiplication()
        btnEl.disabled = true;
    }, 1000)

}

function tensAndUnit(numberInput) {
    const hundreds = Math.floor(numberInput / 100);
    const tens = Math.floor(numberInput / 10);
    const units = numberInput % 10;
    return { hundreds, tens, units }
}


let checkBothUnitsAndTens = () => {


}



function printJapaneseVisualMultiplication() {
    japaneseContainerEl.style.display = 'flex';
    numberInputFirst = tensAndUnit(numberInputFirst);
    numberInputSecond = tensAndUnit(numberInputSecond);
    areTensFirstInput = numberInputFirst.tens === 0 ? false : true
    areTensSecondInput = numberInputSecond.tens === 0 ? false : true
    areUnitsFirstInput = numberInputFirst.units === 0 ? false : true;
    areUnitsSecondInput = numberInputSecond.units === 0 ? false : true;
    areTensBothInput = areTensFirstInput && areTensSecondInput;
    areUnitsBothInput = areUnitsFirstInput && areUnitsSecondInput;
    areBothUnitsAndTens = areTensBothInput && areUnitsBothInput;
    printMoltiplication(numberInputFirst, numberInputSecond);
    printParallelLine(numberInputFirst.tens, 'left', 'line-tens-first-multiplicand');
    printParallelLine(numberInputFirst.units, 'right', 'line-units-first-multiplicand');
    printParallelLine(numberInputSecond.tens, 'top', 'line-tens-second-multiplicand');
    printParallelLine(numberInputSecond.units, 'bottom', 'line-units-second-multiplicand');
    calculateCrossPoint()
    getPointsGroupFromArrayIntersection(intersection)
    if(areBothUnitsAndTens){
       printNumber() 
    }
    
    

    console.log(numberInputFirst, numberInputSecond)
    japaneseBoxEl.style.transform = 'rotate(-45deg)'
}


function printMoltiplication(firstInput, secondInput) {
    let multiplicationParagraph = document.createElement('p');
    multiplicationParagraph.classList.add('span-final-multiplication')
    multiplicationParagraph.innerHTML = `
        <span class="tens-first-multiplicand">${firstInput.tens === 0 ? '' : firstInput.tens}</span>
        <span class="units-first-multiplicand">${firstInput.units}</span>
        <span>✖️</span>
        <span class="tens-second-multiplicand">${secondInput.tens === 0 ? '' : secondInput.tens}</span>
        <span class="units-second-multiplicand">${secondInput.units}</span>
        <span>🟰</span> ${(firstInput.tens * 10 + firstInput.units) * (secondInput.tens * 10 + secondInput.units)}
    `;
    japaneseMultiplicationEl.appendChild(multiplicationParagraph);
}

printParallelLine = (number, direction, lineClass) => {

    for (i = 0; i < number; i++) {
        let line = document.createElement('div');
        line.classList.add(`${lineClass}`)
        line.classList.add('line')
        line.style[`${direction}`] = `${(10 + i * 10) / (number / 3)}%`
        japaneseBoxEl.appendChild(line)
    }
}


calculateCrossPoint = () => {


    const japaneseBoxElCoords = japaneseBoxEl.getBoundingClientRect();
    const japaneseBoxElWidth = japaneseBoxElCoords.width;
    const japaneseBoxElHeight = japaneseBoxElCoords.height;

    const calculateIntersection = (lines1, lines2) => {
        if (!(lines1.length === 0 || lines2.length === 0)) {
            let intersectionGrpuo = [];
            for (let i = 0; i < lines1.length; i++) {
                const coordLine1 = lines1[i].getBoundingClientRect();
                for (let j = 0; j < lines2.length; j++) {
                    const coordLine2 = lines2[j].getBoundingClientRect();
                    const left = Math.max(coordLine1.left, coordLine2.left);
                    const right = Math.min(coordLine1.right, coordLine2.right);
                    const top = Math.max(coordLine1.top, coordLine2.top);
                    const bottom = Math.min(coordLine1.bottom, coordLine2.bottom);
                    if (left < right && top < bottom) {
                        const x = ((left - japaneseBoxElCoords.left) / japaneseBoxElWidth) * 100;
                        const y = ((top - japaneseBoxElCoords.top) / japaneseBoxElHeight) * 100;

                        intersectionGrpuo.push({ x, y });

                        const circle = document.createElement('div');
                        circle.classList.add('intersection-circle');
                        circle.style.left = `${x - 1}%`;
                        circle.style.top = `${y - 1}%`;
                        japaneseBoxEl.appendChild(circle);
                    }
                }

            }
            intersection.push(intersectionGrpuo)
        }

    };

    calculateIntersection(document.querySelectorAll('.line-tens-first-multiplicand'), document.querySelectorAll('.line-tens-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-tens-first-multiplicand'), document.querySelectorAll('.line-units-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-units-first-multiplicand'), document.querySelectorAll('.line-tens-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-units-first-multiplicand'), document.querySelectorAll('.line-units-second-multiplicand'));
    // japaneseBoxEl.style.transform = 'rotate(-45deg)'
    console.log(intersection);
}

getPointsGroupFromArrayIntersection = (arrayIntersections) => {
    const firstPointsGroup = arrayIntersections[0];
    let middlePointsGroup = arrayIntersections.slice(1, -1).flat();
    const lastPointsGroup = arrayIntersections[arrayIntersections.length - 1];

    console.log("Primo Gruppo di punti:");
    console.log(firstPointsGroup);
    console.log("Gruppo punti in mezzo:");
    console.log(middlePointsGroup);
    console.log("Ultimo Gruppo di punti:");
    console.log(lastPointsGroup);


    if (areBothUnitsAndTens) {
        printRectangle(firstPointsGroup, false)
        printRectangle(middlePointsGroup, true)
        printRectangle(lastPointsGroup, false)
    }
    else {

        printRectangle(firstPointsGroup, false);
        printRectangle(lastPointsGroup, false);
    }


}


calculateMidPoint = (pointsGroup) => {
    if (!pointsGroup || pointsGroup.length === 0) {
        return null;
    }

    const totalPoints = pointsGroup.length;
    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < totalPoints; i++) {
        sumX += pointsGroup[i].x;
        sumY += pointsGroup[i].y;
    }

    const midPointX = sumX / totalPoints;
    const midPointY = sumY / totalPoints;

    return { x: midPointX, y: midPointY };
}


printRectangle = (pointsGroup, areMiddleGroup) => {
    if (pointsGroup === undefined) {
        return;
    }
    let margin = 10; // Valore del margine in percentuale
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Trova i valori minimi e massimi di x e y tra tutti i punti
    pointsGroup.forEach(point => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    });

    // Aggiungi il margine ai limiti del rettangolo
    minX -= margin;
    minY -= margin;
    maxX += margin;
    maxY += margin;

    // Assicura che i valori non siano inferiori a 0
    minX = Math.max(0, minX);
    minY = Math.max(0, minY);

    const rectWidth = maxX - minX; // Calcola la larghezza del rettangolo
    const rectHeight = maxY - minY; // Calcola l'altezza del rettangolo
    const rectX = minX; // Posizione x del rettangolo
    const rectY = minY; // Posizione y del rettangolo

    const rect = document.createElement('div');
    const number = document.createElement('div');
    number.classList.add('container-number')
    areMiddleGroup ? number.classList.add('span-number-middle') : number.classList.add('span-number-no-middle')
    number.innerHTML = `<div class="tens-units-number"><span class="span-tens">${tensAndUnit(pointsGroup.length).tens === 0 ? '' : tensAndUnit(pointsGroup.length).tens}</span><span class="span-units">${tensAndUnit(pointsGroup.length).units}</span></div>`
    rect.appendChild(number)
    rect.classList.add('rect-points');
    rect.style.left = areMiddleGroup ? `${rectX + 15}%` : `${rectX}%`; // Imposta la posizione x del rettangolo
    rect.style.top = areMiddleGroup ? `${rectY - 15}%` : `${rectY}%`; // Imposta la posizione y del rettangolo
    rect.style.width = areMiddleGroup ? `${rectWidth - 30}%` : `${rectWidth}%`; // Imposta la larghezza del rettangolo
    rect.style.height = areMiddleGroup ? `${rectHeight + 30}%` : `${rectHeight}%`; // Imposta l'altezza del rettangolo

    japaneseBoxEl.appendChild(rect);
    if (areMiddleGroup) {
        const curves = document.querySelectorAll('.curved');
        curves.forEach(curve => curve.style.display = 'block')
    }
}
printNumber = () => {
    let numbersSpanEls = Array.from(document.querySelectorAll('.container-number'));
    numbersSpanEls = numbersSpanEls.reverse()

    let numbersArray = Array.from(numbersSpanEls).map(span => parseInt(span.innerText))

console.log(numbersArray.length)
    let firstMultiplicationElement = numbersSpanEls[0].querySelector('.span-units');
    firstMultiplicationElement.classList.add('span-final-multiplication')
    numbersArray.forEach((number, i) => {
        if (i <= numbersArray.length-2) {
            let nextNumber = numbersArray[i + 1];
            number = numbersArray[i - 1] ? number + tensAndUnit(numbersArray[i - 1]).tens : number
            let nextNumberSpanEl = numbersSpanEls[i + 1]
            if (number > 9) {
                console.log(nextNumberSpanEl)
                let nextPlusTens = document.createElement('div')
                nextPlusTens.classList.add('plus-container')
                if (i !== 1 && nextNumberSpanEl) {
                    nextPlusTens.innerHTML = `<span class="plus">➕</span><span class="span-tens added-units">${tensAndUnit(number).tens}</span><span class="equals">🟰<span class="span-tens">${tensAndUnit(nextNumber + tensAndUnit(number).tens).tens === 0 ? '' : tensAndUnit(nextNumber + tensAndUnit(number).tens).tens}</span><span class="span-final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).units}</span>`

                } else {
                    
                    nextPlusTens.innerHTML = `<span class="plus">➕</span><span class="span-tens added-units">${tensAndUnit(number).tens}</span><span class="equals">🟰<span class="span-final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).tens === 0 ? '' : tensAndUnit(nextNumber + tensAndUnit(number).tens).tens}</span><span class="span-final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).units}</span>`


                }
                nextNumberSpanEl.appendChild(nextPlusTens)

                console.log(nextNumber)

            } else {
              
                    let nextMultiplicationElement = numbersSpanEls[i + 1].querySelector('.span-units');
                    console.log(nextMultiplicationElement)
                nextMultiplicationElement.classList.add('span-final-multiplication')
                
            }
        }




    })


}







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


        if (!(numberInputFirst >= 0 && numberInputFirst < 100)) {
            printError('Inserire nel PRIMO campo un numero compreso tra 0 e 99', true);

        }


        if (!(numberInputSecond >= 0 && numberInputSecond < 100)) {
            printError('Inserire nel SECONDO campo un numero compreso tra 0 e 99', true);

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
    japaneseBoxEl.style.transform = 'rotate(0deg)'
    japaneseBoxEl.innerText = '';
    japaneseMultiplicationEl.innerText = '';
    inputElFirst.value = '';
    inputElSecond.value = '';
    document.querySelector('main').style.marginTop = '200px'
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
    const tens = Math.floor(numberInput / 10);
    const units = numberInput % 10;

    return { tens, units }
}


function printJapaneseVisualMultiplication() {
    japaneseContainerEl.style.display = 'flex';
    numberInputFirst = tensAndUnit(numberInputFirst);
    numberInputSecond = tensAndUnit(numberInputSecond);
    isTensFirstInput = numberInputFirst.tens === 0 ? false : true
    isTensSecondInput = numberInputSecond.tens === 0 ? false : true
    printMoltiplication(numberInputFirst, numberInputSecond);
    printParallelLine(numberInputFirst.tens, 'left', 'line-tens-first-multiplicand', isTensFirstInput);
    printParallelLine(numberInputFirst.units, 'right', 'line-units-first-multiplicand', isTensFirstInput);
    printParallelLine(numberInputSecond.tens, 'top', 'line-tens-second-multiplicand', isTensSecondInput);
    printParallelLine(numberInputSecond.units, 'bottom', 'line-units-second-multiplicand', isTensSecondInput);
    calculateCrossPoint()
    getPointsGroupFromArrayIntersection(intersection)
    console.log(numberInputFirst, numberInputSecond)
    japaneseBoxEl.style.transform = 'rotate(-45deg)'
}


function printMoltiplication(firstInput, secondInput) {
    let multiplicationParagraph = document.createElement('p');
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

printParallelLine = (number, direction, lineClass, isThereTens) => {
    for (i = 0; i < number; i++) {
        let line = document.createElement('div');
        line.classList.add(`${lineClass}`)
        line.classList.add('line')
        if (isThereTens)
            line.style[`${direction}`] = `${(20 + i * 10) / number}%`
        else line.style[`${direction}`] = `${((50 - number) + i * 10)}%`
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

    const midPointFirstGroup = calculateMidPoint(firstPointsGroup);
    if(firstPointsGroup!=lastPointsGroup){
if (midPointFirstGroup) {
        printRectangles(midPointFirstGroup, false, 'first');
    }

    const midPointMiddleGroup = calculateMidPoint(middlePointsGroup);
    if (midPointMiddleGroup) {
        printRectangles(midPointMiddleGroup, true, 'middle');
    }

    const midPointLastGroup = calculateMidPoint(lastPointsGroup);
    if (midPointLastGroup) {
        printRectangles(midPointLastGroup, false, 'last');
    }
}else{
    if (midPointFirstGroup) {
        printRectangles(midPointFirstGroup, false, 'last');
    }
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

printRectangles = (middlePoint, flag = false,groupPoints) => {
    if (!middlePoint) {
        return;
    }

    console.log(middlePoint);
    const rect = document.createElement('div');
    const number = document.createElement('span');
    number.classList.add('span-number')
    number.classList.add(`span-number-${groupPoints}`);
    rect.appendChild(number);
    if (flag) {
        rect.style.transform = 'rotate(45deg)';
        rect.classList.add('rect-middle-points');
    } else {
        rect.classList.add('rect-points');
        rect.style.transform = 'rotate(313deg)';
        rect.style.left = `${middlePoint.x - 4}%`;
        rect.style.top = `${middlePoint.y - 4}%`;
        rect.style.width = `${30 + numberInputFirst.tens * numberInputSecond.tens}px`;
        rect.style.height = `${50 + numberInputFirst.tens * numberInputSecond.tens}px`;
    }

    japaneseBoxEl.appendChild(rect);
    printNumber(`${groupPoints}`);
}

printNumber=(groupPoints)=>{
const spanElNumber = document.querySelector(`.span-number-${groupPoints}`);
if(groupPoints==='first'){
    spanElNumber.innerText = `${(numberInputFirst.tens===0?1:numberInputFirst.tens)*(numberInputSecond.tens===0?1:numberInputSecond.tens)}`
}
if(groupPoints==='middle'){
    spanElNumber.innerText = `${numberInputFirst.tens*numberInputSecond.units + numberInputFirst.units*numberInputSecond.tens}`
}
if(groupPoints==='last'){
    spanElNumber.innerText = `${numberInputFirst.units*numberInputSecond.units}`
}

}




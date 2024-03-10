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
const italianLangEl = document.querySelector('.description-it')
const englishLangEl = document.querySelector('.description-en')
let language = 'en';
let numberInputFirst;
let numberInputSecond;

// Variabili di stato per la valutazione dei numeri inseriti
let areBothUnitsAndTens;
let areBothHundreds;
let areHundredsOnlyFirst;
let areHundredsOnlySecond;

let intersection = [];


tsParticles.load("tsParticles",{
    fpsLimit:50,
    particles:{
        color:{
            value:["#FF8FB4","#FFAA86","#B192FF","#FF786F"]
        },
        move:{
            attract:{
                enable:false,
                rotate:{
                    x:800,
                    y:800,
                },
            },
        direction:"none",
        enable:true,
        outModes:{
            default:"destroy",
        },
        random:true,
        speed:3,
        straight:false,
        },
        number:{
            density:{
                enable:true,
                area:200,
            },
            opacity:{
                value:0.1,
            },
            shape:{
                type:"circle",
            },
            size:{
                value:2,
                animation:{
                    startValue: "min",
                    enable:false,
                    minimumValue:1,
                    speed:2,
                    destroy:"max",
                    sync:true
                }
            }
        }
    },
    detectRetina:true,
    emitters:{
        direction:"none",
        rate:{
            quantity:10,
            delay:0.3,
        },
        size:{
            width:100,
            height:100,
        },
        position:{
            x:50,
            y:50,
        },
    }
})
// Funzione per abilitare/disabilitare il pulsante in base all'input
function enableBtnEl() {
    // Ottieni i valori degli input come numeri
    numberInputFirst = Number(inputElFirst.value);
    numberInputSecond = Number(inputElSecond.value);

    // Controllo sugli input per abilitare/disabilitare il pulsante
    if (inputElFirst.value.trim() !== '' && inputElSecond.value.trim() !== '') {
        errorContainerEl.innerHTML = '';
        btnEl.disabled = false;
    
        // Input checks to ensure they are whole numbers between 0 and 100
        if (!Number.isInteger(numberInputFirst)) {
            if(language === 'it') {
                printError('Inserisci un numero NATURALE nel PRIMO campo', true);
            } else if (language === 'en') {
                printError('Enter a INTEGER number in the FIRST field', true);
            }
        }
    
        if (!Number.isInteger(numberInputSecond)) {
            if(language === 'it') {
                printError('Inserisci un numero NATURALE nel SECONDO campo', true);
            } else if (language === 'en') {
                printError('Enter a INTEGER number in the SECOND field', true);
            }
        }
    
        if (!(numberInputFirst >= 0 && numberInputFirst <= 100)) {
            if(language === 'it') {
                printError('Inserisci un numero naturale compreso tra 0 e 100 nel PRIMO campo', true);
            } else if (language === 'en') {
                printError('Enter a integer number between 0 and 100 in the FIRST field', true);
            }
        }
    
        if (!(numberInputSecond >= 0 && numberInputSecond <= 100)) {
            if(language === 'it') {
                printError('Inserisci un numero naturale compreso tra 0 e 100 nel SECONDO campo', true);
            } else if (language === 'en') {
                printError('Enter a integer number between 0 and 100 in the SECOND field', true);
            }
        }
    } else {
        // If either field is empty, disable the button
        printError('', false)
    }
}    

// Aggiungi event listeners per controllare l'input
inputElFirst.addEventListener('input', enableBtnEl);
inputElSecond.addEventListener('input', enableBtnEl);

// Funzione per stampare un messaggio di errore e disabilitare il pulsante
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

// Listener per il click sul pulsante
btnEl.addEventListener('click', () => {
    // Reset delle variabili e degli elementi del DOM
    intersection = [];
    const curves = document.querySelectorAll('.curved');
    curves.forEach(curve => curve.style.display = 'none')
    japaneseBoxEl.style.transform = 'rotate(0deg)'
    japaneseBoxEl.innerText = '';
    japaneseMultiplicationEl.innerText = '';
    inputElFirst.value = '';
    inputElSecond.value = '';
    // document.querySelector('main').style.marginTop = '500px'
    spinnerShow()
});

// Funzione per mostrare lo spinner e avviare la generazione visuale della moltiplicazione giapponese
function spinnerShow() {
    spinnerEl.style.opacity = '1'
    setTimeout(() => {
        spinnerEl.style.opacity = '0'
        printJapaneseVisualMultiplication()
        printMoltiplication(numberInputFirst, numberInputSecond)
        calculateCrossPoint()
        getPointsGroupFromArrayIntersection(intersection)
        japaneseBoxEl.style.transform = 'rotate(-45deg)'

        if (areBothUnitsAndTens) {
            printNumber()
        }
        btnEl.disabled = true;
    }, 1000)
}

// Funzione per dividere un numero nelle sue unità, decine e centinaia
function tensAndUnit(numberInput) {
    let hundreds = Math.floor(numberInput / 100);
    let tens = Math.floor((numberInput % 100) / 10);
    let units = numberInput % 10;

    return { hundreds, tens, units };
}

// Funzione per verificare i tipi di numeri inseriti (centinaia, decine, unità)
let checkBothUnitsAndTens = () => {
    let areHundredsFirstInput = numberInputFirst.hundreds === 0 ? false : true;
    let areHundredsSecondInput = numberInputSecond.hundreds === 0 ? false : true;
    let areTensFirstInput = numberInputFirst.tens === 0 ? false : true;
    let areTensSecondInput = numberInputSecond.tens === 0 ? false : true;
    let areUnitsFirstInput = numberInputFirst.units === 0 ? false : true;
    let areUnitsSecondInput = numberInputSecond.units === 0 ? false : true;
    let areTensBothInput = areTensFirstInput && areTensSecondInput;
    let areUnitsBothInput = areUnitsFirstInput && areUnitsSecondInput;
    areHundredsOnlyFirst = (numberInputFirst.hundreds !== 0 && numberInputSecond.hundreds == 0) ? true : false;
    areHundredsOnlySecond = (numberInputSecond.hundreds !== 0 && numberInputFirst.hundreds == 0) ? true : false;
    areBothUnitsAndTens = areTensBothInput && areUnitsBothInput;
    areBothHundreds = areHundredsFirstInput && areHundredsSecondInput;
}

// Funzione per stampare la moltiplicazione visiva giapponese in base ai diversi casi degli input.
function printJapaneseVisualMultiplication() {
    japaneseContainerEl.style.display = 'flex';
    // Trasforma i numeri di input in formato "decine e unità"
    numberInputFirst = tensAndUnit(numberInputFirst);
    numberInputSecond = tensAndUnit(numberInputSecond);
    // Controlla i valori degli input per determinare una casistica: se sono presenti in entrambi le centinaia, oppure il primo ha sia decine che unità mentre il secondo no, ecc...
    checkBothUnitsAndTens()
    //...in base ai casi chiama la funzione 'printParalleLine'
   if (areBothHundreds) {
        printParallelLine(numberInputFirst.hundreds, 'left', 'line-hundreds-first-multiplicand');
        printParallelLine(numberInputSecond.hundreds, 'top', 'line-hundreds-second-multiplicand');
      
    }else if(areHundredsOnlyFirst){
        printParallelLine(numberInputFirst.hundreds, 'left', 'line-hundreds-first-multiplicand');
        printParallelLine(numberInputSecond.tens, 'top', 'line-tens-second-multiplicand');
        printParallelLine(numberInputSecond.units, 'bottom', 'line-units-second-multiplicand');
      
    }else if(areHundredsOnlySecond){
        printParallelLine(numberInputSecond.hundreds, 'top', 'line-hundreds-second-multiplicand');
        printParallelLine(numberInputFirst.tens, 'left', 'line-tens-first-multiplicand');
        printParallelLine(numberInputFirst.units, 'right', 'line-units-first-multiplicand');
      
    }else  if (!areBothHundreds) {
        
        printParallelLine(numberInputFirst.tens, 'left', 'line-tens-first-multiplicand');
        printParallelLine(numberInputFirst.units, 'right', 'line-units-first-multiplicand');
        printParallelLine(numberInputSecond.tens, 'top', 'line-tens-second-multiplicand');
        printParallelLine(numberInputSecond.units, 'bottom', 'line-units-second-multiplicand');
       
    } 
}


// Funzione per stampare la moltiplicazione...
function printMoltiplication(firstInput, secondInput) {
    //...crea un nuovo elemento paragrafo per la moltiplicazione
    let multiplicationParagraph = document.createElement('p');
    multiplicationParagraph.classList.add('final-multiplication');

    // ...costruisce la stringa HTML per la moltiplicazione
    multiplicationParagraph.innerHTML = `
        <span class="hundreds-first-multiplicand">${firstInput.hundreds === 0 ? '' : firstInput.hundreds}</span>
        <span class="tens-first-multiplicand">${firstInput.tens === 0 && firstInput.hundreds === 0 ? '' : firstInput.tens}</span>
        <span class="units-first-multiplicand">${firstInput.units}</span>
        <span>✖️</span>
        <span class="hundreds-second-multiplicand">${secondInput.hundreds === 0 ? '' : secondInput.hundreds}</span>
        <span class="tens-second-multiplicand">${secondInput.tens === 0 && secondInput.hundreds === 0 ? '' : secondInput.tens}</span>
        <span class="units-second-multiplicand">${secondInput.units}</span>
        <span>🟰</span> ${(firstInput.hundreds * 100 + firstInput.tens * 10 + firstInput.units) * (secondInput.hundreds * 100 + secondInput.tens * 10 + secondInput.units)}
    `;
    // ...aggiunge il paragrafo al contenitore della moltiplicazione giapponese
    japaneseMultiplicationEl.appendChild(multiplicationParagraph);
}

// Funzione per stampare le linee per ogni valore di centinaia, decine e unità per ogni input.
// number = quante linee deve stamapre
// direction = dove stamaprle
// lineClass = quale classe dare alla nuova linea che verrà stampata. Ogni linea (che sia centinaia, decina o unità) appartiene ad una classe con uno specifico stile in base a centinaia, decina o unità
printParallelLine = (number, direction, lineClass) => {

    for (i = 0; i < number; i++) {
        let line = document.createElement('div');
        line.classList.add(`${lineClass}`)
        line.classList.add('line')
        line.style[`${direction}`] = `${(10 + i * 10) / (number / 3)}%`
        japaneseBoxEl.appendChild(line)
    }
}


//NB QUESTA FUNZIONE PUò ESSERE OTTIMIZZATA CONSIDERANDO CHE AL MOMENTO VIENE UTILIZZATA A PRESCINDERE DALLA SUA REALE UTILITA'. Infatti, che ci siano o me centinaia, o decine, o unità in un input, viene
// ugualmente chiamata e vengono calcolate intersezione tra linee che potrebbero non esserci. 
// DA RIVEDERE.

// Funzione per calcolare e visualizzare i punti di intersezione delle linee per centinaia, decine e unità
calculateCrossPoint = (line1,lines2) => {
    // ..ottiene le coordinate e le dimensioni dell'elemento japaneseBoxEl che contiene le linee parallele stampate grazie alla funzione printParallelLine
    const japaneseBoxElCoords = japaneseBoxEl.getBoundingClientRect();
    const japaneseBoxElWidth = japaneseBoxElCoords.width;
    const japaneseBoxElHeight = japaneseBoxElCoords.height;

    // Funzione interna per calcolare le intersezioni tra due array di linee
    const calculateIntersection = (lines1, lines2) => {
        // Questi sono due array che contengono le linee per unità e decine per entrambi i moltiplicandi.
        // Per ogni combinazine possibile tra centinaia, decine e unità dei due input (es 24 e 13, calcolerà:
        // 1- le intersezione tra le 2 linee (decine)del primo input con la linea (decina) del secondo;
        // 2- le intersezioni tra le 2 linee (decine)del primo input con le 3 linee (unità) del secondo;
        // 3- le intersezioni tra le 4 linee (unità)del primo input con con la linea (decina) del secondo;
        // 4- le intersezioni tra le 4 linee (unità)del primo input con con le 3 linee (unità) del secondo;)

        //..verifica che entrambi lines1 e lines2 non siano vuoti. 
        if (!(lines1.length === 0 || lines2.length === 0)) {
            // Dichiara un array per memorizzare le intersezioni trovate
            let intersectionGroup = [];
            // Iterazione attraverso le linee del primo array
            for (let i = 0; i < lines1.length; i++) {
                // Ottenimento delle coordinate del rettangolo del segmento di linea
                const coordLine1 = lines1[i].getBoundingClientRect();
                // Iterazione attraverso le linee del secondo array
                for (let j = 0; j < lines2.length; j++) {
                    // Ottenimento delle coordinate del rettangolo del segmento di linea
                    const coordLine2 = lines2[j].getBoundingClientRect();
                    // Calcolo dei punti di intersezione
                    const left = Math.max(coordLine1.left, coordLine2.left);
                    const right = Math.min(coordLine1.right, coordLine2.right);
                    const top = Math.max(coordLine1.top, coordLine2.top);
                    const bottom = Math.min(coordLine1.bottom, coordLine2.bottom);
                    // Verifica se ci sia un'intersezione tra i rettangoli
                    if (left < right && top < bottom) {
                        // Calcolo delle coordinate relative delle intersezioni rispetto all'elemento japaneseBoxEl
                        const x = ((left - japaneseBoxElCoords.left) / japaneseBoxElWidth) * 100;
                        const y = ((top - japaneseBoxElCoords.top) / japaneseBoxElHeight) * 100;
                        // Aggiunta delle coordinate di intersezione all'array
                        intersectionGroup.push({ x, y });
                        // Creazione e posizionamento di un cerchio per rappresentare l'intersezione
                        const circle = document.createElement('div');
                        circle.classList.add('intersection-circle');
                        circle.style.left = `${x - 1}%`;
                        circle.style.top = `${y - 1}%`;
                        japaneseBoxEl.appendChild(circle);
                    }
                }
            }
            // Aggiunta dell'array delle intersezioni al gruppo di intersezioni complessivo
            intersection.push(intersectionGroup);
        }
    }
    ;

    // Calcolo delle intersezioni per tutte le combinazioni di linee tra i moltiplicatori
    calculateIntersection(document.querySelectorAll('.line-tens-first-multiplicand'), document.querySelectorAll('.line-tens-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-tens-first-multiplicand'), document.querySelectorAll('.line-units-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-units-first-multiplicand'), document.querySelectorAll('.line-tens-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-units-first-multiplicand'), document.querySelectorAll('.line-units-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-hundreds-first-multiplicand'), document.querySelectorAll('.line-hundreds-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-hundreds-first-multiplicand'), document.querySelectorAll('.line-tens-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-hundreds-first-multiplicand'), document.querySelectorAll('.line-units-second-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-hundreds-second-multiplicand'), document.querySelectorAll('.line-tens-first-multiplicand'));
    calculateIntersection(document.querySelectorAll('.line-hundreds-second-multiplicand'), document.querySelectorAll('.line-units-first-multiplicand'));

    
}


// Funzione per analizzare l'array dei punti di intersezione e, in base agli input, stampare i rettangoli che racchiudono i gruppi di punti.
// L'array che verrà passata è intersection che è del tipo [..., [],...]. Nel caso di input con entrambi unità e decine, la prima parte di tale array rappresenta le intersezioni tra
// le decine dei due input, la parte finale rappresenta le intersezioni tra le unità, la parte centrale rappresenta le cross interazioni tra decine e unità dei due input.
// Idealmente se questa parte centrale non è vuota allora certamente i due input contengono entrambi unità e decine.

getPointsGroupFromArrayIntersection = (arrayIntersections) => {
    // ... estrae il primo gruppo di punti dall'array di intersezioni.Idealmente corrisponde 
    const firstPointsGroup = arrayIntersections[0];
    // ...estrae l'ultimo gruppo di punti dall'array di intersezioni
    const lastPointsGroup = arrayIntersections[arrayIntersections.length - 1];

    // ...estrae i punti intermedi
    let middlePointsGroup = arrayIntersections.slice(1, -1).flat();

    // Verifica se sia necessario stampare sia i moltiplicatori delle unità che delle decine. Se entrambi gli input hanno decine e unità allora certamente ci sarà un array centrale di punti
    if (areBothUnitsAndTens) {
        // Stampa il rettangolo per il primo gruppo di punti (non intermedio)
        printRectangle(firstPointsGroup, false);
        // Stampa il rettangolo per il gruppo di punti intermedi
        printRectangle(middlePointsGroup, true);
        // Stampa il rettangolo per l'ultimo gruppo di punti (non intermedio)
        printRectangle(lastPointsGroup, false);
    } else {
        // Stampa il rettangolo per il primo gruppo di punti (non intermedio)
        printRectangle(firstPointsGroup, false);
        // Stampa il rettangolo per l'ultimo gruppo di punti (non intermedio)
        printRectangle(lastPointsGroup, false);
    }
}

// Funzione per stampare i rettangoli che racchiudono i punti di intersezione.
// Questa funzione accetta un array di punti (iniziale, centrale, finale) e un booleano (true se stiamo passando l'array centrale e quindi entrambi gli input hanno decine e unità....serve per definire, se T o F
// un diverso stile per le due tipologie di array (laterale o centrale))
printRectangle = (pointsGroup, areMiddleGroup) => {
   

    // Verifica se il gruppo di punti è indefinito e termina la funzione in caso affermativo
    if (pointsGroup === undefined) {
        return;
    }

    // Dichiarazione delle variabili per calcolare i margini e le dimensioni del rettangolo

    //Un margine tra il rettangolo e i punti. Non voglio che il bordo del rettangolo copra i punti più esterni
    let margin = 10;

    //Non sapendo a priori quale siano i massimi e i minimi dei punti per ogni array di intresione, pongo che siano +o- infinito
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Calcola massimo e minimo per ogni punto tra le sue coordinate e + o - infinito
    pointsGroup.forEach(point => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    });

    // ...aggiunge i margini al rettangolo
    minX -= margin;
    minY -= margin;
    maxX += margin;
    maxY += margin;

    // ...assicura che le coordinate del rettangolo siano non negative
    minX = Math.max(0, minX);
    minY = Math.max(0, minY);

    // ...calcola le dimensioni e le posizioni del rettangolo
    const rectWidth = maxX - minX;
    const rectHeight = maxY - minY;
    const rectX = minX;
    const rectY = minY;

    // Creazione del rettangolo come elemento div
    const rect = document.createElement('div');
    // Creazione dell'elemento per il numero all'interno del rettangolo
    const number = document.createElement('div');
    // Aggiunta delle classi all'elemento numero
    number.classList.add('container-number');
    areMiddleGroup ? number.classList.add('span-number-middle') : number.classList.add('span-number-no-middle');
    // Inserimento del numero all'interno dell'elemento numero. Tale numero è la lunghezza dell array delle intersezioni, e quindi il numero totale dei punti di intersezione tra le linee per ogni "gruppo"
    //(decine del primo con decine del secondo, ecc...)
    number.innerHTML = `<div class="tens-units-number"><span class="span-tens">${tensAndUnit(pointsGroup.length).hundreds === 0 ? '' : tensAndUnit(pointsGroup.length).hundreds}</span><span class="span-tens">${tensAndUnit(pointsGroup.length).tens === 0 ? '' : tensAndUnit(pointsGroup.length).tens}</span><span class="span-units">${tensAndUnit(pointsGroup.length).units}</span></div>`;
    // Aggiunta dell'elemento numero al rettangolo
    rect.appendChild(number);
    // Aggiunta delle classi e delle dimensioni al rettangolo
    rect.classList.add('rect-points');
    //Se ci sono o meno unità e decine per entrambi, e quindi è presente il gruppo centrale, allora il rettangolo sarà leggermente diverso rispetto al rettangolo dei gruppi di punti "lateralei"
    rect.style.left = areMiddleGroup ? `${rectX + 15}%` : `${rectX}%`;
    rect.style.top = areMiddleGroup ? `${rectY - 15}%` : `${rectY}%`;
    rect.style.width = areMiddleGroup ? `${rectWidth - 30}%` : `${rectWidth}%`;
    rect.style.height = areMiddleGroup ? `${rectHeight + 30}%` : `${rectHeight}%`;

    // Aggiunta del rettangolo all'elemento japaneseBoxEl
    japaneseBoxEl.appendChild(rect);

    // Se il rettangolo è un rettangolo intermedio, mostra le curve
    if (areMiddleGroup) {
        const curves = document.querySelectorAll('.curved');
        curves.forEach(curve => curve.style.display = 'block');
    }
}

//Funzione per stampare i numeri all'interno dei rettangoli che racchiudono i punti di intersezione
printNumber = () => {
    // Ottenimento degli elementi span contenenti i numeri
    let numbersSpanEls = Array.from(document.querySelectorAll('.container-number'));
    // Inverti l'array degli elementi span in modo da analizzare da destra a sinistra
    numbersSpanEls = numbersSpanEls.reverse();

    // Creazione di un array contenente i numeri estratti dagli elementi span
    let numbersArray = Array.from(numbersSpanEls).map(span => parseInt(span.innerText));

    // Seleziona l'elemento span contenente le unità del primo moltiplicatore e aggiunge una classe per indicare la moltiplicazione finale. A prescindere dai casi l'unità del secondo input concorrà alla formazione
    // del prodotto finale secondo la visual giapponese
    let firstMultiplicationElement = numbersSpanEls[0].querySelector('.span-units');
    firstMultiplicationElement.classList.add('final-multiplication');

    // Iterazione attraverso l'array di numeri per aggiungere i segni più e calcolare i risultati intermedi
    numbersArray.forEach((number, i) => {
        if (i <= numbersArray.length - 2) {
            let nextNumber = numbersArray[i + 1];
            number = numbersArray[i - 1] ? number + tensAndUnit(numbersArray[i - 1]).tens : number;
            let nextNumberSpanEl = numbersSpanEls[i + 1];
            if (number > 9) {
                // Creazione di un elemento div per il segno più e il numero aggiunto
                let nextPlusTens = document.createElement('div');
                nextPlusTens.classList.add('plus-container');
                // Costruzione del contenuto dell'elemento plus
                if (i !== 1 && nextNumberSpanEl) {
                    nextPlusTens.innerHTML = `<span class="plus">➕</span><span class="span-tens added-units">${tensAndUnit(number).hundreds === 0 ? '' : tensAndUnit(number).hundreds}${tensAndUnit(number).tens}</span><span class="equals">🟰<span class="span-tens">${tensAndUnit(nextNumber + tensAndUnit(number).tens).hundreds === 0 ? '' : tensAndUnit(nextNumber + tensAndUnit(number).tens).hundreds}</span><span class="span-tens">${tensAndUnit(nextNumber + tensAndUnit(number).tens).tens === 0 ? '' : tensAndUnit(nextNumber + tensAndUnit(number).tens).tens}</span><span class="final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).units}</span>`;
                } else {
                    nextPlusTens.innerHTML = `<span class="plus">➕</span><span class="span-tens added-units">${tensAndUnit(number).hundreds === 0 ? '' : tensAndUnit(number).hundreds}${tensAndUnit(number).tens}</span><span class="equals">🟰<span class="final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).tens === 0 ? '' : tensAndUnit(nextNumber + tensAndUnit(number).tens).tens+tensAndUnit(number).hundreds}</span><span class="final-multiplication">${tensAndUnit(nextNumber + tensAndUnit(number).tens).units}</span>`;
                }
                // Aggiunta dell'elemento plus al prossimo elemento span
                nextNumberSpanEl.appendChild(nextPlusTens);
            } else {
                // Se il numero non supera 9, aggiungi una classe per indicare la moltiplicazione finale all'elemento span delle unità successivo
                let nextMultiplicationElement = numbersSpanEls[i + 1].querySelector('.span-units');
                nextMultiplicationElement.classList.add('span-final-multiplication');
            }
        }
    });
}


function setLanguage(country){
    language = country;
    if(country === 'it'){
        englishLangEl.style.display = 'none'
        italianLangEl.style.display = 'block'
        btnEl.innerText = 'Vai!'
    }else if(country === 'en'){
        italianLangEl.style.display = 'none'
        englishLangEl.style.display = 'block'
        btnEl.innerText = 'Go!'

    }
}
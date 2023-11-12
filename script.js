const MIN_SIZE = 1;
const MAX_SIZE = 200;

// Checks for font size in local storage
let savedFontSize = localStorage.getItem('savedFontSize');

let currentFontSize;
let numberFontSize;
let baniSection;
let optionsMenu;

baniSection = document.getElementById("bani");
optionsMenu = document.getElementById("popUp");

let currentColumnWidth = document.getElementById("currentColumnWidth");
let currentWordSpace = document.getElementById("currentWordSpace");

// Get current font size of bani section
currentFontSize = window.getComputedStyle(baniSection).getPropertyValue('font-size');

// Number format font size
numberFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));
setInputValue(numberFontSize, 'currentFontSize');

if (savedFontSize) {
    changeFontSize(savedFontSize);
    setInputValue(savedFontSize, 'currentFontSize');
}

function changeBackgroundColor(value) {
    document.body.style.backgroundColor = value;
}

function changeFontColor(value) {
    document.body.style.color = value;
}

function increaesDecreaseFontSize(increaseDecreaseValue) {
    let newNumberFontSize = numberFontSize + increaseDecreaseValue;
    if (!isBetween(MIN_SIZE, MAX_SIZE, numberFontSize)) {
        return;
    }
    numberFontSize = newNumberFontSize;
    setInputValue(numberFontSize, 'currentFontSize');
    baniSection.style.fontSize = numberFontSize + "px";
    saveFontSizeInStorage(numberFontSize);
}

// Change font size in input field
function setInputValue(value, fieldId) {
    document.getElementById(fieldId).value = Number.parseFloat(value).toFixed(1);
}

function changeFontSize(size) {
    if (!isBetween(MIN_SIZE, MAX_SIZE, size)) {
        return;
    }
    numberFontSize = Number.parseFloat(size);
    baniSection.style.fontSize = size + 'px';
    saveFontSizeInStorage(numberFontSize);
}

function darkMode(isOn) {
    if (isOn) {
        document.body.style.backgroundColor = "#000000"
        document.body.style.color = "#ffffff";
        return;
    }
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "#000000";
}

// Emit multiple events when called continuously
let emitterInterv;
function continuousEmitterStart(func, params, time) {
    emitterInterv = setInterval(() => {
        func(params)
    }, time);
}

// Stops event emitting when called
function continuousEmitterStop() {
    clearInterval(emitterInterv);
}

function isBetween(first, second, num) {
    if (num >= first && num <= second) {
        return true;
    }
    return false;
}

function extractNumberFromProperty(property) {
    return Number.parseFloat(property.substring(0, property.length - 2));
}

function slideNextPrev(direction) {
    let computed = window.getComputedStyle(baniSection);

    if (direction === "next") {
        baniSection.scrollBy(
                extractNumberFromProperty(computed.width)
                + extractNumberFromProperty(computed.padding) * 2
                , 0);
        
        return;
    }
    baniSection.scrollBy(
            -(extractNumberFromProperty(computed.width)
            + extractNumberFromProperty(computed.padding) * 2)
            , 0);
}

function changeJustify(isOn) {
    if (isOn) {
        baniSection.style.textAlign = 'justify';
        return;
    }
    baniSection.style.textAlign = 'left';
}

function saveFontSizeInStorage(size) {
    localStorage.setItem('savedFontSize', size);
}

function openCloseMenu() {
    if (optionsMenu.style.display === '' || optionsMenu.style.display === 'none') {
        optionsMenu.style.display = 'flex';
    } else {
        optionsMenu.style.display = 'none';
    }
}

function changeColumnWidth(size) {
    if (!isBetween(MIN_SIZE, MAX_SIZE, size)) {
        return;
    }
    baniSection.style.columnWidth = size + 'vw';
}

function changeInput(value, callback) {
    callback(value);
}

function increaesDecreaseColumnWidth(increaseDecreaseValue) {
    let newNumberColumnWidth = Number(currentColumnWidth.value) + increaseDecreaseValue;
    if (!isBetween(MIN_SIZE, MAX_SIZE, newNumberColumnWidth)) {
        setInputValue(newNumberColumnWidth, 'currentColumnWidth');
        return;
    }
    setInputValue(newNumberColumnWidth, 'currentColumnWidth');
    baniSection.style.columnWidth = newNumberColumnWidth + "vw";
}

currentWordSpace.value = Number.parseFloat(window.getComputedStyle(baniSection).getPropertyValue('word-spacing'));

function increaesDecreaseWordSpace(increaseDecreaseValue) {
    let newNumberWordSpace = Number.parseFloat(currentWordSpace.value) + increaseDecreaseValue;
    if (!isBetween(0, MAX_SIZE, newNumberWordSpace)) {
        return;
    }
    setInputValue(newNumberWordSpace, 'currentWordSpace');
    baniSection.style.wordSpacing = newNumberWordSpace + "px";
}

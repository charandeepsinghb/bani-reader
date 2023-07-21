const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 200;


let savedFontSize = localStorage.getItem('savedFontSize');

let currentFontSize;
let numberFontSize;
let baniSection;
let optionsMenu;

// Get current font size of bani section
baniSection = document.getElementById("bani");
optionsMenu = document.getElementById("popUp");

currentFontSize = window.getComputedStyle(baniSection).getPropertyValue('font-size');
numberFontSize = Number(currentFontSize.substring(0, currentFontSize.length - 2));
setFontSize(numberFontSize);
if (savedFontSize) {
    changeFontSize(savedFontSize);
    setFontSize(savedFontSize);
}

function changeBackgroundColor(value) {
    document.body.style.backgroundColor = value;
}

function changeFontColor(value) {
    document.body.style.color = value;
}

function increaseFontSize() {
    increaesDecreaseFontSize(0.2);
}

function decreaseFontSize() {
    increaesDecreaseFontSize(-0.2);
}

function increaesDecreaseFontSize(increaseDecreaseValue) {
    let newNumberFontSize = numberFontSize + increaseDecreaseValue;
    if (!isBetween(MIN_FONT_SIZE, MAX_FONT_SIZE, numberFontSize)) {
        return;
    }
    numberFontSize = newNumberFontSize;
    setFontSize(numberFontSize);
    baniSection.style.fontSize = numberFontSize + "px";
    saveFontSizeInStorage(numberFontSize);
}

// Change font size in input field
function setFontSize(value) {
    document.getElementById("currentFontSize").value = Number(value).toFixed(1);
}

function changeFontSize(size) {
    if (!isBetween(MIN_FONT_SIZE, MAX_FONT_SIZE, size)) {
        return;
    }
    numberFontSize = Number(size);
    baniSection.style.fontSize = size + 'px';
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
function continuousEmitterStart(func) {
    emitterInterv = setInterval(() => {
        func()
    }, 1);
}

// Stops event emitting when called
function continuousEmitterStop() {
    clearInterval(emitterInterv);
}

function isBetween(first, second, num) {
    if (num >= first && num <= second) {
        return true;
    }
}

function extractNumberFromProperty(property) {
    return Number(property.substring(0, property.length - 2));
}

function slideNext() {
    let computed = window.getComputedStyle(baniSection);

    baniSection.scrollBy(extractNumberFromProperty(computed.width), 0);
}

function slidePrev() {
    let computed = window.getComputedStyle(baniSection);

    baniSection.scrollBy(-extractNumberFromProperty(computed.width), 0);
}

function hideShowOverlayButtons(isOn) {
    if (!isOn) {
        baniSection.style.overflowY = 'auto';
        return;
    }
    baniSection.style.overflowY = 'hidden';
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

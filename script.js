const MIN_SIZE = 1;
const MAX_SIZE = 200;

let baniSection = document.getElementById("bani");
let optionsMenu = document.getElementById("popUp");

/*********************** Commons *************************/

function setInputValue(value, fieldId) {
    document.getElementById(fieldId).value = Number.parseFloat(value).toFixed(2);
}

// Emit multiple events when called continuously
let emitterInterv;
function continuousEmitterStart(func, params, time) {
    emitterInterv = setInterval(() => {
        func(params)
    }, time);
}

// Stops event emitting when called
function continuousEmitterStop(type) {
    clearInterval(emitterInterv);
    if (type === 'font') {
        localStorage.setItem('savedFontSize', numberFontSize);
    }
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

/*********************** Fonts and text *************************/

// Checks for font size in local storage
let savedFontSize = localStorage.getItem('savedFontSize');

let currentFontSize;
let numberFontSize;

// Get current font size of bani section
currentFontSize = window.getComputedStyle(baniSection).getPropertyValue('font-size');

// Number format font size
numberFontSize = Number.parseFloat(currentFontSize.substring(0, currentFontSize.length - 2));
setInputValue(numberFontSize, 'currentFontSize');

if (savedFontSize) {
    changeFontSize(savedFontSize);
    setInputValue(savedFontSize, 'currentFontSize');
}

function increaesDecreaseFontSize(increaseDecreaseValue) {
    let newNumberFontSize = numberFontSize + increaseDecreaseValue;
    if (!isBetween(MIN_SIZE, MAX_SIZE, numberFontSize)) {
        return;
    }
    numberFontSize = newNumberFontSize;
    setInputValue(numberFontSize, 'currentFontSize');
    baniSection.style.fontSize = numberFontSize + "px";
}

function changeFontSize(size) {
    if (!isBetween(MIN_SIZE, MAX_SIZE, size)) {
        return;
    }
    numberFontSize = Number.parseFloat(size);
    baniSection.style.fontSize = size + 'px';
    localStorage.setItem('savedFontSize', size);
}

/*********************** Color themes *************************/

const darkCheck = document.getElementById("darkCheck");

function changeBackgroundColor(value) {
    document.documentElement.style.setProperty('--background-color', value);
}

function changeFontColor(value) {
    document.documentElement.style.setProperty('--font-color', value);
}

function darkMode(isOn) {
    if (isOn) {
        document.documentElement.style.setProperty('--font-color', 'white');
        document.documentElement.style.setProperty('--background-color', 'black');
        return;
    }
    
    document.documentElement.style.setProperty('--font-color', 'black');
    document.documentElement.style.setProperty('--background-color', 'white');
}

/*********************** Theme *************************/

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

// Theme change event listener
darkThemeMq.addEventListener("change", e => {
    if (e.matches) {
        darkCheck.checked = true;
        darkMode(true);
    } else {
        darkCheck.checked = false;
        darkMode(false);
    }
});

/*********************** Popup menu *************************/

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

function openCloseMenu() {
    if (optionsMenu.style.display === '' || optionsMenu.style.display === 'none') {
        optionsMenu.style.display = 'flex';
    } else {
        optionsMenu.style.display = 'none';
    }
}

/*********************** Column width *************************/

let currentColumnWidth = document.getElementById("currentColumnWidth");

function increaesDecreaseColumnWidth(increaseDecreaseValue) {
    let newNumberColumnWidth = Number(currentColumnWidth.value) + increaseDecreaseValue;
    if (!isBetween(MIN_SIZE, MAX_SIZE, newNumberColumnWidth)) {
        setInputValue(newNumberColumnWidth, 'currentColumnWidth');
        return;
    }
    setInputValue(newNumberColumnWidth, 'currentColumnWidth');
    baniSection.style.columnWidth = newNumberColumnWidth + "vw";
}

function changeColumnWidth(size) {
    if (!isBetween(MIN_SIZE, MAX_SIZE, size)) {
        return;
    }
    baniSection.style.columnWidth = size + 'vw';
}

/*********************** Word space *************************/

let currentWordSpace = document.getElementById("currentWordSpace");

currentWordSpace.value = Number.parseFloat(window.getComputedStyle(baniSection).getPropertyValue('word-spacing'));

function increaesDecreaseWordSpace(increaseDecreaseValue) {
    let newNumberWordSpace = Number.parseFloat(currentWordSpace.value) + increaseDecreaseValue;
    if (!isBetween(0, MAX_SIZE, newNumberWordSpace)) {
        return;
    }
    setInputValue(newNumberWordSpace, 'currentWordSpace');
    baniSection.style.wordSpacing = newNumberWordSpace + "px";
}

/*********************** Font weight *************************/

let currentFontWeight = document.getElementById("currentFontWeight");

currentFontWeight.value = Number.parseFloat(window.getComputedStyle(baniSection).getPropertyValue('font-weight'));

function increaesDecreaseFontWeight(increaseDecreaseValue) {
    let newNumberFontWeight = Number.parseFloat(currentFontWeight.value) + increaseDecreaseValue;
    if (!isBetween(0, 1000, newNumberFontWeight)) {
        return;
    }
    setInputValue(newNumberFontWeight, 'currentFontWeight');
    baniSection.style.fontWeight = newNumberFontWeight;
}

/*********************** Line height *************************/

let currentLineHeight = document.getElementById("currentLineHeight");

currentLineHeight.value = Number.parseFloat(window.getComputedStyle(baniSection).getPropertyValue('line-height'));

function increaesDecreaseLineHeight(increaseDecreaseValue) {
    const NORMAL_LINE_HEIGHT = 1.2;
    
    let newNumberLineHeight;
    if (!currentLineHeight.value) {
        newNumberLineHeight = NORMAL_LINE_HEIGHT + increaseDecreaseValue;
    } else {
        newNumberLineHeight = Number.parseFloat(currentLineHeight.value) + increaseDecreaseValue;
    }
    if (!isBetween(NORMAL_LINE_HEIGHT, MAX_SIZE, newNumberLineHeight)) {
        return;
    }
    setInputValue(newNumberLineHeight, 'currentLineHeight');
    baniSection.style.lineHeight = newNumberLineHeight;
}

/*********************** Seperate line *************************/

function changeSeperate(isOn) {
    if (isOn) {
        baniSection.innerHTML = baniSection.innerHTML.replaceAll(/(?!.{0,30}<br>)॥(?!<br>)/g, '॥<br data-mybreak="true">');
        return;
    }
    baniSection.innerHTML = baniSection.innerHTML.replaceAll('॥<br data-mybreak="true">', '॥');
}

/*********************** Scroll *************************/

function changeScroll(isOn) {
    if (isOn) {
        baniSection.style.overflowY = 'scroll';
        baniSection.style.columnWidth = 'revert';
        return;
    }
    baniSection.style.overflowY = 'hidden';
    baniSection.style.columnWidth = '100vw';
}

/*********************** Set initial height width for bani section *************************/

function setHeightWidthForFixed() {
    baniSection.style.height = (window.innerHeight * 0.85) + "px";
    // baniSection.style.width = (window.innerWidth * 0.98) + "px";
    const configBottomElm = document.getElementsByClassName("configBottom")[0];
    configBottomElm.style.height = (window.innerHeight * 0.1) + "px";
    configBottomElm.style.marginBottom = (window.innerHeight * 0.07) + "px";
}
setHeightWidthForFixed();


/*********************** Add pointer *************************/

const marker = document.getElementById("mark");

baniSection.addEventListener("pointerdown", e => {
    // 5 = half of the height of the marker
    marker.style.top = e.y - 5 + "px";
});

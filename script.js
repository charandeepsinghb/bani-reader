const MIN_SIZE = 1;
const MAX_SIZE = 200;

let baniSection = document.getElementById("bani");
let optionsMenu = document.getElementById("popUp");

/*********************** Commons *************************/

function setInputValue(value, fieldId) {
    document.getElementById(fieldId).value = Number.parseFloat(value).toFixed(2);
}

function setCheckedAttribute(value, fieldId) {
    if (value === "true") {
        document.getElementById(fieldId).setAttribute("checked", true);
        return;
    }
    document.getElementById(fieldId).removeAttribute("checked");
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
const savedFontSize = localStorage.getItem('savedFontSize');

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
    setSelectedBackgroundColor();
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
        baniSection.classList.add('seperateLines');
        localStorage.setItem('savedSeperate', isOn);
        return;
    }
    baniSection.classList.remove('seperateLines');
    localStorage.setItem('savedSeperate', isOn);
}

const savedSeperate = localStorage.getItem('savedSeperate');
if (savedSeperate != null) {
    if (savedSeperate === "true") {
        changeSeperate(true);
    } else {
        changeSeperate(false);
    }
    setCheckedAttribute(savedSeperate, 'seperate');
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
    const configBottomElm = document.getElementsByClassName("configBottom")[0];
    configBottomElm.style.height = (window.innerHeight * 0.08) + "px";
}
setHeightWidthForFixed();


/*********************** Change Alignment *************************/

function changeAlignment(value) {
    switch (value) {
        case "1":
            baniSection.style.textAlign = 'center';
            break;
        case "2":
            baniSection.style.textAlign = 'right';
            break;
        case "3":
            baniSection.style.textAlign = "justify";
            break;
        default:
            baniSection.style.textAlign = 'left';
            break;
    }
    localStorage.setItem('savedAlignment', value);
}

const savedAlignment = localStorage.getItem('savedAlignment');
if (savedAlignment) {
    changeAlignment(savedAlignment);
    setInputValue(savedAlignment, 'alignSlider');
}


/*********************** Fullscreen *************************/

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            changeFullscreenIcon(true);
        }).catch(() => {
            console.error(`Error attempting to enable fullscreen mode:: ${error.message}`);
        });
    } else if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
            changeFullscreenIcon(false);
        }).catch(() => {
            console.error(`Error attempting to disable fullscreen mode:: ${error.message}`);
        });
    }
}

const fullscreenSpan = document.getElementById("fullscreenIcon");

function changeFullscreenIcon(on) {
    if (on) {
        fullscreenSpan.innerHTML = "fullscreen_exit";
    } else {
        fullscreenSpan.innerHTML = "fullscreen";
    }
}


/*********************** Left / Right touch *************************/

let leftRightTouch = false;

function leftRightTouchEnable(isOn) {
    if (isOn) {
        leftRightTouch = true;
        
        return;
    }
    
    leftRightTouch = false;
}

baniSection.addEventListener("dblclick", (event)=>{
    if (leftRightTouch) {
        let half = window.innerWidth / 2;
        if (event.clientX > half) {
            slideNextPrev('next');
        } else {
            slideNextPrev('prev');
        }
    } else {

    }
});


/*********************** Highlight selected line *************************/

const HOLD_TIME = 600;

let pointerTimeout;

function intoViewPointerDown(target) {
    intoViewPointerUp();
    pointerTimeout = setTimeout(()=>{
        screenHold(target);
    }, HOLD_TIME);
}

function intoViewPointerUp() {
    if (pointerTimeout) {
        clearTimeout(pointerTimeout);
    }
}

function screenHold(target) {
    let selectedLineElement = document.getElementById("selectedLine");
    // If already selected
    if (target.parentElement?.parentElement == baniSection) {
        if (selectedLineElement) {
            // Remove id and styles
            selectedLineElement.removeAttribute("id");
            selectedLineElement.style = '';
        }

        // Add id to selection
        target.setAttribute("id", "selectedLine");

        setSelectedBackgroundColor();
    }
}

baniSection.addEventListener("pointerdown", (event)=>{
    intoViewPointerDown(event.target);
});

baniSection.addEventListener("pointerup", ()=>{
    intoViewPointerUp();
});
baniSection.addEventListener("pointerout", ()=>{
    intoViewPointerUp();
});

function setSelectedBackgroundColor() {
    // Set background color
    const selectedLineElement = document.getElementById("selectedLine");
    selectedLineElement.style.backgroundColor = getLineBackgroundColor();
}

function getLineBackgroundColor() {
    const fontColor = window.getComputedStyle(document.body).getPropertyValue('--font-color');

    // Only hex color
    const pattern = /^#([A-Fa-f0-9]{6})$/;
    if (pattern.test(fontColor)) {
        return fontColor + '30';
    }

    return '#00000030';
}

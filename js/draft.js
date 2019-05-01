let textRangeColor = document.getElementById('textRangeColor');
let divColor = document.getElementById('divColor');
let btnNext = document.getElementById('btnNext');

let level;
let currentNumberColor = 1;
let draftColors = [];

window.onload = onLoadWindow;
btnNext.onclick = onClickBtnNext;

function onLoadWindow() {
    getLevel();
    setDivColor();
}

function getLevel() {
    chrome.storage.sync.get(['level'], function (result) {
        level = result.level;
        fillTextRangeColor();
    });
}

function fillTextRangeColor() {
    textRangeColor.innerHTML = `${currentNumberColor}/${level}`;
}

function setDivColor() {
    setNextDraftColor();
    divColor.style.background = draftColors[currentNumberColor - 1];
}

function setNextDraftColor() {
    draftColors.push(getRandomRgbColor());
}

function onClickBtnNext() {
    currentNumberColor += 1;

    if (currentNumberColor <= level) {
        setDivColor();
        fillTextRangeColor();
    }
    else {
        goToAnswerPage();
    }
}

function goToAnswerPage() {
    chrome.storage.sync.set({ 'draftColors': draftColors }, function () {
        window.location.href = 'answer.html';
    });
}
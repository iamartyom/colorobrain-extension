const answers = document.getElementsByClassName('answer');

let level;
let currentNumberColor = 1;
let draftColors;
let answerColors = [];

window.onload = onLoadWindow;

function onLoadWindow() {
    setOnClickEventToAnswers();
    getLevel();
    fillDraftColors();
}

function setOnClickEventToAnswers() {
    for (var x = 0; x < answers.length; x++) {
        answers[x].onclick = onClickAnswer;
    }
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

function fillDraftColors() {
    chrome.storage.sync.get(['draftColors'], function (result) {
        draftColors = result.draftColors;
        fillAnswerColors();
    });
}

function fillAnswerColors() {
    setAnswerColors();
    fillBackgroundDivAnswers();
    fillTextRangeColor();
}

function setAnswerColors() {
    answerColors = [];
    answerColors.push(draftColors[currentNumberColor - 1]);

    for (var x = 1; x < answers.length; x++) {
        answerColors.push(getRandomRgbColor());
    }

    shuffleArray(answerColors);
}

function shuffleArray(a) {
    var j, x, i;

    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function fillBackgroundDivAnswers() {
    for (var x = 0; x < answers.length; x++) {
        answers[x].style.background = answerColors[x];
    }
}

function onClickAnswer(e) {
    if (e.target.style.background === draftColors[currentNumberColor - 1]) {
        nextAnswers();
    } else {
        window.location.href = 'incorrect-answer.html';
    }
}

function nextAnswers() {
    currentNumberColor += 1;

    if (currentNumberColor <= level) {
        fillAnswerColors();
    }
    else {
        window.location.href = 'next-level.html';
    }
}
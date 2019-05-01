const textLevel = document.getElementById('textLevel');
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

window.onload = onLoadWindow;
btnStart.onclick = onClickBtnStart;
btnReset.onclick = onClickBtnReset;

function onLoadWindow() {
  getLevel();
}

function onClickBtnStart() {
  window.location.href='draft.html';
}

function onClickBtnReset() {
  setInitialLevel();
}

function getLevel() {
  chrome.storage.sync.get(['level'], function(result) {
    if(result.level) {
      fillTextLevel(result.level);
    } else {
      setInitialLevel();
    }
  });
}

function setInitialLevel() {
  const initialLevel = 1;
  
  chrome.storage.sync.set({ level: initialLevel }, function() {
    fillTextLevel(initialLevel);
  });
}

function fillTextLevel(level) {
  textLevel.innerHTML = `LEVEL - ${level}`;
}
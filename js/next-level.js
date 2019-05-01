const btnStartPage = document.getElementById('btnStartPage');

window.onload = onLoadWindow();
btnStartPage.onclick = onClickStartPage;

function onLoadWindow() {
    setNumberNextLevel();
}

function setNumberNextLevel() {
    chrome.storage.sync.get(['level'], function(result) {
        chrome.storage.sync.set({ 'level': result.level + 1 });
    });
}

function onClickStartPage() {
    window.location.href = 'start-page.html';
}
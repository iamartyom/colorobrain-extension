function getRandomRgbColor() {
    return `rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)})`;
}

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * Math.floor(maxNumber));
}
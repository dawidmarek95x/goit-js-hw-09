
// Search for the start button
const startBtn = document.querySelector("button[data-start]");

// Search for the stop button
const stopBtn = document.querySelector("button[data-stop]");

// Locking the stop button after entering the website
lockingBtn(stopBtn);

// Declaration of a timer variable
let changingBgColorTimer = null;

// Listener for "click" events for the start button
startBtn.addEventListener("click", changingBodyBgColor);

// Function to change the background color of the body element
function changingBodyBgColor() {
  const styleForBody =  document.body.style;
  styleForBody.backgroundColor = getRandomHexColor();
  lockingBtn(startBtn);
  unlockingBtn(stopBtn);
  changingBgColorTimer = setInterval(() => {
    styleForBody.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Listener for "click" events for the stop button
stopBtn.addEventListener("click", stopChangingBgColor);

// Function that stops changing the background color
function stopChangingBgColor() {
  clearInterval(changingBgColorTimer);
  lockingBtn(stopBtn);
  unlockingBtn(startBtn);
}

// Function that locks the selected button
function lockingBtn(btnName) {
  btnName.disabled = true;
}

// Function that unlocks the selected button
function unlockingBtn(btnName) {
  btnName.disabled = false;
}

// A function that generates a random color in HEX format
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
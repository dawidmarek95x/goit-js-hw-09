// Import of flatpickr library
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Optimizing function (shortening the record) for searching for elements on the page
const qs = (selector) => document.querySelector(selector);

// Search for input and output elements
const startBtn = qs("button[data-start]");
const chosenDate = qs("#datetime-picker");
const daysOutput = qs("[data-days]");
const hoursOutput = qs("[data-hours]");
const minutesOutput = qs("[data-minutes]");
const secondsOutput = qs("[data-seconds]");

let timer = null;

// Blocking the use of the "Start" button to make the user select a date
lockingBtn(startBtn);

// The parameter object for the flatpickr function
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    const currentDate = new Date();
    if (selectedDate[0] <= currentDate) {
      lockingBtn(startBtn);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      unlockingBtn(startBtn);
      Notiflix.Notify.success('The selected date is correct. Press the "start" button to continue.');
    }
  },
};

// Flatpickr function call
flatpickr("#datetime-picker", options);

// Calling the function after clicking on the "start" button
startBtn.addEventListener("click", countdownTime);

// Countdown function
function countdownTime() {
  timer = setInterval(() => {
    lockingBtn(startBtn);

    const chosenDateInMs = new Date(chosenDate.value).getTime();
    const currentDateInMs = new Date().getTime();
    const timeLeft = chosenDateInMs - currentDateInMs;

    const {days, hours, minutes, seconds} = convertMs(timeLeft);

    daysOutput.innerHTML = (days.toString().length < 2) ? addLeadingZero(days) : days;
    hoursOutput.innerHTML = (hours.toString().length < 2) ? addLeadingZero(hours) : hours;
    minutesOutput.innerHTML = (minutes.toString().length < 2) ? addLeadingZero(minutes) : minutes;
    secondsOutput.innerHTML = (seconds.toString().length < 2) ? addLeadingZero(seconds) : seconds;

    if (timeLeft < 1000) {
      clearInterval(timer);
      unlockingBtn(startBtn);
    }
  }, 1000);
}

// A function that adds 0 to the numbers of timer components, when the number contains less than two symbols
function addLeadingZero(value) {
  valueToString = value.toString();
  return valueToString.padStart(2, "0");
}

// Function that converts Unix time to a number of days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function that locks the selected button
function lockingBtn(btnName) {
  btnName.disabled = true;
}

// Function that unlocks the selected button
function unlockingBtn(btnName) {
  btnName.disabled = false;
}
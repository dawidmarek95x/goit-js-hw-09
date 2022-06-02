import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector("button[data-start]");
const chosenDate = document.querySelector("#datetime-picker");
const daysOutput = document.querySelector("[data-days]");
const hoursOutput = document.querySelector("[data-hours]");
const minutesOutput = document.querySelector("[data-minutes]");
const secondsOutput = document.querySelector("[data-seconds]");

let timer = null;

lockingBtn(startBtn);

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

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", countdownTime);

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

    // Brakuje blokady buttona po wystartowaniu licznika!
  }, 1000);
}

function addLeadingZero(value) {
  valueToString = value.toString();
  return valueToString.padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
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
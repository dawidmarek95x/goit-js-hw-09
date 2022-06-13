// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Optimizing function (shortening the record) for searching for elements on the page
const qs = selector => document.querySelector(selector);

// Search for form.form element
const form = qs(".form");

// Input element values
const firstDelayInput = qs('[name="delay"]');
const delayStep = qs('[name="step"]');
const amount = qs('[name="amount"]');

// Calling the function after "submit" on the "Create promises" button
form.addEventListener("submit", createManyPromises);

// Event handler for making promises
function createManyPromises(e) {
  e.preventDefault();

  let delay = Number(firstDelayInput.value);

  for (let i = 1; i <= Number(amount.value); i++) {
    createPromise(i, delay)
    .then(value => value)
    .catch(error => error);
    delay += Number(delayStep.value);
  }
}

// A function that makes a promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}
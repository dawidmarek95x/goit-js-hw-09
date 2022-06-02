// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Search for form.form element
const form = document.querySelector(".form");

// Input element values
const firstDelayInput = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

// Calling the function after "submit" on the "Create promises" button
form.addEventListener("submit", createManyPromises);

// Event handler for making promises
function createManyPromises(evt) {
  evt.preventDefault();

  let delay = Number(firstDelayInput.value);

  for (let i = 1; i <= Number(amount.value); i++) {
    createPromise(i, delay)
    .then(({ i, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
    })
    .catch(({ i, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
    });
    delay += Number(delayStep.value);
  }
}

// A function that makes a promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}
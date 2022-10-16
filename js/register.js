import { USER_SIGNUP_URL } from './settings/api';
import { validatePassword, validateEmail } from './utils/validation';


const contactForm = document.querySelector('#register-form');
console.log(contactForm);

const name = document.querySelector('#first-name');
console.log(name);
const nameError = document.querySelector('#firstNameError');
console.log(nameError);

const email = document.querySelector('#email-address');
console.log(email);
const emailError = document.querySelector('#emailError');
console.log(emailError);
const emailErrorValid = document.querySelector('#emailErrorValid');
console.log(emailErrorValid);
const password = document.querySelector('#password');
console.log(password);
const passwordError = document.querySelector('#passwordError');
console.log(passwordError);
const confirmPassword = document.querySelector('#confirm-password');
console.log(confirmPassword);
const confirmPasswordError = document.querySelector('#ConfirmPasswordError');
console.log(confirmPasswordError);
const confirmPasswordErrorNotMatching = document.querySelector(
  '#ConfirmPasswordErrorNotMatching',
);
console.log(confirmPasswordErrorNotMatching);
const generalErrorMessage = document.querySelector('#error-message');
console.log(generalErrorMessage);

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let isName = false;
  if (name.value.trim().length > 0) {
    nameError.classList.add('hidden');
    isName = true;
  } else {
    nameError.classList.remove('hidden');
  }

  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailError.classList.add('hidden');
    isEmail = true;
  } else {
    emailError.classList.remove('hidden');
  }

  let isValidEmail = false;
  if (email.value.trim().length && validateEmail(email.value) === true) {
    emailErrorValid.classList.add('hidden');
    isValidEmail = true;
  } else if (email.value.trim().length && validateEmail(email.value) !== true) {
    emailErrorValid.classList.remove('hidden');
  }

  let isPassword = false;

  if (password.value.trim().length >= 8) {
    passwordError.classList.add('hidden');
    isPassword = true;
  } else {
    passwordError.classList.remove('hidden');
  }

  let isConfirmPassword = false;
  if (confirmPassword.value.trim().length >= 8) {
    confirmPasswordError.classList.add('hidden');
    isConfirmPassword = true;
  } else {
    confirmPasswordError.classList.remove('hidden');
  }

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword(
    password.value,
    confirmPassword.value,
  );
  if (isValidPasswordMatch) {
    confirmPasswordErrorNotMatching.classList.add('hidden');
    isValidPasswordMatch = true;
  } else {
    confirmPasswordErrorNotMatching.classList.remove('hidden');
  }
  let isFormValid =
    isName &&
    isEmail &&
    isValidEmail &&
    isPassword &&
    isConfirmPassword &&
    isValidPasswordMatch;

  if (isFormValid) {
    console.log('It worked!');
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    const REGISTER_USER_URL_ENDPOINT = USER_SIGNUP_URL;
    (async function signUpUser() {
      try {
        const response = await fetch(REGISTER_USER_URL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('We did it again homie');
          location.replace('/home.html');
        } else {
          generalErrorMessage.innerHTML = `Sorry ${data.message}`;
        }
      } catch (e) {
        console.log(e);
      }
    })();
  } else {
    console.log('Failed');
  }
});

import { USER_SIGNUP_URL } from './settings/api';
import { validatePassword, validateEmail } from './utils/validation';

const contactForm = document.querySelector('#register-form');
const name = document.querySelector('#first-name');
const nameError = document.querySelector('#firstNameError');
const email = document.querySelector('#email-address');
const emailError = document.querySelector('#emailError');
const emailErrorValid = document.querySelector('#emailErrorValid');
const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordError = document.querySelector('#ConfirmPasswordError');
const confirmPasswordErrorNotMatching = document.querySelector(
  '#ConfirmPasswordErrorNotMatching',
);
const generalErrorMessage = document.querySelector('#error-message');

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

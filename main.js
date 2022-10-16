import './style.css';
import { clearStorage } from './js/utils/storage';
import createHeaderBar from "./js/components/header";

createHeaderBar();



const logOutBtn = document.querySelector('#logout-btn');
if (logOutBtn) {
  logOutBtn.addEventListener('click', function () {
    console.log('I am clicked');
    clearStorage();
    window.location.replace('/login.html');
  });
}

const logoutArea = document.querySelector("#logout-state-area");
const formArea = document.querySelector("#login-form-area");
const InputId = formArea.querySelector("#user-id");
const guideInput = logoutArea.querySelector(".guide-area");
const loginArea = document.querySelector("#login-state-area");
const greeting = loginArea.querySelector("#greeting");
const btnLogout = loginArea.querySelector("#btn-logout");

const USER_NAME = "username";
const CLASSNAME_HIDDEN = "hidden";
// const savedUserName =

paintingGreeting();
formArea.addEventListener("submit", submitFormHandler);
btnLogout.addEventListener("click", clickingLogoutHandler);

function submitFormHandler(event) {
  event.preventDefault();
  localStorage.setItem(USER_NAME, InputId.value);
  InputId.value = "";
  paintingGreeting();
}
function clickingLogoutHandler(event) {
  event.preventDefault();
  localStorage.setItem(USER_NAME, "");
  paintingGreeting();
}
function paintingGreeting() {
  if (localStorage.getItem(USER_NAME)) {
    greeting.innerText = `환영합니다. ${localStorage.getItem(USER_NAME)}님!`;
    loginArea.classList.remove(CLASSNAME_HIDDEN);
    logoutArea.classList.add(CLASSNAME_HIDDEN);
  } else {
    logoutArea.classList.remove(CLASSNAME_HIDDEN);
    loginArea.classList.add(CLASSNAME_HIDDEN);
    InputId.focus();
  }
}

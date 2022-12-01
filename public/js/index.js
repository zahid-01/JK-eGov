import "@babel/polyfill";
import { login, logout } from "./login";
import { signUp } from "./signUp";

const loginForm = document.querySelector(".login--form");
const signUpForm = document.querySelector(".signUp--form");
const logoutBtn = document.querySelector(".log-outBtn");
console.log("hello from the script");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signUp(name, email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
  });
}

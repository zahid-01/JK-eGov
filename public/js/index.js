import { login, logout } from "./login";
import { signUp } from "./signUp";
import { addUlb } from "./ulbForm";

const loginForm = document.querySelector(".login--form");
const signUpForm = document.querySelector(".signUp--form");
const logoutBtn = document.querySelector(".log-outBtn");
const ulbForm = document.getElementById("ulb--form");
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

if (ulbForm) {
  ulbForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.values({ ...ulbForm.dataset })[0].toString();

    const form = new FormData();
    form.append("ulbName", document.getElementById("ulbName").value);
    form.append("ulbCode", document.getElementById("ulbCode").value);
    form.append("district", document.getElementById("district").value);
    form.append("noOfWards", document.getElementById("noOfWards").value);
    form.append("noOfHouseHolds", document.getElementById("noOfHouseHolds").value);
    form.append("population", document.getElementById("population").value);
    form.append("visitingOfficer", data);
    await addUlb(form);
  });
}

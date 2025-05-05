import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { loginUser } from "./loginUser.js";
import { loginUrl } from "/js/components/constants/urls.js";

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

const formButton = document.querySelector("#form-button");

formButton.onclick = function (event) {
  event.preventDefault();

  const userEmail = document.querySelector("#email").value;
  const userPassword = document.querySelector("#password").value;

  const userToLogin = {
    email: userEmail,
    password: userPassword,
  };

  loginUser(loginUrl, userToLogin);
};

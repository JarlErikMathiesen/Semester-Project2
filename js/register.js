import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { loginUser, loginUrl } from "./loginUser.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";

updateNavDisplay();

navBarLogStatus();

window.addEventListener("resize", updateNavDisplay);

const API_BASE_URL = "https://v2.api.noroff.dev";
const registerUrl = `${API_BASE_URL}/auth/register`;

const userName = document.querySelector("#fullname");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const formButton = document.querySelector("#form-button");
const loadedHtml = document.querySelector("#loaded-html");
const closeButton = document.querySelector("#data-close-modal");
const modal = document.querySelector("#data-modal");

formButton.onclick = function (event) {
  event.preventDefault();

  const userNameValue = userName.value;
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;

  const userToRegister = {
    name: userNameValue,
    email: userEmailValue,
    password: userPasswordValue,
  };

  registerUser(registerUrl, userToRegister);
};

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      loginUser(loginUrl, { email: data.email, password: data.password });
    } else {
      while (loadedHtml.firstChild) {
        loadedHtml.removeChild(loadedHtml.firstChild);
      }
      json.errors.forEach((error) => {
        console.log(error.message);
        const appendedHtml = document.createElement("div");
        appendedHtml.classList.add("mt-2");
        appendedHtml.innerText = error.message;
        loadedHtml.append(appendedHtml);
        modal.showModal();
      });
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

closeButton.addEventListener("click", () => {
  modal.close();
});

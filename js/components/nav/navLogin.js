import { token } from "../../constants.js";
import { updateNavDisplay } from "./hamburgermenu.js";

const navBarLogin = document.querySelector(".nav-header");

console.log(token);

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

export function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}

export function navBarLogStatus() {
  const indexLinkElement = document.createElement("a");
  indexLinkElement.href = "index.html";
  indexLinkElement.textContent = "home";
  navBarLogin.appendChild(indexLinkElement);

  const auctionLinkElement = document.createElement("a");
  auctionLinkElement.href = "auctions.html";
  auctionLinkElement.textContent = "auctions";
  navBarLogin.appendChild(auctionLinkElement);

  const registerLinkElement = document.createElement("a");
  registerLinkElement.href = "register.html";
  registerLinkElement.textContent = "register";
  navBarLogin.appendChild(registerLinkElement);

  if (isLoggedIn() === true) {
    const logoutLinkElement = document.createElement("a");
    logoutLinkElement.href = "#";
    logoutLinkElement.textContent = "logout";
    logoutLinkElement.id = "logOut";
    navBarLogin.appendChild(logoutLinkElement);

    const profileLinkElement = document.createElement("a");
    profileLinkElement.href = "profile.html";
    profileLinkElement.textContent = "profile";
    navBarLogin.appendChild(profileLinkElement);
    /* navBarLogin.innerHTML += `<a href="index.html">home</a>
    <a href="auctions.html">auctions</a>
    <a href="#" id="logOut">logout</a>
    <a href="profile.html">profile</a>`; */
  } else {
    const loginLinkElement = document.createElement("a");
    loginLinkElement.href = "login.html";
    loginLinkElement.textContent = "login";
    navBarLogin.appendChild(loginLinkElement);

    /* navBarLogin.innerHTML = `<a href="index.html">home</a>
        <a href="auctions.html">auctions</a>
        <a href="login.html">login</a>`; */
  }

  const logoutButton = document.querySelector("#logOut");

  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userToken");
      location.reload();
    });
  }
}

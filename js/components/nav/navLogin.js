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
  if (isLoggedIn() === true) {
    navBarLogin.innerHTML = `<a href="index.html">home</a>
    <a href="auctions.html">auctions</a>
    <a href="#" id="logOut">logout</a>
    <a href="profile.html">profile</a>`;
  } else {
    navBarLogin.innerHTML = `<a href="index.html">home</a>
        <a href="auctions.html">auctions</a>
        <a href="login.html">login</a>`;
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

/* if (token) {
  navBarLogin.innerHTML = `<a href="index.html">home</a>
        <a href="auctions.html">auctions</a>
        <a href="about.html">about</a>
        <a href="index.html" id="logOut">logout</a>
        <a href="profile.html">profile</a>`;
} else {
  navBarLogin.innerHTML = `<a href="index.html">home</a>
        <a href="auctions.html">auctions</a>
        <a href="about.html">about</a>
        <a href="login.html">login</a>`;
} */

navBarLogStatus();

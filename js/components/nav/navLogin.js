import { token } from "../../constants.js";
import { updateNavDisplay } from "./hamburgermenu.js";

const navBarLogin = document.querySelector(".nav-header");

console.log(token);

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

export function isLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}

function createNavLink(href, textContent) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = textContent;

  let currentPath = window.location.pathname.split("/").pop();

  if (currentPath === "") {
    currentPath = "index.html";
  }

  const targetPath = href;

  if (currentPath === targetPath) {
    link.className = "border-b-2 border-accent text-accent";
  } else {
    link.className = "hover:border-b-2 hover:border-accent transition";
  }

  return link;
}

export function navBarLogStatus() {
  navBarLogin.appendChild(createNavLink("index.html", "home"));
  navBarLogin.appendChild(createNavLink("auctions.html", "auctions"));
  navBarLogin.appendChild(createNavLink("register.html", "register"));

  if (isLoggedIn()) {
    navBarLogin.appendChild(createNavLink("profile.html", "profile"));

    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.textContent = "logout";
    logoutLink.id = "logOut";
    logoutLink.className = "hover:border-b-2";
    navBarLogin.appendChild(logoutLink);

    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userToken");
      location.reload();
    });
  } else {
    navBarLogin.appendChild(createNavLink("login.html", "login"));
  }
}

import { updateNavDisplay } from "./hamburgermenu.js";
import { methodWithToken, getOptions } from "/js/components/API/fetchAPI.js";
import { profileUrl } from "/js/components/constants/urls.js";

const navBarLogin = document.querySelector(".nav-header");

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

    async function renderCreditsInNav(url, fetchOptions) {
      const json = await methodWithToken(url, fetchOptions);

      const item = json.data;

      const { credits } = item;

      const creditsDiv = document.createElement("div");
      creditsDiv.className =
        "cards text-white bg-[var(--antique-gold)] rounded-full px-4 py-1 text-lg";
      creditsDiv.textContent = `Credits: ${credits}`;
      navBarLogin.appendChild(creditsDiv);
    }

    renderCreditsInNav(profileUrl, getOptions);

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

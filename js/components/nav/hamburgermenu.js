const hamburgerButton = document.querySelector("#hamburger-btn");
const navHeader = document.querySelector(".nav-header");

hamburgerButton.addEventListener("click", () => {
  navHeader.classList.toggle("hidden");
});

function updateNavDisplay() {
  const isHamburgerHidden =
    window.getComputedStyle(hamburgerButton).display === "none";

  if (isHamburgerHidden) {
    navHeader.classList.remove("hidden", "nav-header-hamburger", "grid");
    navHeader.classList.add("flex");
  } else {
    navHeader.classList.add("hidden", "nav-header-hamburger", "grid");
    navHeader.classList.remove("flex");
  }
}

updateNavDisplay();
window.addEventListener("resize", updateNavDisplay);

import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";

window.addEventListener("resize", updateNavDisplay);

updateNavDisplay();

navBarLogStatus();

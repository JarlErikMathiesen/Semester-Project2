import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { urlIdQueryParameter } from "/js/components/constants/urls.js";
import { getApiWithToken, containerItem } from "/js/components/API/fetchAPI.js";
import { renderItem } from "/js/components/cards/itemcard.js";

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

console.log(urlIdQueryParameter);

getApiWithToken(urlIdQueryParameter, renderItem, containerItem);

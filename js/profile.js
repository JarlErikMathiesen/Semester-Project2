import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import {
  profileUrl,
  profileUrlListings,
} from "/js/components/constants/urls.js";
import {
  containerAPI,
  getApiWithToken,
  loadedProfile,
} from "/js/components/API/fetchAPI.js";
import { renderAPI } from "/js/components/cards/auctioncards.js";
import { renderProfile } from "/js/components/cards/profilecard.js";

window.addEventListener("resize", updateNavDisplay);

updateNavDisplay();

navBarLogStatus();

getApiWithToken(profileUrl, renderProfile, loadedProfile);

getApiWithToken(profileUrlListings, renderAPI, containerAPI);

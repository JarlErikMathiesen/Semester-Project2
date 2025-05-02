import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { getApi, containerAPI } from "/js/components/API/fetchAPI.js";
import { renderAPI } from "/js/components/cards/auctioncards.js";

window.addEventListener("resize", updateNavDisplay);

updateNavDisplay();

navBarLogStatus();

const url = "https://v2.api.noroff.dev/auction/listings";

const queryParameter =
  "?_bids=true&_seller=true&_active=true&page=1&limit=6&sort=endsAt&sortOrder=asc";

const urlQueryParameter = url + queryParameter;

getApi(urlQueryParameter, renderSoonestEnding, containerAPI);

function renderSoonestEnding(listings) {
  const now = new Date();

  const activeListings = listings.filter(
    (listing) => new Date(listing.endsAt) > now,
  );

  const sortedListings = activeListings.sort(
    (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
  );

  renderAPI(sortedListings);
}

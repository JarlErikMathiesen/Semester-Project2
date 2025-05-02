import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import {
  urlQueryParameter,
  urlActive,
  urlAscending,
  urlDescending,
  urlInactive,
} from "./components/constants/urls.js";
import {
  getApi,
  containerAPI,
  showLoader,
  urlPar,
} from "/js/components/API/fetchAPI.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { renderAPI } from "/js/components/cards/auctioncards.js";

const searchBar = document.querySelector("#search-bar");
const sortSelector = document.querySelector("#sort-options");

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

getApi(urlQueryParameter, renderAPI, containerAPI);

let allItems = [];

async function fetchAllListings(query) {
  let page = 1;
  let pageSize = 10;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${query}&_bids=true&page=${page}&limit=${pageSize}`,
    );
    const json = await response.json();
    const data = json.data;

    allItems = allItems.concat(data);

    if (data.length < pageSize) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allItems;
}

searchBar.onkeyup = async (event) => {
  const searchValue = event.target.value.toLowerCase();
  if (!searchValue) return;

  showLoader(containerAPI);

  const allListings = await fetchAllListings(searchValue);

  const filtered = allListings.filter((item) =>
    item.title.toLowerCase().startsWith(searchValue),
  );

  containerAPI.innerHTML = "";
  renderAPI(filtered);
};

sortSelector.addEventListener("change", (event) => {
  const selectedSort = event.target.value;

  if (selectedSort === "active") {
    getApi(urlActive, renderAPI, containerAPI);
  } else if (selectedSort === "ascending") {
    getApi(urlAscending, renderAPI, containerAPI);
  } else if (selectedSort === "descending") {
    getApi(urlDescending, renderAPI, containerAPI);
  } else if (selectedSort === "inactive") {
    getApi(urlInactive, renderAPI, containerAPI);
  }
});

console.log(urlPar);

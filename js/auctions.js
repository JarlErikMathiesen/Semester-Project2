import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import {
  urlActive,
  urlAscending,
  urlDescending,
  urlInactive,
  urlLatest,
  profileUrlListings,
} from "./components/constants/urls.js";
import {
  getApi,
  containerAPI,
  showLoader,
  getApiWithToken,
} from "/js/components/API/fetchAPI.js";
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { renderAPI } from "/js/components/cards/auctioncards.js";

const searchBar = document.querySelector("#search-bar");
const sortSelector = document.querySelector("#sort-options");
const filterSelector = document.querySelector("#filter-options");

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

getApi(urlLatest, renderAPI, containerAPI);

let allItems = [];

async function fetchAllListings(query) {
  let page = 1;
  let pageSize = 100;
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

const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", async () => {
  const searchValue = searchBar.value.toLowerCase();
  if (!searchValue) return;

  showLoader(containerAPI);

  const allListings = await fetchAllListings(searchValue);

  const filtered = allListings.filter((item) =>
    item.title.toLowerCase().startsWith(searchValue),
  );

  containerAPI.innerHTML = "";
  renderAPI(filtered);
  console.log(filtered);
});

sortSelector.addEventListener("change", (event) => {
  const selectedSort = event.target.value;

  if (selectedSort === "ascending") {
    getApi(urlAscending, renderAPI, containerAPI);
  } else if (selectedSort === "descending") {
    getApi(urlDescending, renderAPI, containerAPI);
  }
});

filterSelector.addEventListener("change", async (event) => {
  const selectedFilter = event.target.value;

  if (selectedFilter === "users-listings") {
    getApiWithToken(profileUrlListings, renderAPI, containerAPI);
  } else if (selectedFilter === "active") {
    getApi(urlActive, renderAPI, containerAPI);
  } else if (selectedFilter === "inactive") {
    getApi(urlInactive, renderAPI, containerAPI);
  }
});

console.log(urlInactive);

import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
/* import { getApi, url } from "/js/components/API/fetchAPI.js"; */
import { navBarLogStatus } from "./components/nav/navLogin.js";
import { getTimeRemaining } from "./components/time/time.js";

const url = `https://v2.api.noroff.dev/auction/listings?_bids=true`;

const searchBar = document.querySelector("#search-bar");
const containerAPI = document.querySelector(".api-container");
const sortSelector = document.querySelector("#sort-options");

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

function showLoader() {
  containerAPI.innerHTML = `
    <div class="loader-container col-span-full flex justify-center items-center min-h-64">
      <div class="loader animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  `;
}

function hideLoader() {
  containerAPI.innerHTML = "";
}

async function getApi(url) {
  try {
    showLoader();
    const response = await fetch(url);
    const json = await response.json();
    const jsonData = json.data;

    console.log(jsonData);

    renderAPI(jsonData);
  } catch (error) {
    console.log(error);
  }
}

getApi(url);

async function renderAPI(array) {
  console.log(array);

  hideLoader();
  containerAPI.innerHTML = "";

  if (!array.length) {
    containerAPI.innerHTML = `<p class="text-center text-gray-600 py-10">No results found.</p>`;
    return;
  }

  const items = array;

  items.forEach((item) => {
    const { title, endsAt, media, id, bids } = item;

    const sortedBids = bids.sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );

    const imageFirst = media?.[0]?.url || "images/noimage.webp";
    const imageFirstAlt = media?.[0]?.alt;

    let days = getTimeRemaining(endsAt);

    // Create the outer div container for the grid
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid", "mb-10");

    // Create the main card div
    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "grid",
      "shadow-xl",
      "rounded-md",
      "overflow-hidden",
    );
    gridElement.appendChild(cardElement);

    // Create the image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add(
      "w-full",
      "h-64",
      "sm:h-72",
      "md:h-80",
      "lg:h-96",
      "object-cover",
    );

    const imageElement = document.createElement("img");
    imageElement.src = imageFirst;
    imageElement.onerror = function () {
      this.src = "images/noimage.webp";
    };
    imageElement.alt = imageFirstAlt;
    imageElement.classList.add("w-full", "h-full", "object-cover");
    imageContainer.appendChild(imageElement);
    cardElement.appendChild(imageContainer);

    // Create the body of the card
    const cardBodyElement = document.createElement("div");
    cardBodyElement.classList.add(
      "p-4",
      "grid",
      "grid-cols-full",
      "font-extralight",
    );
    cardElement.appendChild(cardBodyElement);

    // Create the title
    const titleElement = document.createElement("h3");
    titleElement.classList.add("truncate", "font-bold", "border-b");
    titleElement.innerText = title;
    cardBodyElement.appendChild(titleElement);

    // Create the time and price section
    const timePriceSection = document.createElement("div");
    timePriceSection.classList.add("grid", "grid-flow-col", "pt-2");

    const timeElement = document.createElement("div");
    timeElement.classList.add("border-r");

    const timeTextElement = document.createElement("p");
    timeTextElement.classList.add("text-base", "font-semibold");
    timeTextElement.innerText = days;
    timeElement.appendChild(timeTextElement);
    timePriceSection.appendChild(timeElement);

    const priceElement = document.createElement("div");
    priceElement.classList.add("justify-items-end", "text-end");

    const priceLabel = document.createElement("p");
    priceLabel.classList.add("text-sm");
    if (days === "Auction ended") {
      priceLabel.innerText = "Ending bid";
    } else {
      priceLabel.innerText = "Current price";
    }
    priceElement.appendChild(priceLabel);

    const priceValue = document.createElement("p");
    priceValue.classList.add("text-2xl");
    priceValue.innerText = sortedBids[0] ? "$" + sortedBids[0].amount : "$0";

    priceElement.appendChild(priceValue);
    timePriceSection.appendChild(priceElement);

    cardBodyElement.appendChild(timePriceSection);

    // Create the bid button
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("col-span-full");

    const bidButton = document.createElement("a");
    bidButton.href = `item.html?id=${id}`;
    bidButton.classList.add("btn", "w-full", "mt-10", "block", "text-center");
    if (days === "Auction ended") {
      bidButton.classList.add("btn-sold");
      bidButton.innerText = "Auction ended";
    } else {
      bidButton.classList.add("btn-secondary");
      bidButton.innerText = "Bid";
    }

    buttonContainer.appendChild(bidButton);
    cardBodyElement.appendChild(buttonContainer);

    // Append the grid element to the container
    containerAPI.appendChild(gridElement);
  });
}

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

searchBar.onkeyup = async (event) => {
  const searchValue = event.target.value.toLowerCase();
  if (!searchValue) return;

  showLoader();

  const allListings = await fetchAllListings(searchValue);

  const filtered = allListings.filter((item) =>
    item.title.toLowerCase().startsWith(searchValue),
  );

  containerAPI.innerHTML = "";
  renderAPI(filtered);
};

sortSelector.addEventListener("change", (event) => {
  const selectedSort = event.target.value;

  let activeListing = "&_active=true";
  const urlActive = url + activeListing;

  let ascendingListing = "&sortOrder=asc";
  const urlAscending = url + ascendingListing;

  if (selectedSort === "active") {
    getApi(urlActive);
  } else if (selectedSort === "ascending") {
    getApi(urlAscending);
  } else if (selectedSort === "descending") {
    let descendingListing = "&sortOrder=desc";
    const urlDescending = url + descendingListing;
    getApi(urlDescending);
  } else if (selectedSort === "inactive") {
    let inactiveListing = "&_active=false";
    const urlInactive = url + inactiveListing;
    getApi(urlInactive);
  }
});

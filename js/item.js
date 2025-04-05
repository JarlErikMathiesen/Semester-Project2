import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
import { fetchHeader } from "./constants.js";
import { isLoggedIn } from "./components/nav/navLogin.js";

console.log(isLoggedIn());

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

const urlPar = new URLSearchParams(document.location.search);
const id = urlPar.get("id");

console.log(id);

const url = "https://v2.api.noroff.dev/auction/listings";
const queryParameter = "?_bids=true&_seller=true";
const urlId = url + "/" + id;
const urlIdQueryParameter = urlId + queryParameter;

console.log(url);

console.log(urlIdQueryParameter);

async function getApi(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    renderItem(json);
  } catch (error) {
    console.log(error);
  }
}

getApi(urlIdQueryParameter);

const containerItem = document.querySelector(".item-container");

async function renderItem(object) {
  console.log(object);

  const item = object.data;

  const { title, endsAt, media, description } = item;

  const imageFirst = media?.[0]?.url || "images/noimage.webp";
  const imageFirstAlt = media?.[0]?.alt;

  console.log(imageFirst);
  console.log(imageFirstAlt);

  function getTimeRemaining(endsAt) {
    const now = new Date();
    const endTime = new Date(endsAt);
    const timeDiff = endTime - now;

    if (timeDiff <= 0) {
      return "Auction ended";
    }

    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

    return days > 0
      ? `${days} day${days > 1 ? "s" : ""} left`
      : `${hours}h ${minutes}m left`;
  }

  let days = getTimeRemaining(endsAt);

  console.log(title);

  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("max-w-md", "w-full");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("mb-6");
  const imageElement = document.createElement("img");
  imageElement.src = imageFirst;
  imageElement.alt = imageFirstAlt || "Auction item image";
  imageElement.classList.add("w-full", "h-auto", "rounded-md");
  imageContainer.appendChild(imageElement);
  itemWrapper.appendChild(imageContainer);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("mb-6");

  const titleContainer = document.createElement("div");
  titleContainer.classList.add(
    "flex",
    "justify-between",
    "items-start",
    "mb-2",
  );
  const titleElement = document.createElement("h1");
  titleElement.classList.add("text-2xl", "font-semibold");
  titleElement.textContent = title;
  const timeLeft = document.createElement("div");
  timeLeft.classList.add("text-sm", "text-gray-500");
  timeLeft.textContent = days;
  titleContainer.appendChild(titleElement);
  titleContainer.appendChild(timeLeft);
  contentContainer.appendChild(titleContainer);

  const bidSection = document.createElement("div");
  bidSection.classList.add("border-t", "pt-4", "mb-6");

  const bidHistorySection = document.createElement("div");
  bidHistorySection.classList.add("border-t", "pt-4", "mb-6");

  const bidHistoryTitle = document.createElement("h2");
  bidHistoryTitle.classList.add("text-lg", "font-semibold", "mb-2");
  bidHistoryTitle.textContent = "Bid History";

  const bidHistoryList = document.createElement("ul");

  if (item.bids && item.bids.length > 0) {
    item.bids.forEach((bid) => {
      const bidEntry = document.createElement("li");
      bidEntry.classList.add(
        "flex",
        "justify-between",
        "even:bg-gray-100",
        "p-2",
      );
      bidHistoryList.appendChild(bidEntry);
      const bidderEntry = document.createElement("span");
      bidderEntry.classList.add("text-gray-700");
      bidderEntry.textContent = `${bid.bidder.name}`;
      bidEntry.appendChild(bidderEntry);
      const amountEntry = document.createElement("span");
      amountEntry.classList.add("font-semibold");
      amountEntry.textContent = `$${bid.amount}`;
      bidEntry.appendChild(amountEntry);
    });
  } else {
    const noBids = document.createElement("p");
    noBids.classList.add("text-sm", "text-gray-500");
    noBids.textContent = "No bids placed yet.";
    bidHistoryList.appendChild(noBids);
  }

  bidHistorySection.appendChild(bidHistoryTitle);
  bidHistorySection.appendChild(bidHistoryList);

  contentContainer.appendChild(bidHistorySection);

  const bidHeader = document.createElement("div");
  bidHeader.classList.add("flex", "justify-between", "items-center", "mb-4");

  const bidLabel = document.createElement("span");
  bidLabel.classList.add("text-gray-700");
  bidLabel.textContent = "Your bid:";

  const bidInputWrapper = document.createElement("div");
  bidInputWrapper.classList.add("flex", "items-center");

  const bidSymbol = document.createElement("span");
  bidSymbol.classList.add("text-xl", "font-semibold", "mr-2");
  bidSymbol.textContent = "$";

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.classList.add(
    "w-24",
    "px-3",
    "py-2",
    "border",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-1",
    "focus:ring-[var(--emerald-green)]",
  );

  bidInputWrapper.appendChild(bidSymbol);
  bidInputWrapper.appendChild(bidInput);

  bidHeader.appendChild(bidLabel);
  bidHeader.appendChild(bidInputWrapper);

  bidSection.appendChild(bidHeader);

  const minBidText = document.createElement("p");
  minBidText.classList.add("text-sm", "text-gray-600", "mb-4");
  minBidText.textContent = "Minimum bid: 24$ or enter your own higher amount";
  bidSection.appendChild(minBidText);

  const bidButton = document.createElement("button");
  bidButton.classList.add("btn", "btn-secondary", "w-full", "mb-6");
  bidButton.textContent = "Place Bid";
  bidSection.appendChild(bidButton);

  const urlBid = urlId + "/bids";

  console.log(urlBid);

  bidButton.addEventListener("click", async function () {
    const bidNumber = Number(bidInput.value);

    let data = {
      ...(bidNumber !== "" && { amount: bidNumber }),
    };
    console.log(bidNumber);
    const postOptions = {
      method: "POST",
      headers: fetchHeader,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(urlBid, postOptions);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  });

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("border-t", "pt-4");
  const descriptionElementP = document.createElement("p");
  descriptionElementP.classList.add("text-gray-800", "mb-4");
  descriptionElementP.textContent = `${description}`;
  descriptionElement.appendChild(descriptionElementP);
  bidSection.appendChild(descriptionElement);

  contentContainer.appendChild(bidSection);
  itemWrapper.appendChild(contentContainer);

  containerItem.appendChild(itemWrapper);
}

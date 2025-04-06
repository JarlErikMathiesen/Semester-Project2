import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
/* import { getApi, url } from "/js/components/API/fetchAPI.js"; */
import { navBarLogStatus } from "./components/nav/navLogin.js";

updateNavDisplay();

window.addEventListener("resize", updateNavDisplay);

navBarLogStatus();

const url = "https://v2.api.noroff.dev/auction/listings?_active=true";

async function getApi(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    renderAPI(json);
  } catch (error) {
    console.log(error);
  }
}

getApi(url);

const containerAPI = document.querySelector(".api-container");

async function renderAPI(array) {
  console.log(array);

  const items = array.data;

  items.forEach((item) => {
    const { title, endsAt, media, id } = item;

    const imageFirst = media?.[0]?.url || "images/noimage.webp";
    const imageFirstAlt = media?.[0]?.alt;

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
    priceValue.innerText = "$123";
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

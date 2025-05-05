import { containerAPI } from "/js/components/API/fetchAPI.js";
import { getTimeRemaining } from "/js/components/time/time.js";
import {
  userListing,
  profileName,
} from "/js/components/constants/constants.js";

export async function renderAPI(array) {
  containerAPI.innerHTML = "";

  if (!array.length) {
    containerAPI.innerHTML = `<p class="text-center text-gray-600 py-10">No results found.</p>`;
    return;
  }

  const items = array;

  items.forEach((item) => {
    const { title, endsAt, media, id, bids, seller } = item;

    const sortedBids = bids.sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );

    const sellerName = seller?.name || "no name";
    const imageFirst = media?.[0]?.url || "images/noimage.webp";
    const imageFirstAlt = media?.[0]?.alt;
    const isUserListing = userListing(profileName, sellerName);

    let timeLeft = getTimeRemaining(endsAt);

    const gridElement = document.createElement("div");
    gridElement.classList.add("grid", "mb-10");

    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "grid",
      "shadow-xl",
      "rounded-md",
      "overflow-hidden",
    );
    gridElement.appendChild(cardElement);

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

    const cardBodyElement = document.createElement("div");
    cardBodyElement.classList.add(
      "p-4",
      "grid",
      "grid-cols-full",
      "font-extralight",
    );
    cardElement.appendChild(cardBodyElement);

    const titleElement = document.createElement("h3");
    titleElement.classList.add("truncate", "font-bold", "border-b");
    titleElement.innerText = title;
    cardBodyElement.appendChild(titleElement);

    const timePriceSection = document.createElement("div");
    timePriceSection.classList.add("grid", "grid-flow-col", "pt-2");

    const timeElement = document.createElement("div");
    timeElement.classList.add("border-r");

    const timeTextElement = document.createElement("p");
    timeTextElement.classList.add("text-base", "font-semibold");
    timeTextElement.innerText = timeLeft;
    timeElement.appendChild(timeTextElement);
    timePriceSection.appendChild(timeElement);

    const priceElement = document.createElement("div");
    priceElement.classList.add("justify-items-end", "text-end");

    const priceLabel = document.createElement("p");
    priceLabel.classList.add("text-sm");
    if (timeLeft === "Auction ended") {
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

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("col-span-full");

    const bidButton = document.createElement("a");
    bidButton.href = `item.html?id=${id}`;
    bidButton.classList.add("btn", "w-full", "mt-10", "block", "text-center");
    if (isUserListing) {
      bidButton.classList.add("btn-primary");
      bidButton.textContent = "Edit listing";
    } else if (timeLeft === "Auction ended") {
      bidButton.classList.add("btn-sold");
      bidButton.innerText = "Auction ended";
    } else {
      bidButton.classList.add("btn-secondary");
      bidButton.innerText = "Bid";
    }

    buttonContainer.appendChild(bidButton);
    cardBodyElement.appendChild(buttonContainer);

    containerAPI.appendChild(gridElement);
  });
}

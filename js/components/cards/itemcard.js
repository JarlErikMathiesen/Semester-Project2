import { getTimeRemaining } from "/js/components/time/time.js";
import { isLoggedIn } from "/js/components/nav/navLogin.js";
import { urlId, containerItem } from "/js/components/API/fetchAPI.js";
import { fetchHeader } from "../../constants.js";

export async function renderItem(object) {
  const item = object;

  const sortedBids = item.bids.sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );

  const latestBidPlussOne =
    sortedBids.length > 0 ? sortedBids[0].amount + 1 : 1;

  const { title, endsAt, media, description } = item;

  const imageFirst = media?.[0]?.url || "images/noimage.webp";
  const imageFirstAlt = media?.[0]?.alt;

  let timeLeft = getTimeRemaining(endsAt);

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
  const timeElement = document.createElement("div");
  timeElement.classList.add("text-sm", "text-gray-500");
  timeElement.textContent = timeLeft;
  titleContainer.appendChild(titleElement);
  titleContainer.appendChild(timeElement);
  contentContainer.appendChild(titleContainer);

  const bidSection = document.createElement("div");
  bidSection.classList.add("border-t", "pt-4", "mb-6");

  const bidHistorySection = document.createElement("div");
  bidHistorySection.classList.add("border-t", "pt-4", "mb-6");

  const bidHistoryTitle = document.createElement("h2");
  bidHistoryTitle.classList.add("text-lg", "font-semibold", "mb-2");
  bidHistoryTitle.textContent = "Bid History";

  const bidHistoryList = document.createElement("ul");

  if (!isLoggedIn()) {
    const notLoggedin = document.createElement("p");
    notLoggedin.classList.add("text-sm", "text-gray-500");
    notLoggedin.textContent = "Log in to view bids";
    bidHistoryList.appendChild(notLoggedin);
  } else if (item.bids && item.bids.length > 0) {
    sortedBids.forEach((bid) => {
      const bidEntry = document.createElement("li");
      bidEntry.classList.add(
        "flex",
        "justify-between",
        "even:bg-gray-100",
        "p-2",
      );

      const bidderEntry = document.createElement("span");
      bidderEntry.classList.add("text-gray-700");
      bidderEntry.textContent = bid.bidder.name;

      const amountEntry = document.createElement("span");
      amountEntry.classList.add("font-semibold");
      amountEntry.textContent = `$${bid.amount}`;

      bidEntry.appendChild(bidderEntry);
      bidEntry.appendChild(amountEntry);
      bidHistoryList.appendChild(bidEntry);
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
  bidInput.value = latestBidPlussOne;
  bidInput.min = latestBidPlussOne;

  bidInputWrapper.appendChild(bidSymbol);
  bidInputWrapper.appendChild(bidInput);

  bidHeader.appendChild(bidLabel);
  bidHeader.appendChild(bidInputWrapper);

  bidSection.appendChild(bidHeader);

  const minBidText = document.createElement("p");
  minBidText.classList.add("text-sm", "text-gray-600", "mb-4");
  minBidText.textContent = `Minimum bid: ${latestBidPlussOne}$ or enter your own higher amount`;
  bidSection.appendChild(minBidText);

  if (isLoggedIn() && timeLeft !== "Auction ended") {
    const bidButton = document.createElement("button");
    bidButton.classList.add("btn", "btn-secondary", "w-full", "mb-6");
    bidButton.textContent = "Place Bid";
    bidSection.appendChild(bidButton);

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
        await response.json();
        window.location.reload();
      } catch (error) {
        console.error("Error posting bid:", error);
      }
    });
  } else if (isLoggedIn() && timeLeft === "Auction ended") {
    const bidButton = document.createElement("button");
    bidButton.classList.add("btn", "btn-sold", "w-full", "mb-6");
    bidButton.textContent = "Auction ended";
    bidSection.appendChild(bidButton);
  } else {
    const loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.textContent = "Log in to place a bid";
    loginLink.classList.add(
      "btn",
      "btn-primary",
      "w-full",
      "mb-6",
      "block",
      "text-center",
    );
    bidSection.appendChild(loginLink);
  }

  const urlBid = urlId + "/bids";

  console.log(urlBid);

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("border-t", "pt-4");
  const descriptionElementP = document.createElement("p");
  descriptionElementP.classList.add("text-gray-800", "mb-4");
  descriptionElementP.textContent = `${description || "No description"}`;
  descriptionElement.appendChild(descriptionElementP);
  bidSection.appendChild(descriptionElement);

  contentContainer.appendChild(bidSection);
  itemWrapper.appendChild(contentContainer);

  containerItem.appendChild(itemWrapper);
}

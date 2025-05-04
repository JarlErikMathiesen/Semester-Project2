import { getTimeRemaining } from "/js/components/time/time.js";
import { isLoggedIn } from "/js/components/nav/navLogin.js";
import {
  containerItem,
  methodWithToken,
  deleteOptions,
  createOptions,
} from "/js/components/API/fetchAPI.js";
import { userListing, profileName } from "../../constants.js";
import { urlId } from "/js/components/constants/urls.js";

export async function renderItem(object) {
  const item = object;

  const sortedBids = item.bids.sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );

  const latestBidPlussOne =
    sortedBids.length > 0 ? sortedBids[0].amount + 1 : 1;

  const { title, endsAt, media, description, seller } = item;

  const imageFirst = media?.[0]?.url || "images/noimage.webp";
  const imageFirstAlt = media?.[0]?.alt;
  const sellerName = seller?.name || "no name";

  let timeLeft = getTimeRemaining(endsAt);

  console.log(title);
  console.log(sellerName);
  console.log(profileName);
  console.log(userListing(profileName, sellerName));
  console.log(urlId);

  const isUserListing = userListing(profileName, sellerName);

  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("max-w-md", "w-full");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("mb-6");
  const imageElement = document.createElement("img");
  imageElement.src = imageFirst;
  imageElement.onerror = function () {
    this.src = "images/noimage.webp";
  };
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

  const nameElement = document.createElement("p");
  nameElement.classList.add("text-xl", "border-t");
  nameElement.textContent = "seller: " + sellerName;
  contentContainer.appendChild(nameElement);

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

  if (isLoggedIn() && isUserListing) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-primary", "w-full", "mb-6");
    editButton.textContent = "Edit listing";
    bidSection.appendChild(editButton);

    editButton.addEventListener("click", () => {
      let formWrapper = document.querySelector("#editFormWrapper");

      if (formWrapper) {
        formWrapper.remove();
      } else {
        formWrapper = document.createElement("div");
        formWrapper.id = "editFormWrapper";
        formWrapper.className = "mb-2";

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "titleInput");
        titleLabel.textContent = "Title";
        titleLabel.className = "block mb-1 font-medium";

        const titleInput = document.createElement("input");
        titleInput.id = "titleInput";
        titleInput.type = "text";
        titleInput.placeholder = "Enter new title...";
        titleInput.className =
          "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

        const imageLabel = document.createElement("label");
        imageLabel.setAttribute("for", "imageInput");
        imageLabel.textContent = "Image URL";
        imageLabel.className = "block mb-1 font-medium";

        const imageInput = document.createElement("input");
        imageInput.id = "imageInput";
        imageInput.type = "text";
        imageInput.placeholder = "Enter new image URL...";
        imageInput.className =
          "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "descriptionInput");
        descriptionLabel.textContent = "Description";
        descriptionLabel.className = "block mb-1 font-medium";

        const descriptionInput = document.createElement("input");
        descriptionInput.id = "descriptionInput";
        descriptionInput.type = "text";
        descriptionInput.placeholder = "Enter new description...";
        descriptionInput.className =
          "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

        const deadlineLabel = document.createElement("label");
        deadlineLabel.setAttribute("for", "deadlineInput");
        deadlineLabel.textContent = "Deadline";
        deadlineLabel.className = "block mb-1 font-medium";

        const deadlineInput = document.createElement("input");
        deadlineInput.id = "deadlineInput";
        deadlineInput.type = "datetime-local";
        deadlineInput.required = true;
        deadlineInput.className =
          "w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "flex justify-between";
        const submitButton = document.createElement("button");
        submitButton.id = "submitButton";
        submitButton.textContent = "Submit";
        submitButton.className = "btn btn-primary mt-2";

        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-delete mt-2";

        formWrapper.appendChild(titleLabel);
        formWrapper.appendChild(titleInput);

        formWrapper.appendChild(imageLabel);
        formWrapper.appendChild(imageInput);

        formWrapper.appendChild(descriptionLabel);
        formWrapper.appendChild(descriptionInput);

        formWrapper.appendChild(deadlineLabel);
        formWrapper.appendChild(deadlineInput);

        buttonWrapper.appendChild(submitButton);
        buttonWrapper.appendChild(deleteButton);

        formWrapper.appendChild(buttonWrapper);

        editButton.insertAdjacentElement("afterend", formWrapper);

        submitButton.addEventListener("click", async function () {
          event.preventDefault();
          const editedListingTitle = titleInput.value;
          const editedListingDescription = descriptionInput.value;
          const editedDeadlineValue = new Date(
            deadlineInput.value,
          ).toISOString();
          const editedListingImage = imageInput.value;
          console.log("Edited values:", {
            editedListingTitle,
            editedListingDescription,
            editedDeadlineValue,
            editedListingImage,
          });

          let data = {
            ...(editedListingTitle !== "" && {
              title: editedListingTitle,
            }),
            ...(editedDeadlineValue !== "" && {
              endsAt: editedDeadlineValue,
            }),
            ...(editedListingImage !== "" && {
              media: [{ url: editedListingImage, alt: "Item image" }],
            }),
            ...(editedListingDescription !== "" && {
              description: editedListingDescription,
            }),
          };

          const putOptions = createOptions("PUT", data);

          try {
            await methodWithToken(urlId, putOptions);
            location.reload();
          } catch (error) {
            console.error("Error editing post:", error);
          }
        });

        deleteButton.addEventListener("click", async function () {
          try {
            await methodWithToken(urlId, deleteOptions);
            window.location.href = "auctions.html";
          } catch (error) {
            console.error("Error editing post:", error);
          }
        });
      }
    });
  } else if (isLoggedIn() && timeLeft !== "Auction ended") {
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
      const postOptions = createOptions("POST", data);

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
    bidButton.textContent = timeLeft;
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

import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";

updateNavDisplay();

const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";

const token = localStorage.getItem("accessToken");

const profileName = localStorage.getItem("userToken");

console.log(profileName);

const profilesUrl = `https://v2.api.noroff.dev/auction/profiles`;

const profileUrl = `https://v2.api.noroff.dev/auction/profiles/${profileName}`;

console.log(profilesUrl);

window.addEventListener("resize", updateNavDisplay);

const fetchHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "X-Noroff-API-Key": API_KEY,
};

async function methodWithToken(url, fetchOptions) {
  try {
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function getProfileWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    renderProfile(json);
  } catch (error) {
    console.log(error);
  }
}

getProfileWithToken(profileUrl);

function renderProfile(object) {
  const loadedProfile = document.querySelector(".loaded-profile");

  const item = object.data;

  console.log(item);

  const {
    avatar: { url, alt },
    name,
    credits,
    email,
  } = item;

  console.log(url, alt, name, credits, email);

  const profileSection = document.createElement("div");
  profileSection.className = "shadow-xl rounded-md p-6 mb-6";

  const profileHeading = document.createElement("h1");
  profileHeading.className = "text-xl font-semibold mb-4";
  profileHeading.textContent = "Profile";
  profileSection.appendChild(profileHeading);

  const profileContainer = document.createElement("div");
  profileContainer.className = "flex flex-col items-center mb-4";

  const avatarContainer = document.createElement("div");
  avatarContainer.className =
    "w-24 h-24 bg-gray-300 rounded-full overflow-hidden mb-2";
  const avatarImage = document.createElement("img");
  avatarImage.src = `${url}`;
  avatarImage.alt = `${alt}`;
  avatarImage.className = "w-full h-full object-cover";
  avatarContainer.appendChild(avatarImage);
  profileContainer.appendChild(avatarContainer);

  const creditsDiv = document.createElement("div");
  creditsDiv.className =
    "cards text-white bg-[var(--antique-gold)] rounded-full px-4 py-1 text-lg";
  creditsDiv.textContent = `Credits: ${credits}`;
  profileContainer.appendChild(creditsDiv);

  profileSection.appendChild(profileContainer);

  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.className = "btn btn-primary w-full mb-4";
  changeAvatarButton.id = "avatarButton";
  changeAvatarButton.textContent = "Change Avatar";
  profileSection.appendChild(changeAvatarButton);

  changeAvatarButton.addEventListener("click", () => {
    let avatarInput = document.querySelector("#avatarInput");
    let submitButton = document.querySelector("#submitButton");

    if (avatarInput && submitButton) {
      avatarInput.remove();
      submitButton.remove();
    } else {
      avatarInput = document.createElement("input");
      avatarInput.id = "avatarInput";
      avatarInput.type = "text";
      avatarInput.placeholder = "Enter new avatar URL...";
      avatarInput.className =
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

      submitButton = document.createElement("button");
      submitButton.id = "submitButton";
      submitButton.textContent = "Submit";
      submitButton.className = "btn btn-primary mt-2";

      profileSection.insertBefore(avatarInput, changeAvatarButton.nextSibling);
      profileSection.insertBefore(submitButton, avatarInput.nextSibling);

      submitButton.addEventListener("click", async function () {
        const newAvatarUrl = avatarInput.value;
        console.log("New Avatar URL:", newAvatarUrl);

        let data = {
          ...(newAvatarUrl !== "" && {
            avatar: { url: newAvatarUrl, alt: "User Avatar" },
          }),
        };
        const putOptions = {
          method: "PUT",
          headers: fetchHeader,
          body: JSON.stringify(data),
        };

        try {
          await methodWithToken(profileUrl, putOptions);
          location.reload();
        } catch (error) {
          console.error("Error editing post:", error);
        }
      });
    }
  });

  const profileGrid = document.createElement("div");
  profileGrid.className = "grid grid-cols-2 gap-4 mb-4";

  const nameDiv = document.createElement("div");
  nameDiv.innerHTML = `
  <p class="text-sm text-gray-600">Name</p>
  <p class="font-medium">${name}</p>`;
  profileGrid.appendChild(nameDiv);

  profileSection.appendChild(profileGrid);

  const emailDiv = document.createElement("div");
  emailDiv.className = "mb-4";
  emailDiv.innerHTML = `
  <p class="text-sm text-gray-600">Email</p>
  <p class="font-medium">${email}</p>`;
  profileSection.appendChild(emailDiv);

  /* const editProfileButton = document.createElement("button");
  editProfileButton.className = "btn btn-primary w-full mb-4";
  editProfileButton.textContent = "Edit Profile";
  profileSection.appendChild(editProfileButton);

  editProfileButton.addEventListener("click", () => {
    console.log("hello there");
    let editNameInput = document.querySelector("#editNameInput");
    let editEmailInput = document.querySelector("#editEmailInput");
    let editSubmitButton = document.querySelector("#submitButton");
    if (editNameInput && submitButton) {
      editNameInput.remove();
      editEmailInput.remove();
      editSubmitButton.remove();
    } else {
      editNameInput = document.createElement("input");
      editNameInput.id = "editNameInput";
      editNameInput.type = "text";
      editNameInput.placeholder = "Enter new name...";
      editNameInput.className =
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)] mb-4";

      editEmailInput = document.createElement("input");
      editEmailInput.id = "editEmailInput";
      editEmailInput.type = "text";
      editEmailInput.placeholder = "Enter new email...";
      editEmailInput.className =
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]";

      editSubmitButton = document.createElement("button");
      editSubmitButton.id = "submitButton";
      editSubmitButton.textContent = "Submit";
      editSubmitButton.className = "btn btn-primary mt-2";

      profileSection.insertBefore(editNameInput, editProfileButton.nextSibling);
      profileSection.insertBefore(editEmailInput, editNameInput.nextSibling);
      profileSection.insertBefore(editSubmitButton, editEmailInput.nextSibling);

      editSubmitButton.addEventListener("click", async function () {
        const newName = editNameInput.value;
        const newEmail = editEmailInput.value;

        console.log("New name URL:", newName);
        console.log("New email URL:", newEmail);

        let data = {
          ...(newName !== "" && { name: newName }),
          ...(newEmail !== "" && { email: newEmail }),
        };

        console.log(data);
        const putOptions = {
          method: "PUT",
          headers: fetchHeader,
          body: JSON.stringify(data),
        };

        try {
          await methodWithToken(profileUrl, putOptions);
          location.reload();
        } catch (error) {
          console.error("Error editing post:", error);
        }
      });
    }
  }); */

  const listingSection = document.createElement("div");
  listingSection.className = "shadow-xl rounded-md p-6";

  const listingHeading = document.createElement("h2");
  listingHeading.className = "text-xl font-semibold mb-4";
  listingHeading.textContent = "Create new listing";
  listingSection.appendChild(listingHeading);

  const form = document.createElement("form");

  const titleField = document.createElement("div");
  titleField.className = "mb-4";
  titleField.innerHTML = `
  <label for="title" class="block mb-1 font-medium">Title</label>
  <input type="text" id="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]" required>`;
  form.appendChild(titleField);

  const imageUrlField = document.createElement("div");
  imageUrlField.className = "mb-4";
  imageUrlField.innerHTML = `
  <label for="image-url" class="block mb-1 font-medium">Image URL</label>
  <input type="text" id="image-url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]" placeholder="Enter image URL" required>
`;
  form.appendChild(imageUrlField);

  const descriptionField = document.createElement("div");
  descriptionField.className = "mb-4";
  descriptionField.innerHTML = `
  <label for="description" class="block mb-1 font-medium">Description</label>
  <textarea id="description" rows="5" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]" required></textarea>`;
  form.appendChild(descriptionField);

  const askPriceField = document.createElement("div");
  askPriceField.className = "mb-4";
  askPriceField.innerHTML = `
  <label for="ask-price" class="block mb-1 font-medium">Ask Price</label>
  <input type="text" id="ask-price" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]" required>`;
  form.appendChild(askPriceField);

  const deadlineField = document.createElement("div");
  deadlineField.className = "mb-6";
  deadlineField.innerHTML = `
    <label for="deadline" class="block mb-1 font-medium">Deadline</label>
    <div class="relative">
      <input type="datetime-local" id="deadline" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]" required>
    </div>
  `;
  form.appendChild(deadlineField);

  const createListingButton = document.createElement("button");
  createListingButton.type = "submit";
  createListingButton.id = "createListingButton";
  createListingButton.className = "btn btn-primary w-full";
  createListingButton.textContent = "Create Listing";
  form.appendChild(createListingButton);

  listingSection.appendChild(form);

  createListingButton.addEventListener("click", async function () {
    const newListingTitle = titleField.querySelector("#title").value;
    const newListingDescription =
      descriptionField.querySelector("#description").value;

    const deadlineInput = document.getElementById("deadline");
    const deadlineValue = new Date(deadlineInput.value).toISOString();

    const newListingImage = imageUrlField.querySelector("#image-url").value;

    event.preventDefault();
    console.log(newListingTitle);
    console.log(deadlineValue);

    let data = {
      ...(newListingTitle !== "" && {
        title: newListingTitle,
      }),
      ...(deadlineValue !== "" && {
        endsAt: deadlineValue,
      }),
      ...(newListingImage !== "" && {
        media: [{ url: newListingImage, alt: "Item image" }],
      }),
      ...(newListingDescription !== "" && {
        description: newListingDescription,
      }),
    };

    console.log(data);
    const postOptions = {
      method: "POST",
      headers: fetchHeader,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/auction/listings",
        postOptions,
      );
      const json = await response.json();
      console.log(json);
      location.reload();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  });

  loadedProfile.appendChild(profileSection);
  loadedProfile.appendChild(listingSection);
}

/* await methodWithToken(
  "https://v2.api.noroff.dev/auction/listings",
  postOptions,
);
console.log(json);
 */

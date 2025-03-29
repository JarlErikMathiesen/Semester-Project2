import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";

updateNavDisplay();

const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";

const profileName = localStorage.getItem("userToken");

console.log(profileName);

const profilesUrl = `https://v2.api.noroff.dev/auction/profiles`;

const profileUrl = `https://v2.api.noroff.dev/auction/profiles/${profileName}`;

console.log(profilesUrl);

window.addEventListener("resize", updateNavDisplay);

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

  const { avatar, name, credits, email } = item;

  console.log(avatar, name, credits, email);

  console.log(avatar.url);

  loadedProfile.innerHTML = `
        <!-- Profile Section -->
        <div class="shadow-xl rounded-md p-6 mb-6">
          <h1 class="text-xl font-semibold mb-4">Profile</h1>
          

          </section>
          <div class="flex flex-col items-center mb-4">
            <div
              class="w-24 h-24 bg-gray-300 rounded-full overflow-hidden mb-2"
            >
              <img
                src=${avatar.url}
                alt=${avatar.alt}
                class="w-full h-full object-cover"
              />
            </div>

            <div
              class="cards text-white bg-[var(--antique-gold)] rounded-full px-4 py-1 text-lg"
            >
              Credits: ${credits}
            </div>
          </div>

          <button class="btn btn-primary w-full mb-4">Change Avatar</button>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-600">Name</p>
              <p class="font-medium">${name}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">User Name</p>
              <p class="font-medium">Artfan123</p>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-600">Email</p>
            <p class="font-medium">${email}</p>
          </div>

          <button class="btn btn-primary w-full">Edit Profile</button>
        </div>

        <!-- Create New Listing Section -->
        <div class="shadow-xl rounded-md p-6">
          <h2 class="text-xl font-semibold mb-4">Create new listing</h2>

          <form>
            <div class="mb-4">
              <label for="title" class="block mb-1 font-medium">Title</label>
              <input
                type="text"
                id="title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]"
                required
              />
            </div>

            <button type="button" class="btn btn-primary w-full mb-4">
              Add Image
            </button>

            <div class="mb-4">
              <label for="description" class="block mb-1 font-medium"
                >Description</label
              >
              <textarea
                id="description"
                rows="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="ask-price" class="block mb-1 font-medium"
                >Ask Price</label
              >
              <input
                type="text"
                id="ask-price"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]"
                required
              />
            </div>

            <div class="mb-6">
              <label for="deadline" class="block mb-1 font-medium"
                >Deadline</label
              >
              <div class="relative">
                <input
                  type="text"
                  id="deadline"
                  value="10.08.25"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--emerald-green)]"
                  required
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M12 6V12L16 16"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-full">
              Create listing
            </button>
          </form>
        </div>`;
}

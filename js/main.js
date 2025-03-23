import { updateNavDisplay } from "/js/components/nav/hamburgermenu.js";
/* import { getApi, url } from "/js/components/API/fetchAPI.js"; */

window.addEventListener("resize", updateNavDisplay);

const url = "https://v2.api.noroff.dev/auction/listings";

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

  console.log(items);

  items.forEach((item) => {
    const title = item.title;
    const endTime = item.endsAt;

    console.log(endTime);

    containerAPI.innerHTML += `
    <div class="grid mb-10">
          <div class="grid border border-gray-200 rounded-md overflow-hidden">
            <div class="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover">
              <img
                src="images/Firefly A colorful, simplistic painting of planet Earth engulfed in bright orange and red flames, dr.jpg"
                alt="an abandoned street at night in a small french town 19th century town, a coated figure stand"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 grid grid-cols-full font-extralight">
              <div class="overflow-hidden">
                <h3 class="truncate font-bold border-b">${title}</h3>
              </div>
              <div class="grid grid-flow-col pt-2">
                <div class="border-r">
                    <p class="text-base font-semibold">days left</p>
                    <p class="text-base font-semibold">d${endTime}</p>
                </div>
                <div class="justify-items-end text-end">
                    <p class="text-sm">Current price</p>
                    <p class="text-2xl">$123</p>
                </div>
              </div>
              <button class="btn btn-secondary col-span-full mt-10">Bid</button>
            </div>
          </div>
        </div>`;
  });
}

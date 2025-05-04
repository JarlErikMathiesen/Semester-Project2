import { API_KEY, token } from "/js/constants.js";

export const url = "https://v2.api.noroff.dev/auction/listings";

export const urlPar = new URLSearchParams(document.location.search);

export const containerAPI = document.querySelector(".api-container");
export const containerItem = document.querySelector(".item-container");

export function showLoader(container) {
  container.innerHTML = `
    <div class="loader-container col-span-full flex justify-center items-center min-h-64">
      <div class="loader animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  `;
}

export function hideLoader(container) {
  container.innerHTML = "";
}

export async function getApi(url, renderFunction, container) {
  try {
    showLoader(container);
    const response = await fetch(url);
    const json = await response.json();
    const jsonData = json.data;

    console.log(jsonData);
    hideLoader(container);
    renderFunction(jsonData);
  } catch (error) {
    console.log(error);
  }
}

export async function getApiWithToken(url, renderFunction, container) {
  try {
    showLoader(container);
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();
    const jsonData = json.data;

    console.log(jsonData);
    renderFunction(jsonData);
  } catch (error) {
    console.log(error);
  }
}

export async function methodWithToken(url, fetchOptions) {
  try {
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export const fetchHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "X-Noroff-API-Key": API_KEY,
};

export const deleteOptions = {
  method: "DELETE",
  headers: fetchHeader,
};

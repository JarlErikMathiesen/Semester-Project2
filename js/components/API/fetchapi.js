import { API_KEY, token } from "/js/components/constants/constants.js";

export const url = "https://v2.api.noroff.dev/auction/listings";

export const containerAPI = document.querySelector(".api-container");
export const containerItem = document.querySelector(".item-container");
export const loadedProfile = document.querySelector(".loaded-profile");
export const containerCredit = document.querySelector(".credit-container");

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

export const fetchHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "X-Noroff-API-Key": API_KEY,
};

export function createOptions(method, data) {
  const options = {
    method,
    headers: fetchHeader,
  };

  if ((method === "PUT" || method === "POST") && data) {
    options.body = JSON.stringify(data);
  }

  return options;
}

export const getOptions = createOptions("GET");
export const deleteOptions = createOptions("DELETE");

export async function methodWithToken(url, fetchOptions) {
  try {
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    const jsonData = "data" in json ? json.data : json;

    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

export async function getApiWithToken(url, renderFunction, container) {
  try {
    showLoader(container);
    const response = await fetch(url, getOptions);
    const json = await response.json();
    const jsonData = "data" in json ? json.data : json;
    hideLoader(container);

    renderFunction(jsonData);
  } catch (error) {
    console.log(error);
  }
}

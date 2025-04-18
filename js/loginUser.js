const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";
const API_BASE_URL = "https://v2.api.noroff.dev";
export const loginUrl = API_BASE_URL + "/auth/login";

const loadedHtml = document.querySelector("#loaded-html");
const closeButton = document.querySelector("#data-close-modal");
const modal = document.querySelector("#data-modal");

export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok) {
      const accessToken = json.data.accessToken;
      const userToken = json.data.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userToken", userToken);
      console.log(json);
      console.log(json.data.accessToken);
      console.log(json.data.name);
      window.location.href = "profile.html";
    } else {
      while (loadedHtml.firstChild) {
        loadedHtml.removeChild(loadedHtml.firstChild);
      }
      console.log(json);
      json.errors.forEach((error) => {
        console.log(error.message);
        const appendedHtml = document.createElement("div");
        appendedHtml.innerText = error.message;
        loadedHtml.append(appendedHtml);
        modal.showModal();
      });
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

closeButton.addEventListener("click", () => {
  modal.close();
});

import { API_KEY } from "/js/components/constants/constants.js";

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
      window.location.href = "profile.html";
    } else {
      while (loadedHtml.firstChild) {
        loadedHtml.removeChild(loadedHtml.firstChild);
      }
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

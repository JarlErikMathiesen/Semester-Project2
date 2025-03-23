export const url = "https://v2.api.noroff.dev/auction/listings";

export async function getApi(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

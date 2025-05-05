export const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";

export const token = localStorage.getItem("accessToken");

export const profileName = localStorage.getItem("userToken");

export function userListing(profile, seller) {
  if (profile === seller) {
    return true;
  } else {
    return false;
  }
}

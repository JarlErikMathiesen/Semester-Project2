import { profileName } from "/js/constants.js";

export const url = "https://v2.api.noroff.dev/auction/listings";

export const urlPar = new URLSearchParams(document.location.search);
export const id = urlPar.get("id");

export const queryParameter = "?_bids=true&_seller=true";

export const urlId = url + "/" + id;
export const urlIdQueryParameter = urlId + queryParameter;
export const urlQueryParameter = url + queryParameter;

export const profileUrl = `https://v2.api.noroff.dev/auction/profiles/${profileName}`;
export const profileUrlListings =
  profileUrl + "/listings/?_bids=true&_seller=true";

let latestListing = "&sort=created&sortOrder=desc";
export const urlLatest = urlQueryParameter + latestListing;

let activeListing = "&_active=true&sort=created&sortOrder=desc";
export const urlActive = urlQueryParameter + activeListing;

let ascendingListing = "&sortOrder=asc";
export const urlAscending = urlQueryParameter + ascendingListing;

let descendingListing = "&sortOrder=desc";
export const urlDescending = urlQueryParameter + descendingListing;

let inactiveListing = "&_active=false&sort=created&sortOrder=desc";
export const urlInactive = urlQueryParameter + inactiveListing;

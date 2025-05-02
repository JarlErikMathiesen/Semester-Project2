export const url = "https://v2.api.noroff.dev/auction/listings";

export const urlPar = new URLSearchParams(document.location.search);
export const id = urlPar.get("id");

export const queryParameter = "?_bids=true&_seller=true";

export const urlId = url + "/" + id;
export const urlIdQueryParameter = urlId + queryParameter;
export const urlQueryParameter = url + queryParameter;

let activeListing = "&_active=true";
export const urlActive = urlQueryParameter + activeListing;

let ascendingListing = "&sortOrder=asc";
export const urlAscending = urlQueryParameter + ascendingListing;

let descendingListing = "&sortOrder=desc";
export const urlDescending = urlQueryParameter + descendingListing;

let inactiveListing = "&_active=false";
export const urlInactive = urlQueryParameter + inactiveListing;

export function getMillisecondsRemaining(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  endTime - now;
  return endTime - now;
}

export function getTimeRemaining(endsAt) {
  /* const now = new Date();
  const endTime = new Date(endsAt); */

  const timeDiff = getMillisecondsRemaining(endsAt);

  if (timeDiff <= 0) {
    return "Auction ended";
  }

  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
  const timeLeft = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

  return timeLeft > 0
    ? `${timeLeft} day${timeLeft > 1 ? "s" : ""} left`
    : `${hours}h ${minutes}m left`;
}

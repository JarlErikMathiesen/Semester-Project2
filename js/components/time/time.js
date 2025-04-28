export function getTimeRemaining(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  const timeDiff = endTime - now;

  if (timeDiff <= 0) {
    return "Auction ended";
  }

  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
  const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

  return days > 0
    ? `${days} day${days > 1 ? "s" : ""} left`
    : `${hours}h ${minutes}m left`;
}

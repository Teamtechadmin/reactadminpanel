export const calculateStepRate = (highestBid: number) => {
  if (highestBid <= 99999) {
    return 2000;
  } else if (highestBid <= 299999) {
    return 4000;
  } else if (highestBid <= 499999) {
    return 7000;
  } else {
    return 10000;
  }
};

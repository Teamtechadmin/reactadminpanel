export const numberToINR = (string: string | number) => {
  return Number(string ?? 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
};

export function formatToAmount(amount: string | number) {
  return numberToINR(amount);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractValuesByKey = (arr: any[], key: string) => {
  return arr.map((obj) => obj[key]);
};

import { capitaliseFirstLetter } from "./capitalise-firstletter";

export const transformStringsToObjects = (
  arr: string[],
): { value: string; label: string }[] => {
  const uniqueStrings = Array.from(new Set(arr));

  return uniqueStrings.map((str) => ({
    value: str,
    label: capitaliseFirstLetter(str),
  }));
};

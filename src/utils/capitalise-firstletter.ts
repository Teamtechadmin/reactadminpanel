export const capitaliseFirstLetter = (text: string) => {
  return text ? text?.charAt(0).toUpperCase() + text?.slice(1) : "";
};

export const firstCapsOnly = (text?: string) => {
  return text
    ? text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLocaleLowerCase()
    : "";
};

export const removeSecondsFromDateTime = (dateStr: Date): Date => {
  const date = new Date(dateStr);
  date.setSeconds(0, 0);
  return date;
};

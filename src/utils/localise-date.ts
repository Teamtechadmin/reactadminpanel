// To solve date decrement issue when sending date to api.
// Need to convert the date and time according to local time zone. It solves the issue.
export const localiseDate = (date?: Date | null) => {
  if (date) {
    const offsetMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offsetMinutes * 60000);
    const utcDate = new Date(adjustedDate.toUTCString());

    return utcDate;
  } else {
    return null;
  }
};

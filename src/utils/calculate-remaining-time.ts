export const calculateRemainingTime = (startTime: string, endTime: string) => {
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);
  const currentDate = new Date();
  if (startTimeDate < currentDate && endTimeDate < currentDate) {
    return 0;
  }
  const diff = endTimeDate.getTime() - startTimeDate.getTime();
  return diff;
};

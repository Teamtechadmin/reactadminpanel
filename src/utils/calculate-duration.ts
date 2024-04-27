export function calculateTimeDifference(start: string, end: string): number {
  const startTime: Date = new Date(start);
  const endTime: Date = new Date(end);

  const timeDifference: number = endTime.getTime() - startTime.getTime();

  const minutesDifference: number = Math.round(timeDifference / (1000 * 60));

  return minutesDifference;
}

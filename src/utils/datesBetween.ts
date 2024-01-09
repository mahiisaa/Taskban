export const datesBetween = (
  start: string,
  end: string,
): number[] => {
  let dates: number[] = [];

  const startDate = new Date(start)
  const endDate = new Date(end)

  while (startDate < endDate) {
    dates.push(startDate.getTime());
    startDate.setDate(startDate.getDate() + 1);
  }
  dates.push(endDate.getTime());

  return dates;
};

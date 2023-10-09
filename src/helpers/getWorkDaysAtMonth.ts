import countWorkDay from "./countWorkDays";

export default function getWorkDaysAtMonth(
  zeroBasedMonthNumber: number,
  year: number
) {
  const startOfMonth = new Date(year, zeroBasedMonthNumber, 1);
  const endOfMonth = new Date(year, zeroBasedMonthNumber + 1, 0);
  return countWorkDay(startOfMonth, endOfMonth);
}

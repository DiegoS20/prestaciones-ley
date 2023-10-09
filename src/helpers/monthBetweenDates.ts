export default function monthBetweenDates(startDate: Date, endDate: Date) {
  const admissionMonth = startDate.getMonth();
  const currentMonth = endDate.getMonth();
  const monthSimpleDifference = currentMonth - admissionMonth;
  const yearsBetweenDates = endDate.getFullYear() - startDate.getFullYear();
  return monthSimpleDifference + yearsBetweenDates * 12;
}

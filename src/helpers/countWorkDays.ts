export default function countWorkDay(start: Date, end: Date) {
  const startAt0 = new Date(start).setHours(0, 0, 0);
  const endAt0 = new Date(end).setHours(0, 0, 0);
  const _start = new Date(startAt0);
  const _end = new Date(endAt0);
  let days = 0;

  while (_start.getTime() <= _end.getTime()) {
    if ([0, 6].indexOf(_start.getDay()) == -1) days++;
    _start.setDate(_start.getDate() + 1);
  }

  return days;
}

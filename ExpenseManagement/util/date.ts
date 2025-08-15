export function getFormattedDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
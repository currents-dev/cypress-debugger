export function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(Number(date));
}

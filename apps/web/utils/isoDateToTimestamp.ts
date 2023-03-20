export function isoDateToTimestamp(isoDate: string): number {
  return new Date(isoDate).getTime();
}

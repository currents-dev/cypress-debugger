export default (date: Date) =>
  date instanceof Date && !Number.isNaN(Number(date));

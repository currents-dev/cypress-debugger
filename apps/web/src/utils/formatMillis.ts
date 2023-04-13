export default (ms: number): string => {
  if (Math.floor(ms / 1000) > 0) {
    return `${(ms / 1000).toFixed(2)}s`;
  }

  return `${Math.ceil(ms)}ms`;
};

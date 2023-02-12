export const error = (...args: any[]) => {
  console.error(`🔥`, ...args);
};

export const debug = (...args: any[]) => {
  console.debug(`🟡`, ...args);
};

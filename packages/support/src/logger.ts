export const error = (...args: any[]) => {
  console.error(`🔥`, ...args);
};

export const warn = (...args: any[]) => {
  console.warn(`⚠️`, ...args);
};

export const debug = (...args: any[]) => {
  console.debug(`🟡`, ...args);
};

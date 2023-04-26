/* eslint-disable no-console */
export const error = (...args: unknown[]) => {
  console.error(`🔥`, ...args);
};

export const warn = (...args: unknown[]) => {
  console.warn(`⚠️`, ...args);
};

export const debug = (...args: unknown[]) => {
  console.debug(`🟡`, ...args);
};

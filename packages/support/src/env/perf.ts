export function getEnvironmentLifetime(): number {
  try {
    if (window?.performance) {
      return window.performance.now();
    }
    // @ts-ignore
    return require("node:perf_hooks").performance.now() as number;
  } catch (e) {
    return 0;
  }
}

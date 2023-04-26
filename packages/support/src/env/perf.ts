export function getEnvironmentLifetime(): number {
  try {
    if (window?.performance) {
      return window.performance.now();
    }
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    return require('node:perf_hooks').performance.now() as number;
  } catch (e) {
    return 0;
  }
}

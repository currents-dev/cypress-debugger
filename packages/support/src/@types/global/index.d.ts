declare global {
  interface Window {
    rrwebRecord: typeof import("rrweb").record;
  }
}

import { attachHandlers } from "./cy";

export const debuggerSupport = attachHandlers;
export * from "./events/event";
export type { RunContextData } from "./cy/runContext";

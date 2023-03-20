import { attachHandlers } from "@currents/cypress-debugger-support";
import { installPlugin } from "@currents/cypress-debugger-plugin";
export const support = attachHandlers;
export const install = installPlugin;

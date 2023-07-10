import { installPlugin } from '@currents/cypress-debugger-plugin';
import { attachHandlers } from '@currents/cypress-debugger-support';

export type * from '@currents/cypress-debugger-plugin';
export type * from '@currents/cypress-debugger-support';

export const debuggerSupport = attachHandlers;
export const debuggerPlugin = installPlugin;

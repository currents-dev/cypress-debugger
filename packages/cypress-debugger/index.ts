import { installPlugin } from '@currents/cypress-debugger-plugin';
import { attachHandlers } from '@currents/cypress-debugger-support';

export type * from '@currents/cypress-debugger-plugin/dist';
export type * from '@currents/cypress-debugger-support/dist';

export const debuggerSupport = attachHandlers;
export const debuggerPlugin = installPlugin;

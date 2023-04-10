import { attachHandlers } from "@currents/cypress-debugger-support";
import { installPlugin } from "@currents/cypress-debugger-plugin";

export type {
  BaseEvent,
  CypressEvent,
  CypressEventMeta,
  CypressRawEvent,
  HeadersEntity,
  HttpArchiveEntry,
  HttpArchiveEntryRequest,
  HttpArchiveEntryResponse,
  HttpArchiveLog,
  QueryStringEntity,
  RRWebEvent,
  RawEvent,
  RunContextData,
} from "@currents/cypress-debugger-support";

export type {
  BrowserLog,
  ConsoleMessage,
  LogEntry,
  LogEntryLevel,
  LogEntrySource,
  PluginOptions,
  RuntimeCallFrame,
  RuntimeConsoleAPICalled,
  RuntimeRemoteObject,
  RuntimeStackTrace,
  RuntimeStackTraceId,
  TestExecutionResult,
} from "@currents/cypress-debugger-plugin";

export const debuggerSupport = attachHandlers;
export const debuggerPlugin = installPlugin;

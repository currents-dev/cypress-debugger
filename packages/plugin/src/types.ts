import {
  CypressEvent,
  HttpArchiveLog,
  RRWebEvent,
  RunContextData,
} from '@currents/cypress-debugger-support';

export type LogEntryLevel = 'verbose' | 'info' | 'warning' | 'error';
export type LogEntrySource =
  | 'xml'
  | 'javascript'
  | 'network'
  | 'storage'
  | 'appcache'
  | 'rendering'
  | 'security'
  | 'deprecation'
  | 'worker'
  | 'violation'
  | 'intervention'
  | 'recommendation'
  | 'other';

export type RuntimeCallFrame = {
  functionName: string;
  scriptId: string;
  url: string;
  lineNumber: number;
  columnNumber: number;
};

export type RuntimeStackTraceId = {
  id: string;
  debuggerId?: string;
};

export type RuntimeStackTrace = {
  description?: string;
  callFrames: RuntimeCallFrame[];
  parent?: RuntimeStackTrace;
  parentId?: RuntimeStackTraceId;
};

export type RuntimeRemoteObject = {
  type:
    | 'object'
    | 'function'
    | 'undefined'
    | 'string'
    | 'number'
    | 'boolean'
    | 'symbol'
    | 'bigint';
  value?: string;
};

export type LogEntry = {
  source: LogEntrySource;
  level: LogEntryLevel;
  text: string;
  category?: 'cors';
  timestamp: number;
  url?: string;
  lineNumber?: number;
  stackTrace?: RuntimeStackTrace;
  networkRequestId?: string;
  workerId?: string;
  args?: Array<RuntimeRemoteObject>;
};

export type RuntimeConsoleAPICalled = {
  type:
    | 'log'
    | 'debug'
    | 'info'
    | 'error'
    | 'warning'
    | 'dir'
    | 'dirxml'
    | 'table'
    | 'trace'
    | 'clear'
    | 'startGroup'
    | 'startGroupCollapsed'
    | 'endGroup'
    | 'assert'
    | 'profile'
    | 'profileEnd'
    | 'count'
    | 'timeEnd';
  args: Array<RuntimeRemoteObject>;
  executionContextId: number;
  timestamp: number;
  stackTrace?: RuntimeStackTrace;
  context?: string;
};

export type ConsoleMessage = {
  source?:
    | 'xml'
    | 'javascript'
    | 'network'
    | 'console-api'
    | 'storage'
    | 'appcache'
    | 'rendering'
    | 'security'
    | 'other'
    | 'deprecation'
    | 'worker';
  level?: 'log' | 'warning' | 'error' | 'debug' | 'info';
  text?: string;
  url?: string;
  line?: number;
  column?: number;
};

export type BrowserLog = {
  logEntry: LogEntry[];
  runtimeConsoleApiCalled: RuntimeConsoleAPICalled[];
};

export type TestExecutionResult = {
  id: string;
  meta: RunContextData;
  cy: CypressEvent[];
  rr: RRWebEvent[];
  har: HttpArchiveLog | null;
  browserLogs: BrowserLog;
  pluginMeta?: Record<string, unknown>;
};

export type PluginOptions = {
  meta?: Record<string, unknown>;
  targetDirectory?: string;
  failedTestsOnly?: boolean;
  callback?: (path: string, result: TestExecutionResult) => void;
  filenameFn?: (ctx: RunContextData) => string;
};

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import clsx from 'clsx';
import {
  BrowserLog,
  RuntimeStackTrace,
  TestExecutionResult,
} from 'cypress-debugger';
import { orderBy } from 'lodash';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type Log = {
  message?: string;
  type: string;
  timestamp: number;
  stackTrace?: RuntimeStackTrace;
};

const formatDate = (millis: number): string => new Date(millis).toISOString();

function StackTrace({
  trace,
}: {
  trace: BrowserLog['runtimeConsoleApiCalled'][0]['stackTrace'];
}) {
  return (
    <ul className="pl-6 pr-2 py-3">
      {trace?.callFrames.map((frame, i) => (
        <li key={i}>
          <p className="pb-1 text-sm">
            at {frame.functionName} (
            <span className="text-sky-400">{frame.url}</span>:{frame.lineNumber}
            )
          </p>
        </li>
      ))}
    </ul>
  );
}

function Message({
  message,
  type,
  timestamp,
  expanded,
}: {
  message: string;
  type: string;
  timestamp: number;
  expanded: boolean;
}) {
  return (
    <div
      className={clsx([
        'pl-4 pr-2 py-1',
        type === 'debug' ? 'text-emerald-700 dark:text-emerald-500' : '',
        type === 'error' ? 'text-red-400 dark:text-red-400' : '',
        type === 'warning' ? 'text-amber-600 dark:text-amber-400' : '',
        type === 'info' ? 'text-sky-700 dark:text-sky-500' : '',
      ])}
    >
      <div className="flex justify-between mb-2">
        <span>[{type}]</span>
        <span>{formatDate(timestamp)}</span>
      </div>

      <p className="text-left break-all">
        {expanded ? (
          <ChevronDown className="inline w-4 h-4" />
        ) : (
          <ChevronRight className="inline w-4 h-4" />
        )}{' '}
        {message}
      </p>
    </div>
  );
}

function Console({
  logs,
}: {
  logs: TestExecutionResult['browserLogs'] | null;
}) {
  const [opened, setOpened] = useState<number[]>([]);

  const handleOpened = (i: number) => {
    setOpened((o) => {
      if (o.includes(i)) {
        const copy = o.slice();
        copy.splice(
          o.findIndex((e) => e === i),
          1
        );
        return copy;
      }

      return [...o, i];
    });
  };

  if (!logs || !(logs.logEntry.length && logs.runtimeConsoleApiCalled.length)) {
    return <p className="pl-4 pt-3">No logs</p>;
  }

  const orderedLogs: Log[] = orderBy(
    [
      ...logs.logEntry.map((log) => ({
        message: log.text,
        type: log.level,
        timestamp: log.timestamp,
        stackTrace: log.stackTrace,
      })),
      ...logs.runtimeConsoleApiCalled.map((log) => ({
        message: log.args[0].value,
        type: log.type,
        timestamp: log.timestamp,
        stackTrace: log.stackTrace,
      })),
    ],
    (log) => log.timestamp,
    'asc'
  );

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-auto">
      {orderedLogs.map((log, i) => (
        <Collapsible
          key={i}
          onOpenChange={() => handleOpened(i)}
          className={clsx([
            'py-3 border-b',
            log.type === 'debug' ? 'bg-emerald-50 dark:bg-emerald-950/30' : '',
            log.type === 'error'
              ? 'bg-red-50 dark:border-red-950 dark:bg-red-900/20'
              : '',
            log.type === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10' : '',
            log.type === 'info' ? 'bg-sky-50 dark:bg-sky-500/10' : '',
          ])}
        >
          <CollapsibleTrigger className="w-full">
            <Message
              message={log.message ?? ''}
              type={log.type}
              timestamp={log.timestamp}
              expanded={opened.includes(i)}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {log.stackTrace ? (
              <StackTrace trace={log.stackTrace} />
            ) : (
              <p className="pl-6">&#8211;</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

export default Console;

import {
  BrowserLog,
  RuntimeStackTrace,
  TestExecutionResult,
} from 'cypress-debugger';
import { orderBy } from 'lodash';
import { Collapsible } from '../Collapsible/Collapsible';
import styles from './Console.module.scss';

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
    <ul className={styles['stack-trace']}>
      {trace?.callFrames.map((frame, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>
          &nbsp;&nbsp;&nbsp;at&nbsp;{frame.functionName}&nbsp;(
          {frame.url}:{frame.lineNumber})
        </li>
      ))}
    </ul>
  );
}

function MessageIcon({ type }: { type: string }) {
  let src;

  if (type === 'error') {
    src = 'error';
  } else if (type === 'debug') {
    src = 'bug_report';
  } else if (type === 'info') {
    src = 'info';
  } else {
    src = 'warning';
  }

  return (
    <span>
      <img src={`/${src}.svg`} alt="chevron" width={16} height={16} />
    </span>
  );
}

function Message({
  message,
  type,
  timestamp,
}: {
  message: string;
  type: string;
  timestamp: number;
}) {
  return (
    <div className={styles.message}>
      <div className={styles.message_header}>
        <div className={styles.message_type}>
          <span>[{type}]</span>
          {type !== 'log' && <MessageIcon type={type} />}
        </div>
        <span className={styles.message_timestamp}>
          {formatDate(timestamp)}
        </span>
      </div>

      <div className={styles.message_text}>{message}</div>
    </div>
  );
}

function Console({
  logs,
}: {
  logs: TestExecutionResult['browserLogs'] | null;
}) {
  if (!logs) return <div>No records</div>;

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
    <div className={styles.console}>
      <Collapsible
        elements={orderedLogs.map((log) => ({
          title: (
            <Message
              message={log.message ?? ''}
              type={log.type}
              timestamp={log.timestamp}
            />
          ),
          content: log.stackTrace ? (
            <StackTrace trace={log.stackTrace} />
          ) : (
            <div> - </div>
          ),
          className: ['warning', 'error'].includes(log.type)
            ? styles[`message__${log.type}`]
            : undefined,
        }))}
      />
    </div>
  );
}

export default Console;

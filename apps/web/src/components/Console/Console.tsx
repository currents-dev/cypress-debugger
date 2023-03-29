import {
  TestExecutionResult,
  BrowserLog,
} from "@currents/cypress-debugger-plugin";
import styles from "./Console.module.scss";

export function Console({
  logs,
}: {
  logs: TestExecutionResult["browserLogs"] | null;
}) {
  return (
    <ul className={styles.console}>
      {logs?.console.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}
    </ul>
  );
}

const Message = ({ message }: { message: BrowserLog["console"][0] }) => {
  const displayUrl = message.url && message.line && message.column;

  return (
    <li
      className={`${styles["console-message"]} ${
        styles[`console-message__${message.level ?? ""}`]
      }`}
    >
      <div className={styles["console-message_info"]}>
        [{message.source}] <span>{formatDate(message.meta.timestamp)}</span>
      </div>

      {displayUrl && (
        <div>
          <span className={styles["console-message_url"]}>
            {message.url}:{message.line}:{message.column}
          </span>
        </div>
      )}
      <div className={styles["console-message_text"]}>{message.text}</div>
    </li>
  );
};

const formatDate = (millis: number): string => {
  return new Date(millis).toISOString();
};

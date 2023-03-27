import { TestExecutionResult } from "@currents/cypress-debugger-plugin";
import styles from "./Console.module.scss";

export function Console({
  logs,
}: {
  logs: TestExecutionResult["browserLogs"] | null;
}) {
  return (
    <div className={styles.console}>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
}

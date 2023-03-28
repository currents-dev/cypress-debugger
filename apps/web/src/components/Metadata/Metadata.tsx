import { TestExecutionResult } from "@currents/cypress-debugger-plugin";
import styles from "./Metadata.module.scss";

export function Metadata({
  meta,
}: {
  meta: TestExecutionResult["meta"] | null;
}) {
  return (
    <div className={styles.metadata}>
      <pre>{JSON.stringify(meta, null, 2)}</pre>
    </div>
  );
}

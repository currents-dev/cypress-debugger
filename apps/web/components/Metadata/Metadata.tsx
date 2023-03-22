import { CypressStep } from "../../types";
import { formatMillis } from "../../utils/formatMillis";
import styles from "./Metadata.module.scss";

export function Metadata({ step }: { step: CypressStep }) {
  return (
    <div className={styles.metadata}>
      Duration: {formatMillis(step.duration)}
    </div>
  );
}

import { omit, pick } from "lodash";
import { CypressStep } from "../../types";
import { formatMillis } from "../../utils/formatMillis";
import styles from "./StepDetails.module.scss";

export function StepDetails({ step }: { step: CypressStep | null }) {
  if (!step) {
    return <div>No step selected</div>
  };

  const parameters = omit(
    step.payload,
    "name",
    "wallClockStartedAt"
  );

  const messageParts = step.payload.message.split(",");
  const message =
    step.payload.name === "task" ? messageParts[0] : step.payload.message;
  const taskArgs =
    step.payload.name === "task" ? messageParts.slice(1).join(",") : null;

  return (
    <div className={styles.details}>
      <ul className={styles["details_block"]}>
        <li className={styles["details_value"]}>{step.payload.name}</li>
        {message && (
          <li>
            message: <span className={styles["details_value"]}>{message}</span>
          </li>
        )}
        {taskArgs && (
          <li>
            args: <span className={styles["details_value"]}>{taskArgs}</span>
          </li>
        )}
      </ul>
      <ul className={styles["details_block"]}>
        <li className={styles["details_title"]}>Time</li>
        <li>
          wall time:{" "}
          <span className={styles["details_value"]}>
            {step.payload.wallClockStartedAt}
          </span>
        </li>
        <li>
          duration:{" "}
          <span className={styles["details_value"]}>
            {formatMillis(step.duration)}
          </span>
        </li>
      </ul>
      <ul className={styles["details_block"]}>
        <li className={styles["details_title"]}>Parameters</li>
        {Object.entries(parameters).map(([key, value]) => (
          <Entry key={key} param={key} value={value} />
        ))}
      </ul>
    </div>
  );
}

const Entry = ({ param, value }: { param: string; value: any }) => {
  const displayed =
    typeof value === "string"
      ? `\"${value}\"`
      : typeof "boolean"
      ? `${value}`
      : value;

  return (
    <li>
      {param}:&nbsp;<span className={styles["details_value"]}>{displayed}</span>
    </li>
  );
};


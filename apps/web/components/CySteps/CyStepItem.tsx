import { MouseEventHandler } from "react";
import { CypressStep } from "../../types";
import styles from "./CyStepItem.module.scss";

export function CyStepItem({
  step,
  active,
  onClick,
  onBefore,
  onAfter,
}: {
  step: CypressStep;
  active: boolean;
  onClick: () => void;
  onBefore: (e: any) => void;
  onAfter: (e: any) => void;
}) {
  const payload = step.payload;

  const showButtons =
    (!!step.meta.before.rrId && !!step.meta.before.rrNodes?.length) ||
    (!!step.meta.after.rrId && !!step.meta.after.rrNodes?.length);

  return (
    <li
      className={`${styles.step} ${active ? styles["step__active"] : ""}`}
      onClick={onClick}
    >
      <span className={styles["step_state"]}>[{payload.state}]&nbsp;</span>
      {payload.type === "child" && <span> - </span>}
      <span className={styles["step_name"]}>{payload.name}</span>
      <div className={styles["step_message"]}>{payload.message}</div>
      <div className={styles["step_actions"]}>
        {showButtons && (
          <>
            <CyStepItemButton onClick={onBefore} disabled={!active}>
              Before
            </CyStepItemButton>
            &nbsp;
            <CyStepItemButton onClick={onAfter} disabled={!active}>
              After
            </CyStepItemButton>
          </>
        )}
      </div>
    </li>
  );
}

const CyStepItemButton = ({
  children,
  onClick,
  disabled,
}: {
  children: string | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      className={styles["step_button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

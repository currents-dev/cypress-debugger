import { MouseEventHandler } from "react";
import { useCypressStepsContext } from "../../context/cypressSteps";
import { CypressStep } from "../../types";
import styles from "./CyStepItem.module.scss";

export function CyStepItem({
  step,
  active,
  onClick,
}: {
  step: CypressStep;
  active: boolean;
  onClick: () => void;
}) {
  const payload = step.payload;
  const { setBeforeAfter } = useCypressStepsContext();

  const showButtons =
    (!!step.meta.before.rrId && !!step.meta.before.rrNodes?.length) ||
    (!!step.meta.after.rrId && !!step.meta.after.rrNodes?.length);

  function onBefore(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setBeforeAfter("before");
  }
  function onAfter(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setBeforeAfter("after");
  }
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

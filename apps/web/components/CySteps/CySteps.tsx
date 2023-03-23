import { CypressStep } from "../../types";
import { CyStepItem } from "./CyStepItem";
import styles from "./CySteps.module.scss";

export function CySteps({
  steps,
  activeStep,
  setActiveStep,
}: {
  steps: CypressStep[];
  activeStep: number;
  setActiveStep: (i: number) => void;
}) {
  if (!steps.length) return null;

  return (
    <ul className={styles.steps}>
      {steps.map((s, i) => (
        <CyStepItem
          key={s.id}
          step={s}
          active={activeStep === i}
          onClick={() => setActiveStep(i)}
        />
      ))}
    </ul>
  );
}

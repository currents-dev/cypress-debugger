import { CypressStep } from "../../types";
import { CyStepItem } from "./CyStepItem";
import styles from "./CySteps.module.scss";

export function CySteps({
  steps,
  activeStep,
  setActiveStep,
  onBefore,
  onAfter,
}: {
  steps: CypressStep[];
  activeStep: number;
  setActiveStep: (i: number) => void;
  onBefore: (e: any) => void;
  onAfter: (e: any) => void;
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
          onBefore={onBefore}
          onAfter={onAfter}
        />
      ))}
    </ul>
  );
}

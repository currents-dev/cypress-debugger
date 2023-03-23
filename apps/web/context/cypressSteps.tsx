import { orderBy } from "lodash";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CypressStep } from "../types";

export type CypressStepsContextType = {
  steps: CypressStep[];
  setSteps: (steps: CypressStep[]) => void;
  activeStep: number;
  activeStepObj: CypressStep | null;
  beforeAfter: BeforeAfter;
  setActiveStep: (i: number) => void;
  setBeforeAfter: (i: BeforeAfter) => void;
};

type BeforeAfter = "before" | "after";
const CypressStepsContext = createContext<CypressStepsContextType>({
  beforeAfter: "before",
  steps: [],
  setSteps: () => {},
  activeStep: -1,
  activeStepObj: null,
  setActiveStep: (i: number) => {},
  setBeforeAfter: () => {},
});

export const useCypressStepsContext = () => useContext(CypressStepsContext);

export default function CypressStepsContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfter>("before");
  const [cypressSteps, setCypressSteps] = useState<CypressStep[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const orderedSteps = orderBy(cypressSteps, (step) => step.timestamp, "asc");

  const activeStepObj =
    activeStep === -1 ? null : orderedSteps[activeStep] ?? null;

  const setSteps = (s: CypressStep[]) => {
    setCypressSteps(s);
    setActiveStep(-1);
  };

  return (
    <CypressStepsContext.Provider
      value={{
        beforeAfter,
        steps: orderedSteps,
        setSteps,
        activeStep,
        setActiveStep,
        activeStepObj,
        setBeforeAfter,
      }}
    >
      {children}
    </CypressStepsContext.Provider>
  );
}

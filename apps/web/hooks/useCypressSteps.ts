import { useEffect, useState } from "react";
import _cypressSteps from "../data/cy.json";
import { CypressStep } from "../types";

export function useCypressSteps() {
  const [cypressSteps, setCypressSteps] = useState<CypressStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCypressSteps(_cypressSteps);
    setLoading(false);
  }, []);

  return {
    cypressSteps,
    setCypressSteps,
    loading,
  };
}

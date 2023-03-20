import { CypressStep } from "../../types";

export function Metadata({ step }: { step: CypressStep | null }) {
  if (!step) return null;

  return <div>{step.duration}ms</div>;
}

import { createContext, PropsWithChildren, useContext } from "react";
import { useCypressStepsContext } from "./cypressSteps";

interface PlaybackContextType {
  rrIdOrTs: string | number | null;
}
const PlaybackContext = createContext<PlaybackContextType>({
  rrIdOrTs: null,
});
export const usePlayback = () => useContext(PlaybackContext);

export default function PlaybackProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { beforeAfter, activeStepObj: step, steps } = useCypressStepsContext();

  const rrIdOrTs =
    (step
      ? steps.find((s) => s.id === step.id)?.meta[beforeAfter].rrId
      : null) ??
    step?.timestamp ??
    null;

  return (
    <PlaybackContext.Provider
      value={{
        rrIdOrTs,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

import { createContext, PropsWithChildren, useContext } from "react";
import { useHttpArchiveLog } from "../hooks/useHttpArchiveLog";
import { HttpArchiveEntry } from "../types";
import { isoDateToTimestamp } from "../utils/isoDateToTimestamp";
import { useCypressStepsContext } from "./cypressSteps";

export type HttpArchiveEntriesContextType = {
  entries: HttpArchiveEntry[]
};

const CyHttpArchiveContext = createContext<HttpArchiveEntriesContextType>({
  entries: [],
});

export const useHttpArchiveContext = () => useContext(CyHttpArchiveContext);

export default function HttpArchiveContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { httpArchiveLog, loading } = useHttpArchiveLog();
  const { activeStepObj } = useCypressStepsContext();

  const entries =
    httpArchiveLog && activeStepObj
      ? httpArchiveLog.log.entries.filter((e: any) => {
          return (
            isoDateToTimestamp(e.startedDateTime) <=
            isoDateToTimestamp(activeStepObj.payload.wallClockStartedAt)
          );
        })
      : [];

  return (
    <CyHttpArchiveContext.Provider value={{ entries }}>
      {children}
    </CyHttpArchiveContext.Provider>
  );
}

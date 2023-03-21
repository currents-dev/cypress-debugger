import { createContext, PropsWithChildren, useContext } from "react";
import { useHttpArchiveLog } from "../hooks/useHttpArchiveLog";
import { HttpArchiveEntry, HttpArchiveLog } from "../types";
import { isValidDate } from "../utils/isValidDate";
import { useCypressStepsContext } from "./cypressSteps";

export type HttpArchiveEntriesContextType = {
  entries: HttpArchiveEntry[];
  setHttpArchiveLog: (data: HttpArchiveLog | null) => void;
};

const CyHttpArchiveContext = createContext<HttpArchiveEntriesContextType>({
  entries: [],
  setHttpArchiveLog: () => {},
});

export const useHttpArchiveContext = () => useContext(CyHttpArchiveContext);

export default function HttpArchiveContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { httpArchiveLog, setHttpArchiveLog, loading } = useHttpArchiveLog();
  const { activeStepObj } = useCypressStepsContext();

  const entries =
    httpArchiveLog && activeStepObj
      ? httpArchiveLog.log.entries.filter((e) => {
          const harDate = new Date(e.startedDateTime);

          const cypressStepDate = new Date(
            activeStepObj.payload.wallClockStartedAt
          );

          if (!isValidDate(harDate) || !isValidDate(cypressStepDate))
            return false;

          const harDateTimestamp = harDate.getTime();
          const cypressStepDateTimestamp = cypressStepDate.getTime();

          return harDateTimestamp <= cypressStepDateTimestamp;
        })
      : [];

  return (
    <CyHttpArchiveContext.Provider value={{ entries, setHttpArchiveLog }}>
      {children}
    </CyHttpArchiveContext.Provider>
  );
}

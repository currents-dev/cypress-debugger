import { HttpArchiveEntry, HttpArchiveLog } from 'cypress-debugger';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import isValidDate from '../utils/isValidDate';
import { useCypressEventsContext } from './cypressEvents';

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
  const [httpArchiveLog, setHttpArchiveLog] = useState<HttpArchiveLog | null>(
    null
  );
  const { selectedEventObject } = useCypressEventsContext();

  const entries =
    httpArchiveLog && selectedEventObject
      ? httpArchiveLog.log.entries.filter((e) => {
          const harDate = new Date(e.startedDateTime);

          const cypressStepDate = new Date(
            selectedEventObject.payload.wallClockStartedAt
          );

          if (!isValidDate(harDate) || !isValidDate(cypressStepDate))
            return false;

          const harDateTimestamp = harDate.getTime();
          const cypressStepDateTimestamp = cypressStepDate.getTime();

          return harDateTimestamp <= cypressStepDateTimestamp;
        })
      : [];

  return (
    <CyHttpArchiveContext.Provider
      value={{
        entries,
        setHttpArchiveLog,
      }}
    >
      {children}
    </CyHttpArchiveContext.Provider>
  );
}

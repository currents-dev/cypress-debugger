import { CypressEvent } from "cypress-debugger";
import { TestExecutionResult } from "cypress-debugger";
import { orderBy } from "lodash";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { isValidDate } from "../utils/isValidDate";

export type CypressEventsContextType = {
  events: CypressEvent[];
  setEvents: (events: CypressEvent[]) => void;
  selectedEvent: number;
  selectedEventObject: CypressEvent | null;
  beforeAfter: BeforeAfter;
  setSelectedEvent: (i: number) => void;
  setBeforeAfter: (i: BeforeAfter) => void;
  meta: TestExecutionResult["meta"] | null;
  setMeta: (events: TestExecutionResult["meta"] | null) => void;
  browserLogs: TestExecutionResult["browserLogs"] | null;
  setBrowserLogs: (events: TestExecutionResult["browserLogs"] | null) => void;
};

type BeforeAfter = "before" | "after";
const CypressEventsContext = createContext<CypressEventsContextType>({
  beforeAfter: "before",
  events: [],
  setEvents: () => {},
  selectedEvent: -1,
  selectedEventObject: null,
  setSelectedEvent: (i: number) => {},
  setBeforeAfter: () => {},
  meta: null,
  setMeta: () => {},
  browserLogs: null,
  setBrowserLogs: () => {},
});

export const useCypressEventsContext = () => useContext(CypressEventsContext);

export default function CypresEventsContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfter>("before");
  const [cypressEvents, setCypressEvents] = useState<CypressEvent[]>([]);
  const [meta, setMeta] = useState<TestExecutionResult["meta"] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const [_browserLogs, setBrowserLogs] = useState<
    TestExecutionResult["browserLogs"] | null
  >(null);

  const orderedEvents = orderBy(cypressEvents, (event) => event.timestamp, "asc");

  const selectedEventObject =
    selectedEvent === -1 ? null : orderedEvents[selectedEvent] ?? null;

  const setEvents = (e: CypressEvent[]) => {
    setCypressEvents(e);
    setSelectedEvent(-1);
  };

  const filterFn = (ts: number): boolean => {
    const logDate = new Date(ts);

    const cypressEventDate = new Date(
      selectedEventObject!.payload.wallClockStartedAt
    );

    if (!isValidDate(logDate) || !isValidDate(cypressEventDate)) return false;

    return logDate.getTime() <= cypressEventDate.getTime();
  };

  const browserLogs = !selectedEventObject
    ? null
    : {
        logEntry:
          _browserLogs?.logEntry.filter((val) => filterFn(val.timestamp)) ?? [],
        runtimeConsoleApiCalled:
          _browserLogs?.runtimeConsoleApiCalled.filter((val) =>
            filterFn(val.timestamp)
          ) ?? [],
      };

  return (
    <CypressEventsContext.Provider
      value={{
        beforeAfter,
        events: orderedEvents,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        selectedEventObject,
        setBeforeAfter,
        meta,
        setMeta,
        browserLogs,
        setBrowserLogs,
      }}
    >
      {children}
    </CypressEventsContext.Provider>
  );
}

import { CypressEvent } from "@currents/cypress-debugger-support";
import {
  LogEntry,
  RuntimeConsoleAPICalled,
  TestExecutionResult,
} from "@currents/cypress-debugger-plugin";
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
const CypressStepsContext = createContext<CypressEventsContextType>({
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

export const useCypressEventsContext = () => useContext(CypressStepsContext);

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

  const orderedSteps = orderBy(cypressEvents, (step) => step.timestamp, "asc");

  const selectedEventObject =
    selectedEvent === -1 ? null : orderedSteps[selectedEvent] ?? null;

  const setEvents = (e: CypressEvent[]) => {
    setCypressEvents(e);
    setSelectedEvent(-1);
  };

  // TODO: display the logs per step; currently, logs timestamp is greater than cypress events timestamp
  const filterFn = (val: LogEntry | RuntimeConsoleAPICalled): boolean => {
    const logDate = new Date(val.timestamp);

    const cypressStepDate = new Date(
      selectedEventObject!.payload.wallClockStartedAt
    );

    if (!isValidDate(logDate) || !isValidDate(cypressStepDate)) return false;

    const logTimestamp = logDate.getTime();
    const cypressStepTimestamp = cypressStepDate.getTime();

    console.log({logTimestamp, cypressStepTimestamp, delta: logTimestamp - cypressStepTimestamp})

    return logTimestamp <= cypressStepTimestamp;
  };

  const browserLogs = !selectedEventObject
    ? null
    : {
        logEntry: _browserLogs?.logEntry.filter(filterFn) ?? [],
        runtimeConsoleApiCalled:
          _browserLogs?.runtimeConsoleApiCalled.filter(filterFn) ?? [],
      };

  return (
    <CypressStepsContext.Provider
      value={{
        beforeAfter,
        events: orderedSteps,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        selectedEventObject,
        setBeforeAfter,
        meta,
        setMeta,
        browserLogs: _browserLogs,
        setBrowserLogs,
      }}
    >
      {children}
    </CypressStepsContext.Provider>
  );
}

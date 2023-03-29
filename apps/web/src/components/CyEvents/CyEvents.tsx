import {
  CypressEvent,
  RunContextData,
} from "@currents/cypress-debugger-support";
import { CyEventItem } from "./CyEventItem";
import styles from "./CyEvents.module.scss";

export function CyEvents({
  meta,
  events,
  selectedEvent,
  setSelectedEvent,
}: {
  meta: RunContextData | null;
  events: CypressEvent[];
  selectedEvent: number;
  setSelectedEvent: (i: number) => void;
}) {
  if (!events.length) return null;

  return (
    <ul className={styles.events}>
      {meta && (
        <li className={styles["events_meta"]}>
          [{meta?.spec}&nbsp;]{meta?.test.join(" > ")}
          <span>
            {" "}
            retry:
            {meta.retryAttempt}
          </span>
        </li>
      )}
      {events.map((e, i) => (
        <CyEventItem
          key={e.id}
          event={e}
          active={selectedEvent === i}
          onClick={() => setSelectedEvent(i)}
        />
      ))}
    </ul>
  );
}

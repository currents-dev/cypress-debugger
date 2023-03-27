import { CypressEvent } from "@currents/cypress-debugger-support";
import { CyEventItem } from "./CyEventItem";
import styles from "./CyEvents.module.scss";

export function CyEvents({
  events,
  selectedEvent,
  setSelectedEvent,
}: {
  events: CypressEvent[];
  selectedEvent: number;
  setSelectedEvent: (i: number) => void;
}) {
  if (!events.length) return null;

  return (
    <ul className={styles.events}>
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

import { CypressEvent } from 'cypress-debugger';
import CyEventItem from './CyEventItem';

function CyEvents({
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
    <ul className="max-h-[calc(100vh-16.25rem)] overflow-auto">
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

export default CyEvents;

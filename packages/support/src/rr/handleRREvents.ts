import { eventWithTime } from "@rrweb/types";
import { enhanceEvent, eventsContainer, EventType } from "../events";

export const handleRREvent = (event: eventWithTime) =>
  eventsContainer.addEvent(enhanceEvent(event, EventType.RRWeb));

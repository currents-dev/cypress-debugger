import { eventWithTime } from "@rrweb/types";
import { eventsContainer } from "../events";

export const handleRREvent = (event: eventWithTime) =>
  eventsContainer.addRREvent(event);

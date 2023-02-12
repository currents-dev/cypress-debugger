import { getEnvironmentLifetime } from "../env/perf";
import { uuid } from "../uuid";
import { Event, EventType } from "./event";

export const enhanceEvent = (event: Event, type: EventType) => ({
  payload: event,
  type,
  id: uuid(),
  t: Date.now(),
  d: getEnvironmentLifetime(),
});

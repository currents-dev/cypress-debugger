import { pick } from "lodash";
import { getEnvironmentLifetime } from "../env/perf";
import { uuid } from "../uuid";
import {
  CypressEvent,
  CypressEventMeta,
  CypressEventPayload,
  Event,
  RawEvent,
  RRWebEvent,
} from "./event";

export const enhanceEvent = (event: RawEvent): Event => ({
  payload: event,
  id: uuid(),
  timestamp: Date.now(),
  offset: getEnvironmentLifetime(),
  duration: 0,
});

export const enhanceCypressEvent = (
  event: RawEvent,
  meta: CypressEventMeta
): CypressEvent => ({
  ...enhanceEvent(event),
  meta,
});

export const enhanceRREvent = (event: RawEvent): RRWebEvent =>
  enhanceEvent(event);

export const formatCypressEvent = (event: Event): CypressEventPayload => {
  // TODO: figure out consoleProps, renderProps and $el
  // const consoleProps = pick(event.consoleProps, ["Command", "Elements", "Selector"]);

  return {
    ...pick(event, [
      "alias",
      "aliasType",
      "chainerId",
      "displayName",
      "ended",
      "err",
      "event",
      "highlightAttr",
      "hookId",
      "id",
      "numElements",
      "instrument",
      "message",
      "method",
      "name",
      "state",
      "testCurrentRetry",
      "testId",
      "totalTime",
      "type",
      "url",
      "viewportHeight",
      "viewportWidth",
      "wallClockStartedAt",
    ]),
  };
};

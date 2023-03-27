import { pick } from "lodash";
import { getEnvironmentLifetime } from "../env/perf";
import { uuid } from "../uuid";
import {
  CypressEvent,
  CypressEventMeta,
  CypressEventPayload,
  CypressRawEvent,
  RRWebEvent,
  RRWebRawEvent,
} from "./event";

export const enhanceEvent = (event: any): any => ({
  payload: event,
  id: uuid(),
  timestamp: Date.now(),
  offset: getEnvironmentLifetime(),
  duration: 0,
});

export const enhanceCypressEvent = (
  event: CypressRawEvent,
  meta: CypressEventMeta
): CypressEvent => ({
  ...enhanceEvent(event),
  meta,
});

export const enhanceRREvent = (event: RRWebRawEvent): RRWebEvent =>
  enhanceEvent(event);

export const formatCypressEvent = (
  event: CypressRawEvent
): CypressEventPayload => {
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

import { last } from "lodash";
import { getEnvironmentLifetime } from "../env/perf";
import { warn } from "../logger";
import { getRRNodes } from "../rr";
import {
  enhanceCypressEvent,
  enhanceEvent,
  formatCypressEvent,
} from "./enhancer";
import {
  CypressEvent,
  CypressEventMeta,
  CypressRawEvent,
  RRWebEvent,
  RRWebRawEvent,
} from "./event";

const cypressEvents: CypressEvent[] = [];
const rrEvents: RRWebEvent[] = [];
const cypressEventsMap = new Map<string, number>();

export const reset = () => {
  cypressEventsMap.clear();
  cypressEvents.splice(0, cypressEvents.length);
  rrEvents.slice(0, rrEvents.length);
};

export const getEvents = () => ({
  cy: cypressEvents,
  rr: rrEvents,
});

export const getLastRREventId = () => last(rrEvents)?.id ?? null;

export const addCypressEvent = (event: CypressRawEvent) => {
  const meta: CypressEventMeta = {
    before: {
      rrId: getLastRREventId(),
      rrNodes: getRRNodes(event.$el),
    },
    after: {
      rrId: null,
      rrNodes: [],
    },
  };
  const i = cypressEvents.push(
    enhanceCypressEvent(formatCypressEvent(event), meta)
  );
  cypressEventsMap.set(event.id, i - 1);
};

export const updateCypressEvent = (id: string, update: CypressRawEvent) => {
  const i = cypressEventsMap.get(id);
  if (!i) {
    return;
  }
  const event = cypressEvents[i];
  if (!event) {
    warn("Registered cypress event not found in event container");
    return;
  }

  event.duration = getEnvironmentLifetime() - event.offset;
  event.payload = formatCypressEvent(update);
  event.meta.after = {
    rrId: getLastRREventId(),
    rrNodes: getRRNodes(update.$el),
  };
};

export const addRREvent = (event: RRWebRawEvent) =>
  rrEvents.push(enhanceEvent(event));

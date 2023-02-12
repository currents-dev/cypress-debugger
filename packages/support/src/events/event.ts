import { eventWithTime } from "@rrweb/types";

type CypressEvent = any;
type RRWebEvent = eventWithTime;

export type Event = CypressEvent | RRWebEvent;

export enum EventType {
  RRWeb = "rr",
  Cypress = "cy",
}

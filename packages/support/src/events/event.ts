export type CypressRawEvent = any;
export type RRWebRawEvent = any;
export type RawEvent = CypressRawEvent | RRWebRawEvent;

export type CypressEventMeta = {
  before: {
    rrId: string | null;
    rrNodes: number[];
  };
  after: {
    rrId: string | null;
    rrNodes: number[];
  };
};

export type CypressEventPayload = any;
export type RRWebEventPayload = any;

type BaseEvent = {
  id: string;
  timestamp: number;
  offset: number;
  duration: number;
};
export type CypressEvent = BaseEvent & {
  payload: CypressEventPayload;
  meta: CypressEventMeta;
};

export type RRWebEvent = BaseEvent & {
  payload: RRWebEventPayload;
};

export type Event = CypressEvent | RRWebEvent;

export enum EventType {
  RRWeb = "rr",
  Cypress = "cy",
}

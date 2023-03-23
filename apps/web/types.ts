import { RRwebPlayerOptions } from "rrweb-player";

export type RRWebPlayerEvent = RRwebPlayerOptions["props"]["events"][0];

export type Payload = {
  cy: CypressStep[];
  rr: ReplayerStepData[];
  har: HttpArchiveLog;
};

export interface ReplayerStepData {
  payload: ReplayerPayload;
  id: string;
  timestamp: number;
  offset: number;
  duration: number;
}

export interface ReplayerPayload {
  type: number;
  data: Data;
  timestamp: number;
  [key: string]: any;
}

interface Data {
  node?: Node;
  initialOffset?: InitialOffset;
}

interface Node {
  type: number;
  childNodes?: ChildNodesEntity[] | null;
  compatMode?: string;
  id: number;
}

interface ChildNodesEntity extends Node {
  tagName?: string;
  isStyle?: boolean | null;
  textContent?: string | null;
  isSVG?: boolean | null;
  attributes?: Attributes | null;
}

interface Attributes {
  [key: string]: any;
}

interface InitialOffset {
  left: number;
  top: number;
}

export interface CypressStep {
  payload: CypressStepPayload;
  id: string;
  timestamp: number;
  offset: number;
  duration: number;
  meta: Meta;
}

export interface CypressStepPayload {
  chainerId?: string;
  ended?: boolean;
  event: boolean;
  hookId: string;
  id: string;
  instrument: string;
  message: string;
  name: string;
  state: string;
  testCurrentRetry: number;
  testId: string;
  type?: string;
  url: string;
  viewportHeight: number;
  viewportWidth: number;
  wallClockStartedAt: string;
  [key: string]: any;
}

interface Meta {
  before: BeforeOrAfter;
  after: BeforeOrAfter;
}

interface BeforeOrAfter {
  rrId?: string | null;
  rrNodes?: number[] | null;
}

export interface HttpArchiveLog {
  log: Log;
}

interface Log {
  version: string;
  pages?: any[] | null;
  creator: Creator;
  entries: HttpArchiveEntry[];
}

interface Creator {
  name: string;
  version: string;
  comment: string;
}

export interface HttpArchiveEntry {
  startedDateTime: string;
  time: number;
  timings: Timings;
  request: HttpArchiveEntryRequest;
  response: HttpArchiveEntryResponse;
  cache: Cache;
  serverIPAddress: string;
  _priority: string;
  _resourceType: string;
  _webSocketMessages?: any[] | null;
  _eventSourceMessages?: any[] | null;
  connection?: string;
}

interface Timings {
  blocked: number;
  dns: number;
  ssl: number;
  connect: number;
  send: number;
  wait: number;
  receive: number;
}

export interface HttpArchiveEntryRequest {
  method: string;
  url: string;
  httpVersion: string;
  headers?: HeadersEntity[] | null;
  queryString?: QueryStringEntity[] | null;
  cookies?: any[] | null;
  headersSize: number;
  bodySize: number;
}

interface Entity {
  name: string;
  value: string;
}

export interface HeadersEntity extends Entity {}
export interface QueryStringEntity extends Entity {}

export interface HttpArchiveEntryResponse {
  status: number;
  statusText: string;
  httpVersion: string;
  headers?: HeadersEntity[] | null;
  cookies?: any[] | null;
  content: Content;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  _transferSize: number;
}

interface Content {
  size: number;
  mimeType: string;
  compression?: number;
  text: string;
}

interface Cache {
  [key: string]: any;
}

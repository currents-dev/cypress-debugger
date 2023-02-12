import { debug } from "../logger";
import { Event } from "./event";

const events = new Set();

export const addEvent = (event: Event) => {
  debug("add event", event);
  events.add(event);
};

export const reset = () => {
  events.clear();
};

export const getEvents = () => events;

export const updateEvent = (event: Event) => {
  debug("update event", event);
  events.delete(event);
  events.add(event);
};

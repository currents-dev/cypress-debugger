import { CypressRawEvent } from "../events";
import { addCypressEvent, updateCypressEvent } from "../events/container";
import { injectRROnce } from "../rr";

// https://docs.cypress.io/api/events/catalog-of-events#App-Events
export function onBeforeWindowLoad(window: Window) {
  console.log("window:before:load");
  injectRROnce(window);
}

export async function onBeforeTestRun() {
  console.log("test:before:run:async");
}

export function onAfterTestRun() {
  console.log("test:after:run");
}

export function onException() {
  console.log("onException");
}

export function onURLChange() {
  console.log("url:changed");
}

export function onLogAdded(e: CypressRawEvent) {
  // console.log("log:added");
  addCypressEvent(e);
}

export function onLogChanged(e: CypressRawEvent) {
  // console.log("log:changed");
  updateCypressEvent(e.id, e);
}

export function onHook() {
  console.log("onHook");
}

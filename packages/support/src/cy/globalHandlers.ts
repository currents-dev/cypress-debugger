import { enhanceEvent, eventsContainer, EventType } from "../events";
import { injectRROnce } from "../rr";

export function onBeforeWindowLoad(window: Window) {
  injectRROnce(window);
}

export async function onBeforeTestRun() {
  console.log("onBeforeTestRun");
}

export function onAfterTestRun() {
  console.log("onAfterTest");
}

export function onException() {
  console.log("onException");
}

export function onURLChange() {
  console.log("onURLChange");
}

export function onLogAdded(a, b, c) {
  console.log("onLogAdded");
  console.log(a, b, c);
  eventsContainer.addEvent(enhanceEvent(a, EventType.Cypress));
}

export function onLogChanged(a, b, c) {
  console.log("onLogChanged");
  console.log(a, b, c);
}

export function onHook() {
  console.log("onHook");
}

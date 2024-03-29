import { CypressRawEvent, eventsContainer } from '../events';
import { addCypressEvent, updateCypressEvent } from '../events/container';
import { injectRROnce } from '../rr';

// https://docs.cypress.io/api/events/catalog-of-events#App-Events
export function onBeforeWindowLoad(window: Window) {
  injectRROnce(window, eventsContainer.addRREvent);
}

export function onLogAdded(e: CypressRawEvent) {
  addCypressEvent(e);
}

export function onLogChanged(e: CypressRawEvent) {
  updateCypressEvent(e.id, e);
}

export function onHook() {}

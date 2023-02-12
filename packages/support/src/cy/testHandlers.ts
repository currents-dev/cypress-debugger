import { eventsContainer } from "../events";
import { debug } from "../logger";
import { injectRROnce } from "../rr";

export function handleBefore() {
  console.log("before");
}

export function handleAfter() {
  console.log("after");
}

export function handleBeforeEach() {
  cy.window().then((window) => {
    injectRROnce(window);
  });
}

export function handleAfterEach() {
  console.log("after each");
  debug(eventsContainer.getEvents());
  eventsContainer.reset();
}

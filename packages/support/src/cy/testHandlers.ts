import { eventsContainer } from "../events";
import { injectRROnce } from "../rr";

export function handleBefore() {
  console.log("before");
  cy.window().then((window) => {});
}

export function handleAfter() {
  console.log("after");
}

export function handleBeforeEach() {
  console.log("before each");
  cy.window().then((window) => {
    injectRROnce(window);
  });
}

export function handleAfterEach() {
  console.log("after each");
  cy.task("_curr_dump_events", eventsContainer.getEvents()).then(() =>
    eventsContainer.reset()
  );
}

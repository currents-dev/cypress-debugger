import { eventsContainer } from "../events";
import { injectRROnce } from "../rr";
import { getRunContext } from "./runContext";

export function handleBefore() {
  console.log("before");
  cy.window().then((window) => {});
}

export function handleAfter() {
  console.log("after");

  // remove har directory
  cy.task("_remove_har_dir");
}

export function handleBeforeEach() {
  console.log("before each");
  cy.window().then((window) => {
    injectRROnce(window);
  });

  cy.recordHar();
}

export function handleAfterEach() {
  console.log("after each");

  const eventsBatch = eventsContainer.getEvents();

  // get cy and rr events + test meta
  cy.task("_curr_dump_events", {
    id: eventsBatch.testId,
    meta: getRunContext(),
    cy: eventsBatch.events.cy,
    rr: eventsBatch.events.rr,
  })

  const harFilename = `${eventsBatch.testId}.raw.json`;

  // create dump file for network data
  cy.saveHar({
    outDir: "dump_har",
    fileName: harFilename,
  });

  // read the data from generated har file
  cy.task("_read_har_data", harFilename);

  // create dump file + reset current execution events
  cy.task("_create_dump_file").then(() => eventsContainer.reset());
}

import { eventsContainer } from "../events";
import { injectRROnce } from "../rr";

const harOutputDir = "dump_har";

export function handleBefore() {
  console.log("before");
  cy.window().then((window) => {});
}

export function handleAfter() {
  console.log("after");
  cy.task("_remove_dump_har", { dir: harOutputDir });
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

  const testEvents = eventsContainer.getEvents();

  const harOutputFile = `${testEvents.testId}.raw.json`;

  cy.task("_curr_dump_events", testEvents).then(() => eventsContainer.reset());

  cy.saveHar({ outDir: harOutputDir, fileName: harOutputFile });

  cy.task("_move_har_to_dump", {
    filename: harOutputFile,
    dir: harOutputDir,
  });
}

import { eventsContainer } from '../events';
import { injectRROnce } from '../rr';
import { getRunContext } from './runContext';

export function handleBefore() {
  cy.window().then(() => {});
}

export function handleAfter() {
  // remove har directory
  cy.task('cleanup');
}

export function handleBeforeEach() {
  cy.window().then((window) => {
    injectRROnce(window, eventsContainer.addRREvent);
  });

  cy.recordHar();
}

export function handleAfterEach() {
  const eventsBatch = eventsContainer.getEvents();
  const harFilename = `${eventsBatch.testId}.raw.json`;

  // create dump file for network data
  cy.saveHar({
    outDir: 'dump_har',
    fileName: harFilename,
  });

  // get cy and rr events + test meta
  cy.task('dumpEvents', {
    id: eventsBatch.testId,
    meta: getRunContext(),
    cy: eventsBatch.events.cy,
    rr: eventsBatch.events.rr,
    harFilename,
  }).then(() => eventsContainer.reset());
}

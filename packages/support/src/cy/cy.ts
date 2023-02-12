/// <reference types="cypress" />

import {
  onAfterTestRun,
  onBeforeTestRun,
  onBeforeWindowLoad,
  onException,
  onHook,
  onLogAdded,
  onLogChanged,
  onURLChange,
} from "./globalHandlers";

import {
  handleAfter,
  handleAfterEach,
  handleBefore,
  handleBeforeEach,
} from "./testHandlers";

export function attachHandlers() {
  Cypress.on("uncaught:exception", onException);
  Cypress.on("window:before:load", onBeforeWindowLoad);

  Cypress.on("url:changed", onURLChange);

  Cypress.on("test:before:run:async", onBeforeTestRun);
  Cypress.on("test:after:run", onAfterTestRun);

  Cypress.on("log:added", onLogAdded);
  Cypress.on("log:changed", onLogChanged);

  // @ts-ignore
  Cypress.mocha.getRunner().on("hook", onHook);

  before(handleBefore);
  beforeEach(handleBeforeEach);

  after(handleAfter);
  afterEach(handleAfterEach);
}

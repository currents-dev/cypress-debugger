/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="cypress" />

import {
  onBeforeWindowLoad,
  onHook,
  onLogAdded,
  onLogChanged,
} from './globalHandlers';

import {
  handleAfter,
  handleAfterEach,
  handleBefore,
  handleBeforeEach,
} from './testHandlers';

export function attachHandlers() {
  // register commands to generate HAR files
  // eslint-disable-next-line global-require
  require('@neuralegion/cypress-har-generator/commands');

  Cypress.on('window:before:load', onBeforeWindowLoad);
  Cypress.on('log:added', onLogAdded);
  Cypress.on('log:changed', onLogChanged);

  // @ts-ignore
  Cypress.mocha.getRunner().on('hook', onHook);

  before(handleBefore);
  beforeEach(handleBeforeEach);

  after(handleAfter);
  afterEach(handleAfterEach);
}

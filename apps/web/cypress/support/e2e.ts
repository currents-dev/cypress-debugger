import { support } from "@currents/cypress-debugger";
import "./commands";

support();
beforeEach(() => {
  cy.visit("/");
});

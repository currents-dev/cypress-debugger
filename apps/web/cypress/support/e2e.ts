import { debuggerSupport } from "@currents/cypress-debugger";
import "./commands";

debuggerSupport();
beforeEach(() => {
    cy.visit("/");
  });

import { debuggerSupport } from "cypress-debugger";
import "./commands";

debuggerSupport();
beforeEach(() => {
    cy.visit("/");
  });

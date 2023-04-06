export interface RunContextData {
  spec: string;
  test: string[];
  retryAttempt: number;
}

export function getRunContext(): RunContextData {
  return {
    spec: Cypress.spec.name,
    test: Cypress.currentTest.titlePath,
    retryAttempt: Cypress.currentRetry,
  };
}

declare global {
  interface Window {
    rrwebRecord: typeof import('rrweb').record;
  }

  interface Cypress {
    cy: {
      recordHar: typeof import('@neuralegion/cypress-har-generator').recordHar;
      saveHar: typeof import('@neuralegion/cypress-har-generator').saveHar;
      disposeOfHar: typeof import('@neuralegion/cypress-har-generator').disposeOfHar;
    };
  }
}

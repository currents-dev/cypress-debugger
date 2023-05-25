const { defineConfig } = require('cypress');
const { debuggerPlugin } = require('cypress-debugger');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://todomvc.com/examples/backbone',
    specPattern: 'cypress/e2e/*.spec.js',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      debuggerPlugin(on, {
        meta: {
          key: 'value',
        },
        callback: (file) => {
          // executed after each test
          console.log('Trace file %s', file);
        },
      });

      return config;
    },
  },
  projectId: '9aOuF6',
  video: true,
  videoUploadOnPasses: false,
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://todomvc.com/examples/backbone",
    specPattern: "cypress/e2e/*.spec.js",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      require("@currents/cypress-debugger").install(on, {
        meta: {
          key: "value",
        },
        callback: (val) => {
          // executed after each test
        },
      });

      return config;
    },
  },
  projectId: "9aOuF6",
  video: true,
  videoUploadOnPasses: false,
});

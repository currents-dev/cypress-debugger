const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://todomvc.com/examples/backbone",
    specPattern: "cypress/e2e/*.spec.js",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      on("task", {
        _curr_dump_events(events) {
          const ts = Date.now();
          fs.mkdirSync("./dump", { recursive: true });
          fs.writeFileSync(
            `./dump/${ts}.raw.json`,
            JSON.stringify(events, null, 2)
          );
          return null;
        },
      });

      return config;
    },
  },
  projectId: "9aOuF6",
  video: true,
  videoUploadOnPasses: false,
});

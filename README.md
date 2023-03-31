# Cypress Debugger

Debug cypress tests in CI - use rrweb to capture the execution, cypress hooks to capture cypress commands, and HttpArchive Generator to record the network.

## Development

Start the packages in development mode

```sh
npm install
npm run dev
```

Runs a few tests

```sh
cd apps/web
npm install
npx cypress run
```

The plugin generates a `json` file for each test into `apps/web/dump`. Each file contains the following information about a specific test: 

- `cy` - a list of cypress events. The data is taken from the cypress `log:added` event, and pushed into an array, emptied at the `afterEach` hook.

- `rr` - a list of [rrweb](https://www.npmjs.com/package/rrweb) entries, which represents the browser state at a moment in time. The entries are linked to `cy` events on cypress `log:added` and `log:changed` events.

- `har` - network history recorded by the [HttpArchive Generator](https://github.com/NeuraLegion/cypress-har-generator). The recording is started at `beforeEach` hook, and stopped at `afterEach`. The data is saved in a temporary folder then read, and moved to the result file.

- `meta` - an object which contains the following test data:
  ```typescript
  {
    spec: string; // spec filename
    test: string[]; // test title
    retryAttempt: number; // https://docs.cypress.io/guides/guides/test-retries
  }
  ```

- `browserLogs` - the browser logs at a moment in time. Only works with Chrome, Chromium, or Canary browsers. The data by connecting to the browser using [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface), a [Chrome Debugging Protocol](https://chromedevtools.github.io/devtools-protocol/) interface. The Chrome Debugging Protocol is connecting to the browser at `before:browser:launch` event.

- `pluginMeta` - an object containing the data passed down to the `meta` field of the install optional, second parameter:
  ```js
    // cypress.config.js

    setupNodeEvents(on, config) {
      require("@currents/cypress-debugger").install(on, {
        // pluginMeta
        meta: {
          key: "value",
        },
      });

      return config;
    })
  ```

Run the local server at http://localhost:3000/ and upload some files from `apps/web/dump` using the UI.

## Notes

To run tests with the Electron browser - run `ELECTRON_EXTRA_LAUNCH_ARGS="--remote-debugging-port=9222" npx cypress run`. Please refer to the [Electron documentation](https://www.electronjs.org/docs/latest/api/command-line-switches#--remote-debugging-portport) and the [Cypress documentation](https://docs.cypress.io/api/plugins/browser-launch-api#Modify-Electron-app-switches) for more information on how to properly configure this switch.

A `har.json` file could be visualized with [this tool](https://toolbox.googleapps.com/apps/har_analyzer/)

To obtain a result containing `browserLogs` run `npx cypress run --browser chrome --spec ./cypress/e2e/local.spec.js`

## Usage

- call the `install` function inside the `setupNodeEvents` in the cypress config file:

The function takes the cypress events as the first parameter, and an optional object as the second parameter.

Available options:
 - `meta` - the field is passed down to every generated file.
 - `callback` -  a function that executes after each test having the generated data as a parameter.

```typescript
const { defineConfig } = require("cypress");

const options: { meta?: any; callback?: Function } = {}

module.exports = defineConfig({
  e2e: {
    ...
    setupNodeEvents(on, config) {
      require("@currents/cypress-debugger").install(on, options);

      return config;
    },
  },
  ...
});
```

- call the `support` function in the `cypress/support/e2e` file:

```typescript
import { support } from "@currents/cypress-debugger";
import "./commands";

support();
beforeEach(() => {
  cy.visit("/");
});
```

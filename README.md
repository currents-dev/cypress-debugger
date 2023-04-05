# Cypress Debugger

Debug cypress tests in CI - collect and analyze rrweb records, browser network information, and browser console logs for each cypress step.

The plugin generates a `json` file for each test into the `dump` folder inside the working directory. Each file contains the following fields:

- `cy` - a list of cypress events. The data is collected from the cypress [`log:added`](https://docs.cypress.io/api/cypress-api/catalog-of-events) event.

- `rr` - a list of [rrweb](https://www.npmjs.com/package/rrweb) records, which represents the mutations in the DOM. The entries are linked to `cy` events on cypress `log:added` and `log:changed` events.

- `har` - an [HTTPArchive(HAR)](http://www.softwareishard.com/blog/har-12-spec/) object, recorded by the [HttpArchive Generator](https://github.com/NeuraLegion/cypress-har-generator).

- `meta` - [`RunContextData`](./packages/support/src/cy/runContext.ts) an object with the following fields:
  ```typescript
  {
    spec: string; // spec filename
    test: string[]; // test title
    retryAttempt: number; // https://docs.cypress.io/guides/guides/test-retries
  }
  ```

- `browserLogs` - the browser logs at a moment in time. The data is collected using [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface).

- `pluginMeta` - the data passed down to the optional `meta` field of the `debuggerPlugin` options argument.

The collected data can be visualized by uploading a file to the web app.

## Requirements

- Cypress version 10+
- NodeJS [14+](https://docs.cypress.io/guides/getting-started/installing-cypress#:~:text=If%20you're%20using%20npm,Node.js%2014.x)

## Setup

Install the package:

```sh
npm install cypress-debugger
```

Add `cypress-debugger` to `cypress.config.{js|ts|mjs}`

```js
// cypress.config.js
const { defineConfig } = require("cypress");
const { debuggerPlugin } = require("cypress-debugger");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        debuggerPlugin(on);
        return config;
    },
  },
});
```

Add `cypress-debugger` to `cypress/support/e2e.{js|ts}`

```js
// cypress/support/e2e.js
const { debuggerSupport } = require("cypress-debugger");
debuggerSupport();
```

## Usage

Start running the tests with the following command:
```sh
npx cypress run --chrome
```

To run the plugin with the Electron app you need to set the remote-debugging-port launch argument: 

```sh
ELECTRON_EXTRA_LAUNCH_ARGS=--remote-debugging-port=9222 npx cypress run --browser electron
```

Please refer to the [Electron documentation](https://www.electronjs.org/docs/latest/api/command-line-switches#--remote-debugging-portport) and the [Cypress documentation](https://docs.cypress.io/api/plugins/browser-launch-api#Modify-Electron-app-switches) for more information on usage with Electron.

## Example

See an example in [apps/web](https://github.com/currents-dev/cypress-debugger//blob/main/apps/web) directory.

## API

### debuggerPlugin

Installs cypress-debugger.

```ts
debuggerPlugin(on: Cypress.PluginEvents, options?: PluginOptions): void
```

- `on` - [`Cypress.PluginEvents`](https://docs.cypress.io/guides/tooling/plugins-guide) `setupNodeEvents` method first argument
- `options` - [`PluginOptions`](./packages/plugin/src/types.ts) an object with the following fields:
  - `meta`: an optional field which is added to the `TestExecutionResult` as `pluginMeta`
  - `callback`: a callback function which is called after each test having the current test results as argument

Example:

```js
// cypress.config.js
const { defineConfig } = require("cypress");
const { debuggerPlugin } = require("cypress-debugger");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        debuggerPlugin(on, {
            meta: {
                key: 'value'
            },
            callback: (data) => {
                console.log(data)
            }
        });
        return config;
    },
  },
});
```

### debuggerSupport

Attaches required handlers to [Cypress events](https://docs.cypress.io/api/cypress-api/catalog-of-events)

```ts
debuggerSupport(): void
```

# Cypress Debugger

Debug cypress tests in CI - collect and analyze the following information from the test execution: 
- the steps performed by cypress
- the DOM mutation caused by each cypress instuction
- network records caused by navigation or requests
- console logs that occur in the browser durring the test

## Requirements

- Cypress version 10+
- NodeJS [14+](https://docs.cypress.io/guides/getting-started/installing-cypress#:~:text=If%20you're%20using%20npm,Node.js%2014.x)
- Chromium family browsers only

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

Get the test execution information from the `dump` directory, relative to the cypress configuation file.

Analyze the information using the debugger web app.

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

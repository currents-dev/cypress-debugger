# Cypress Debugger

Capture and replay Cypress Tests. Debug your failed and flaky CI cypress tests by replaying execution traces.

- Cypress test execution steps
- DOM snapshots
- network requests (HAR)
- browser console logs

The plugin captures and replays everything that's happening in Cypress tests, think of it as Playwright traces for Cypress.

<p align="center">
  <img width="830" src="https://github.com/currents-dev/cypress-debugger/assets/1637928/e2fbc9cf-d3bf-4192-8d9d-97d6726c8bdd" />
</p>

<p align="center">
 <a href="https://www.loom.com/share/6c2135fa1dce492ca997edd5cf56efe6">Video Demo</a> | <a href="https://sorry-cypress.dev">Sorry Cypress</a> | <a href="https://currents.dev">Currents</a>
</p>

## Requirements

- Cypress version 10+
- NodeJS [^14.17.0](https://docs.cypress.io/guides/getting-started/installing-cypress#:~:text=If%20you're%20using%20npm,Node.js%2014.x)
- Chromium family browsers only

## Setup

Install the package:

```sh
npm install cypress-debugger
```

Add `cypress-debugger` to `cypress.config.{js|ts|mjs}`

```js
// cypress.config.js
const { defineConfig } = require('cypress');
const { debuggerPlugin } = require('cypress-debugger');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      debuggerPlugin(on, {
        meta: {
          key: 'value',
        },
        // path: abosulte path to the dump file
        // data: captured data
        callback: (path, data) => {
          console.log({
            path,
            data,
          });
        },
      });
      return config;
    },
  },
});
```

Add `cypress-debugger` to `cypress/support/e2e.{js|ts}`

```js
// cypress/support/e2e.js
const { debuggerSupport } = require('cypress-debugger');
debuggerSupport();
```

## Usage

Configure the plugin as documented above. Use the `callback` function to fetch the location of the replay file you can open in the player. Get the test execution information from the `dump` directory, relative to the cypress configuration file.

Analyze the information using the debugger web app.

### Chore / Chromium

```sh
npx cypress run --chrome
```

### Electron

Set the `remote-debugging-port` via `ELECTRON_EXTRA_LAUNCH_ARGS` environment variable:

```sh
ELECTRON_EXTRA_LAUNCH_ARGS=--remote-debugging-port=9222 npx cypress run --browser electron
```

## Example

See an example in [apps/web](https://github.com/currents-dev/cypress-debugger//blob/main/apps/web) directory.

## API

### debuggerPlugin

Installs cypress-debugger.

```ts
debuggerPlugin(on: Cypress.PluginEvents, options?: PluginOptions): void
```

- `on` - [`Cypress.PluginEvents`](https://docs.cypress.io/guides/tooling/plugins-guide) `setupNodeEvents` method first argument
- `options` - [`PluginOptions`](./packages/plugin/src/types.ts):
  - `meta: Record<string, unknown>`: an optional field that is added to the `TestExecutionResult` as `pluginMeta`
  - `callback: (path: string, data: TestExecutionResult`: a callback function that will be called after each test

Example:

```js
// cypress.config.js
const { defineConfig } = require('cypress');
const { debuggerPlugin } = require('cypress-debugger');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      debuggerPlugin(on, {
        meta: {
          key: 'value',
        },
        callback: (path, data) => {
          console.log({ path, data });
        },
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

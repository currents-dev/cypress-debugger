# Cypress Debugger

Capture and replay Cypress Tests. Debug your failed and flaky CI cypress tests by replaying execution traces.

- Cypress test execution steps
- DOM snapshots
- network requests (HAR)
- browser console logs

The plugin captures and replays everything that's happening in Cypress tests, think of it as Playwright traces for Cypress. The player is available at: https://cypress-debugger.dev

<p align="center">
  <img width="830" src="https://static.currents.dev/cypress-debugger-banner-gh.png" />
</p>

<p align="center">
 <a href="https://www.loom.com/share/6c2135fa1dce492ca997edd5cf56efe6">Video Demo</a> | <a href="https://cypress-debugger.dev">Player</a> | <a href="https://sorry-cypress.dev">Sorry Cypress</a> | <a href="https://currents.dev">Currents</a>
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

### Chrome / Chromium

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

### Plugin: `debuggerPlugin`

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

### Support File: `debuggerSupport`

Attaches required handlers to [Cypress events](https://docs.cypress.io/api/cypress-api/catalog-of-events)

```ts
debuggerSupport(): void
```

## Troubleshooting

Our example setup is working with Chromim-based (Electron and Chrome / Chromium) browsers. We have also created an [example CI integration with GitHub](https://github.com/currents-dev/cypress-debugger/blob/main/.github/workflows/example.yml). Most chances, your existing configuration is more complex and there are additional plugins that interfere with how this plugins works.

- Try to simplify your configuration until you get a working example as appears in the example [apps/web](https://github.com/currents-dev/cypress-debugger//blob/main/apps/web)
- Slowly enable the rest of the plugins, one-by-one until you face the issue
- Use the debug mode to identify possible root cause: `NODE_DEBUG=cypress-har-generator* DEBUG=cypress:*,cypress-debugger* ELECTRON_EXTRA_LAUNCH_ARGS=--remote-debugging-port=9226 npx cypress run --browser electron`
- If you found a workaround, submit a contribution with code or documentation improvement
- If you found a bug, submit a [new issue](https://github.com/currents-dev/cypress-debugger/issues/new) with all the details and suggestion

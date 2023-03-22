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
npx cypress run --browser chrome
```

You will see new `json` files created in `apps/web/dump`. Each file contains fields: `cy`, `rr`, and `har`.

- `cy` - data from cypress events
- `rr` - data from the [rrweb](https://www.npmjs.com/package/rrweb)
- `har` - data from the [HttpArchive Generator](https://github.com/NeuraLegion/cypress-har-generator)

Extract those fields and replace the contents of `cy.json`, `rr.json`, and `har.json` respectively in `apps/web/data`.

A basic UI that consumes the data from `apps/web/data` is available at http://localhost:3000/

### Notes

A `har.json` file could be visualized with [this tool](https://toolbox.googleapps.com/apps/har_analyzer/)

The [HAR generator](https://github.com/NeuraLegion/cypress-har-generator), currently, only supports Chrome family browsers. Please refer to [this](https://github.com/NeuraLegion/cypress-har-generator#generating-a-har-file) section in order to run cypress for other browsers.

## Usage

- call the `install` function inside the `setupNodeEvents` in the cypress config file:

```typescript
const { defineConfig } = require("cypress");
const { install }  = require("@currents/cypress-debugger");

module.exports = defineConfig({
  e2e: {
    ...
    setupNodeEvents(on, config) {
      install(on, config);
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

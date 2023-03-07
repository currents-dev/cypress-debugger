# Cypress Debugger

Debug cypress tests in CI - use rrweb to capture the execution, and cypress hooks the capture cypress commands.

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
npx run cypress
```

You will see new `json` files created in `apps/web/dump`. Each file contains fields: `cy` and `rr`. Extract those field and replace the contents of https://codesandbox.io/s/rr-cy-alt-h01293?file=/src/App.js

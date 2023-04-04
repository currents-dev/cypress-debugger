## Project Structure

The project is a monorepo created with [turbo](https://turbo.build/repo) which contains the following workspaces:

- [`cypress-debugger`](./packages/cypress-debugger) - exports the `debuggerSupport` and `debuggerPlugin` methods, required for plugin installation.

- [`@currents/cypress-debugger-support`](./packages/support) - exports a function that attaches handlers to [Cypress Events](https://docs.cypress.io/api/cypress-api/catalog-of-events).

- [`@currents/cypress-debugger-plugin`](./packages/plugin) - exports a function that should be called inside the `setupNodeEvents` and attaches [Cypress Plugin Events](https://docs.cypress.io/api/plugins/writing-a-plugin) handlers. 

- [`eslint-config-custom`](./packages/eslint-config-custom) - shared [eslint](https://eslint.org/) configuration.

- [`tsconfig`](./packages/tsconfig) - shared [tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

- [`web`](./apps/web) - a web application used to visualize the generated results, created with [Vite](https://vitejs.dev/), [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/).

## Development

Start the packages in development mode

```sh
npm install
npm run dev
```

Runs a few tests

```sh
cd apps/web
npx cypress run --browser chrome
```

## Build
```sh
npm run build
```
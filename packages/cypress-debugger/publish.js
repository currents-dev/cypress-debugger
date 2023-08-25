#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const pkg = require('./package.json');
const { argv } = require('process');

const tag = argv[2];

if (!tag) {
  console.error('ERROR: You must specify a tag (latest|beta)');
  process.exit(1);
}

const newPkg = {
  ...pkg,
  types: undefined,
  files: ['*'],
  dependencies: {
    ...pkg.dependencies,
    '@currents/cypress-debugger-plugin': pkg.version,
    '@currents/cypress-debugger-support': pkg.version,
  },
  exports: {
    '.': {
      import: './index.mjs',
      require: './index.js',
      types: './index.d.ts',
    },
  },
};
delete newPkg['types'];

fs.writeFileSync(
  './dist/package.json',
  JSON.stringify(newPkg, null, 2),
  'utf-8'
);
fs.copyFileSync('./README.md', './dist/README.md');
fs.copyFileSync('../../LICENSE.md', './dist/LICENSE.md');
execSync(`npm pack --dry-run && npm publish --tag ${tag}`, {
  cwd: './dist',
  stdio: 'inherit',
});

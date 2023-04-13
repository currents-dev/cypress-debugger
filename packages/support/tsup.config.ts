import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  noExternal: ['rrweb'],
  target: 'es2015',
  entry: ['src/index.ts'],
  loader: {
    '.src': 'text',
  },
});

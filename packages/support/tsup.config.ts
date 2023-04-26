import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  dts: true,
  noExternal: ['rrweb'],
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  loader: {
    '.src': 'text',
  },
});

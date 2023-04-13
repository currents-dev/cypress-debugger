import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  target: 'es2015',
  noExternal: ['rrweb'],
  entry: ['src/index.ts'],
});

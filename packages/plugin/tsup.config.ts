import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: true,
  clean: true,
  minify: true,
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
});

import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: true,
  clean: true,
  entry: ["index.ts"],
  loader: {
    ".src": "base64",
    ".webp": "file",
  },
  format: ["cjs", "esm"],
  noExternal: ['@currents/cypress-debugger-plugin', '@currents/cypress-debugger-support'],
  dts: true,
});

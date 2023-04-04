import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: true,
  clean: true,
  bundle: true,
  entry: ["src/index.ts"],
  loader: {
    ".src": "text",
  },
  dts: true,
});

import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: true,
  clean: true,
  bundle: true,
  noExternal: ["rrweb"],
  entry: ["src/index.ts", "src/plugin/index.ts", "src/support/index.ts"],
  loader: {
    ".src": "text",
  },
});

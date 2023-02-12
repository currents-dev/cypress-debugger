import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: true,
  clean: true,
  entry: ["src/index.ts", "src/plugin/index.ts", "src/support/index.ts"],
  loader: {
    ".src": "base64",
    ".webp": "file",
  },
});

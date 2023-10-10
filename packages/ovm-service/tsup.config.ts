import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/common.ts", "src/node.ts"],
  format: ["cjs", "esm"],
  target: "esnext",
  clean: true,
  treeshake: true,
  dts: true,
  splitting: false,
  sourcemap: false,
  minify: false,
});

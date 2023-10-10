import react from "@vitejs/plugin-react";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "~sb": fileURLToPath(new URL("./.storybook", import.meta.url)),
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    lib: {
      entry: "src/main.ts",
      formats: ["es", "cjs"],
      fileName: "main",
    },
  },
  css: {
    modules: { generateScopedName: createGenerateScopedName() },
  },
  plugins: [
    UnoCSS(),
    react(),
    dts({
      entryRoot: fileURLToPath(new URL("./src", import.meta.url)),
    }),
    excludeDependenciesFromBundle(),
  ],
});

/**
 * Generate scoped name for CSS modules
 */
export function createGenerateScopedName() {
  /**
   * Cached CSS file hash
   */
  const cachedCSSHash = new Map<string, string>();

  function getCSSHash(fileName: string, css: string): string {
    let hash = cachedCSSHash.get(fileName);
    if (!hash) {
      hash = crypto.createHash("md5").update(css).digest("hex").slice(0, 5);
      cachedCSSHash.set(fileName, hash);
    }
    return hash;
  }

  return function generateScopedName(
    className: string,
    fileName: string,
    css: string
  ): string {
    const moduleName = path.basename(fileName).split(".")[0];
    const hash = getCSSHash(fileName, css);
    return `${moduleName}_${className}_${hash}`;
  };
}

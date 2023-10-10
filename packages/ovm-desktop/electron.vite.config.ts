import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import crypto from "node:crypto";
import path from "path";
import UnoCSS from "unocss/vite";
import { fileURLToPath } from "url";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/main",
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/preload",
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": fileURLToPath(
          new URL("./src/renderer/src", import.meta.url)
        ),
        "~": fileURLToPath(new URL("../studio-home/src", import.meta.url)),
        "~sb": fileURLToPath(
          new URL("../studio-home/.storybook", import.meta.url)
        ),
      },
    },
    css: {
      modules: { generateScopedName: createGenerateScopedName() },
    },
    build: {
      cssCodeSplit: false,
      emptyOutDir: true,
      sourcemap: true,
      minify: false,
      outDir: "dist/renderer",
    },
    plugins: [UnoCSS(), react()],
  },
});

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

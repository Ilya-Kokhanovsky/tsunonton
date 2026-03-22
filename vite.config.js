import { defineConfig } from "vite";
import { rmSync } from "node:fs";

function cleanGeneratedJsOutputs() {
  const generatedTargets = [
    "static/js/main.min.js",
    "static/js/modules/i18n.min.js",
    "static/js/modules/index-enhancements.min.js",
    "static/js/modules/theme-preload.min.js",
    "static/js/pages/knowledge.min.js",
    "static/js/schema/index.min.js",
    "static/js/schema/knowledge.min.js",
    "static/js/schema/privacy.min.js",
    "static/js/schema/cookies.min.js",
    "static/js/chunks"
  ];

  return {
    name: "clean-generated-js-outputs",
    buildStart() {
      for (const target of generatedTargets) {
        rmSync(target, { recursive: true, force: true });
      }
    }
  };
}

export default defineConfig({
  root: ".",
  plugins: [cleanGeneratedJsOutputs()],
  build: {
    outDir: "static",
    emptyOutDir: false,
    sourcemap: false,
    minify: "esbuild",
    target: "es2017",
    rollupOptions: {
      input: {
        "main": "static/js/main.js",
        "modules/i18n": "static/js/modules/i18n.js",
        "modules/index-enhancements": "static/js/modules/index-enhancements.js",
        "modules/theme-preload": "static/js/modules/theme-preload.js",
        "schema/index": "static/js/schema/index.js",
        "schema/knowledge": "static/js/schema/knowledge.js",
        "schema/privacy": "static/js/schema/privacy.js",
        "schema/cookies": "static/js/schema/cookies.js",
        "pages/knowledge": "static/js/pages/knowledge.js"
      },
      output: {
        entryFileNames: "js/[name].min.js",
        chunkFileNames: "js/chunks/[name]-[hash].min.js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  }
});

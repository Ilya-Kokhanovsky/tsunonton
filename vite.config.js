import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
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

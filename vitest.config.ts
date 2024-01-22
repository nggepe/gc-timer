import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    css: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      all: true,
      exclude: [
        "vitest.config.ts",
        "types/*",
        "public/*",
        "coverage/*",
        "node_modules/*",
        ".prettierrc.js",
        "vitest.setup.ts",
        "src/App.tsx",
      ],
    },
  },
});

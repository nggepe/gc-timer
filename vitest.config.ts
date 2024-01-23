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
        "src/types/*",
        "public/*",
        "coverage/*",
        "node_modules/*",
        ".prettierrc.mjs",
        "vitest.setup.ts",
        "src/App.tsx",
        "src/main.tsx",
        ".eslintrc.cjs",
        "src/vite-env.d.ts",
      ],
    },
  },
});

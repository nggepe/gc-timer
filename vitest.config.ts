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
        "next.config.js",
        ".next/*",
        "next-env.d.ts",
        "vitest.config.ts",
        "__test__/*",
        "types/*",
        "public/*",
        "coverage/*",
        "node_modules/*",
        ".prettierrc.js",
        "prisma/*",
        "scripts/library/prisma.ts",
        "ecosystem.config.js",
        "vitest.setup.ts",
        "pages/_app.tsx",
        "library/*",
        "middleware.ts",
        "scripts/types/*",
      ],
    },
  },
});

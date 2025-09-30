/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": resolve("./src"),
      "@assets": resolve("./src/assets"),
      components: resolve("./src/design-system/components"),
      "design-system": resolve("./src/design-system"),
      pages: resolve("./src/pages"),
      hooks: resolve("./src/hooks"),
      lib: resolve("./src/lib"),
      api: resolve("./src/api"),
      providers: resolve("./src/providers"),
      queries: resolve("./src/queries"),
      state: resolve("./src/state"),
      forms: resolve("./src/forms"),
      i18n: resolve("./src/i18n"),
      mocks: resolve("./src/mocks"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
      "/health": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("@mui/")) {
              return "mui-vendor";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query-vendor";
            }
            return "vendor";
          }

          if (id.includes("/src/design-system/")) {
            return "design-system";
          }

          if (id.includes("/src/pages/")) {
            return "pages";
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                ?.replace(".tsx", "")
                .replace(".ts", "")
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    target: "es2020",
  },
});

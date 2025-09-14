import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": resolve("./src"),
      "@assets": resolve("./src/assets"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
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
            // Other vendor dependencies
            return "vendor";
          }

          // Design system chunk
          if (id.includes("/src/design-system/")) {
            return "design-system";
          }

          // Pages chunk (but these will be split by lazy loading)
          if (id.includes("/src/pages/")) {
            return "pages";
          }
        },
        // Optimize chunk size
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
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: "esbuild",
    // Optimize dependencies
    target: "es2020",
  },
});

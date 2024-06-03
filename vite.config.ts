import path from "path";
import { defineConfig } from "vite";

// Plugins
import react from "@vitejs/plugin-react";
import preserveDirectives from "rollup-preserve-directives";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preserveDirectives()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5183,
  },
});

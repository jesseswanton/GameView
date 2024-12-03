import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 10000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  envPrefix: "VITE_", // Only variables prefixed with 'VITE_' are exposed to the frontend
});

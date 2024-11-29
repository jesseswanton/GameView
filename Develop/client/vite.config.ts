import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  envPrefix: "VITE_", // Only variables prefixed with 'VITE_' are exposed to the frontend
});

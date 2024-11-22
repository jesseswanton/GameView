import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,  // The port to run the app on
    open: true,   // Automatically open in the browser
  },
  envPrefix: 'VITE_',  // Only variables prefixed with 'VITE_' are exposed to the frontend
});

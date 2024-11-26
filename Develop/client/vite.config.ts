import { defineConfig } from 'vite';

export default defineConfig({
  server: {
<<<<<<< HEAD
    port: 3000,
    open: true,
    proxy: {
      '/api': {
<<<<<<<< HEAD:Develop/client/vite.config.ts
        target: "https://api.igdb.com/v4",
========
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3002',
>>>>>>>> main:Develop/client/vite.config.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
=======
    port: 3000,  // The port to run the app on
    open: true,   // Automatically open in the browser
  },
  envPrefix: 'VITE_',  // Only variables prefixed with 'VITE_' are exposed to the frontend
>>>>>>> main
});

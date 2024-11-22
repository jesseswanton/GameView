/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_YOUTUBE_API_KEY: string;
    // Add other VITE_ prefixed variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_YOUTUBE_API_KEY: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
export interface Video {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
      };
    };
  }
  
  export interface YouTube {
    search: {
      list(request: {
        q: string;
        part: string;
        maxResults: number;
      }): Promise<{ result: { items: Video[] } }>;
    };
  }
  
  export interface GapiClient {
    youtube: YouTube;
    setApiKey(apiKey: string): void;
    load(api: string, version: string, callback: () => void): void;
  }
  
  // Declare gapi object globally
  declare global {
    interface Window {
      gapi: {
        client: GapiClient;
      };
    }
  }
  
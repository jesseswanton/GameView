export interface Video {
  id: { videoId: string };
  snippet: {
    thumbnails: { default: { url: string } };
    title: string;
    description: string;
  };
}

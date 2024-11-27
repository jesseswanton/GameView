const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_URL = "https://www.googleapis.com/youtube/v3/search";

export const fetchVideos = async (query: string, maxResults: number = 10) => {
  if (!query.trim()) {
    throw new Error("Query is empty.");
  }

  const url = `${API_URL}?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.items) {
    throw new Error("No videos found.");
  }

  return data.items;
};
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import he from "he";

interface Video {
  id: { videoId: string };
  snippet: {
    thumbnails: { default: { url: string } };
    title: string;
    description: string;
  };
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const API_URL = "https://www.googleapis.com/youtube/v3/search";

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
          query
        )}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
      } else {
        console.error("No videos found", data);
      }
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  const handleNavigate = () => {
    navigate("/"); // Navigates to the Home page
  };

  return (
    <div>
      <h2>
        Reviews for the video game selected will automatically be searched here
      </h2>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleNavigate}>Go back</button>

      <div>
        {videos.map((video, index) => (
          <div key={video.id.videoId || index} className="video">
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <h3>{he.decode(video.snippet.title)}</h3> {/* Decode HTML entities */}
            <p>{he.decode(video.snippet.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

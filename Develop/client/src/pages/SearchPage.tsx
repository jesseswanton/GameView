import React, { useState } from "react";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const API_KEY = "AIzaSyAM6urYtkql9fQlZay-ENZabkXBIySwAAs"; // Replace with your actual API key
  const API_URL = "https://www.googleapis.com/youtube/v3/search";

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`
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

  return (
    <div>
      <h1>Search Videos</h1>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {videos.map((video: { snippet: { thumbnails: { default: { url: string } }, title: string, description: string } }, index: number) => (
          <div key={index} className="video">
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

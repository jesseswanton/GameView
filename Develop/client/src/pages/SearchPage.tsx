import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVideos } from "../api/YoutubeAPI";
import { Video } from "../interfaces/VideoInterface";
import he from "he";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialQuery = location.state?.searchQuery || "";
  const [query] = useState(initialQuery);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoResults = await fetchVideos(query, 10);
        setVideos(videoResults);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      loadVideos();
    }
  }, [query]);

  const handleNavigate = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div>

      <h2>{query}</h2>

      <button onClick={handleNavigate}>Check out some other games</button>

      <div>
        {videos.map((video, index) => (
          <div key={video.id.videoId || index} className="video">
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <h3>{he.decode(video.snippet.title)}</h3> {/* The decode is to fix the apostrophe issue in titles */}
            <p>{he.decode(video.snippet.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
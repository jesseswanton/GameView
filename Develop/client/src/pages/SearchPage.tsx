import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVideos } from "../api/YoutubeAPI";
import { Video } from "../interfaces/VideoInterface";
import he from "he";
import { HiArrowLeft } from "react-icons/hi";
import "../styles/gamePage.css"

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const game = location.state?.game || "";
  const [query] = useState(game.name);
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

      <div className="banner">
        <img src={game.background_image} alt={`${game.name} cover art`} />
      <HiArrowLeft size={25} onClick={handleNavigate}>Go back</HiArrowLeft>
        <h2 className="game-title">{query}</h2>
      </div>


      <div>
        {videos.map((video, index) => (
          <div key={video.id.videoId || index} className="video border-0">
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
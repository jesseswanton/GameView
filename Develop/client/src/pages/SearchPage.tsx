import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVideos } from "../api/YoutubeAPI";
import { toggleFavorite } from "../api/favoritesAPI";
import auth from "../utils/auth";
import { Video } from "../interfaces/VideoInterface";
import he from "he";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialQuery = location.state?.searchQuery || "";
  const [query] = useState(initialQuery);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message

  useEffect(() => {
    setIsLoggedIn(auth.loggedIn());
  }, []);

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

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleAddToFavorites = async () => {
    const trimmedQuery = query.replace(/^reviews for\s+/i, ""); // Remove "reviews for " prefix

    try {
      const token = auth.getToken();
      if (!token) {
        alert("You must be logged in to add favorites.");
        return;
      }

      await toggleFavorite(trimmedQuery, true, token);
      setSuccessMessage("Game added to favorites!"); // Set success message
      setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error("Error adding to favorites:", error);
      setSuccessMessage("Failed to add game to favorites.");
      setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div>
      <div className="flex items-center cursor-pointer">
        <button className="btn" onClick={() => navigate(-1)}>
          Go back
        </button>

        {isLoggedIn && (
          <button
            className="btn"
            onClick={handleAddToFavorites}
            style={{
              backgroundColor: successMessage ? "green" : "black",
              color: successMessage ? "white" : "white",
            }}
          >
            {successMessage || "Add Game to Favorites"}
          </button>
        )}
      </div>

      <h1 className="title">{query}</h1>
      <br></br>
      {selectedVideo ? (
        <div className="video-player">
          <button className="close-button" onClick={handleClosePlayer}>
            Close
          </button>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            title={selectedVideo.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <br></br>
          <h3>{he.decode(selectedVideo.snippet.title)}</h3>
          <br></br>
          <p>{he.decode(selectedVideo.snippet.description)}</p>
        </div>
      ) : (
        <div className="video-list">
          {videos.map((video, index) => (
            <div
              key={video.id.videoId || index}
              className="video border-0 cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              <h3>{he.decode(video.snippet.title)}</h3>
              <br></br>
              <p>{he.decode(video.snippet.description)}</p>
            </div>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
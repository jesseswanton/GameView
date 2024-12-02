import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVideos } from "../api/YoutubeAPI";
import { toggleFavorite } from "../api/favoritesAPI";
import auth from "../utils/auth";
import { Video } from "../interfaces/VideoInterface";
import he from "he";
import { HiOutlineArrowLeft, HiOutlineStar } from "react-icons/hi";
// import { FcReddit } from "react-icons/fc";
import "../styles/gamePage.css";
import { fetchGameDetails } from "../api/rawgAPI";

const SearchPage: React.FC = () => {
  interface gameDetails {
    description: string;
    reddit_url: string;
    reddit_name: string;
    website: string;
  }

  const location = useLocation();
  const navigate = useNavigate();

  const game = location.state?.game || "";
  const [query] = useState(game.name);
  const [videos, setVideos] = useState<Video[]>([]);
  const [gameDetails, setGameDetails] = useState<gameDetails>();
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

    const getGameDetails = async () => {
      const id = game.id;
      try {
        const gameDetails = await fetchGameDetails(id);
        if (gameDetails) {
          setGameDetails(gameDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      loadVideos();
      getGameDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const cleanDescription = gameDetails ? stripHtmlTags(he.decode(gameDetails.description)) : "";

  return (
    <div>
      <div className="banner">
        <img src={game.background_image} alt={`${game.name} cover art`} />
        <div className="details">
          <HiOutlineArrowLeft stroke="white" className="back" size={25} onClick={() => navigate(-1)}></HiOutlineArrowLeft>
          <h2 className="game-title"><a href={gameDetails?.website}>{query}</a></h2>
          <div className="flex items-center cursor-pointer">
        {isLoggedIn && (
          <HiOutlineStar className="favorite" size={20} stroke="#fef08a"
            onClick={handleAddToFavorites}
            style={{
              fill: successMessage ? "yellow" : "none",
            }}
          >
            {successMessage || "Add Game to Favorites"}
          </HiOutlineStar>
        )}
      </div>

          <div>{gameDetails && <p>{cleanDescription}</p>}</div>
        </div>
      </div>
      <span className="extra-details">
        <div className="extra-details-released">
          <h3>Released:</h3>
          <p>{game.released}</p>
        </div>
        <div className="extra-details-rated">
          <h3>Rating:</h3>
          <p>{game.esrb_rating.name}</p>
        </div>
        <div className="extra-details-genres">
          <h3>Genres:</h3>
          <p>{game.genres.map((genre: { name: string }) => genre.name).join(", ")}</p>
        </div>
        <div className="extra-details-platforms">
          <h3>Platforms:</h3>
          <p>{game.platforms.map((platform: { platform: { name: string } }) => platform.platform.name).join(", ")}</p>
        </div>
        <div className="reddit">
          <h3>Join the community:</h3>
          <a href={gameDetails?.reddit_url} target="_blank">{game.name}</a>
        </div>
      </span>
      <div className="container">
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
  </div>
  );
};

export default SearchPage;
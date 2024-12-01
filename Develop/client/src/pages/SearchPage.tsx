import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVideos } from "../api/YoutubeAPI";
import { Video } from "../interfaces/VideoInterface";
import he from "he";
import { HiOutlineArrowLeft } from "react-icons/hi";
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

  const handleNavigate = () => {
    navigate("/"); // Navigate to the home page
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
          <HiOutlineArrowLeft stroke="white" className="back" size={25} onClick={handleNavigate}>Go back</HiOutlineArrowLeft>
          <h2 className="game-title"><a href={gameDetails?.website}>{query}</a></h2>
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
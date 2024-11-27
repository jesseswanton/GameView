import React, { useState, useEffect, useLayoutEffect, MouseEventHandler } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import "../styles/login.css";
import { GameData } from "../interfaces/Data";
import { useNavigate, Link } from "react-router-dom";



const Home: React.FC = () => {
  // Login state
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve users:", err);
      setError(true);
    }
  };

  // Game list state
  const [gameArray, setGameArray] = useState<GameData[]>([]);
  const [dataCheck, setDataCheck] = useState(true);

  useEffect(() => {
    if (dataCheck) {
      fetchGames();
      setDataCheck(false);
    }
  }, [dataCheck]);

  const fetchGames = async () => {
    try {
      const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
          Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: "id, name, genres.name, release_dates.date",
          limit: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const data = await response.json();
      setGameArray(data);
    } catch (err) {
      console.error("Failed to retrieve games:", err);
    }
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    const gameId = Number(event.currentTarget.value);
    if (!isNaN(gameId)) {
      setGameArray((prevGames) => prevGames.filter((game) => game.id !== gameId));
    }
  };

  // Navigation with example query

  const navigate = useNavigate();
  const handleNavigateToSearch = () => {
    navigate("/search-video", { state: { searchQuery: "Reviews for " + "Baulder's Gate 3" } });
  };



  if (error) {
    return <ErrorPage />;
  }

    return (
    
      <>
    
      {!loginCheck ? (
        <div className="login-notice">
          {/* <h3>Please log in to view user data and game lists.</h3> */}
        </div>
      ) : (
        <UserList users={users} />
      )}

      <div className="main-list">
        <h3>Video game categories returned by the IGDB API:</h3>
        <button onClick={handleNavigateToSearch}>Search for Example Query</button>
        <div>
          <Link to="/games"> Click here to see the full game list!</Link>
        </div>
        
        {gameArray.length > 0 ? (
          <div className="game-list">
            {gameArray.map((game) => (
              <div key={game.id} className="game-details">
                <h3>{game.name}</h3>
                <h4>Genres: {game.genres?.map((g) => g.name).join(", ") || "N/A"}</h4>
                <div>
                  Release Dates:{" "}
                  {game.releaseDates?.map((d) => new Date(d.date).toLocaleDateString()).join(", ") || "Unknown"}
                </div>
                <Link to={"/edit-game"} state={{ id: game.id }}>
                  <button>Edit</button>
                </Link>
                <button value={String(game.id)} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            ))}

          </div>
        ) : (
          <div>No games available!</div>
        )}
      </div>
    </>
  );
};

export default Home;
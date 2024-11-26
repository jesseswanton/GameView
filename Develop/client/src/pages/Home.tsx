import { useState, useEffect, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { GameData } from "../interfaces/Data.js";

const MainPage = () => {
  const [gameArray, setGameArray] = useState<GameData[]>([]);
  const [dataCheck, setDataCheck] = useState(true);

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

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const gameId = Number(event.currentTarget.value);
    if (!isNaN(gameId)) {
      try {
        console.log(`Mock deletion for game ID: ${gameId}`);
        setGameArray((prevGames) =>
          prevGames.filter((game) => game.id !== gameId)
        );
      } catch (error) {
        console.error("Failed to delete game:", error);
      }
    }
  };

  useEffect(() => {
    if (dataCheck) {
      fetchGames();
    }
    setDataCheck(false);
  }, [dataCheck]);

  return (
    <div className="main-list">
      <div>
        <Link to="/games">Click here to see the full game list!</Link>
      </div>
      {gameArray.length > 0 ? (
        <div className="game-list">
          {gameArray.map((game) => (
            <div key={game.id} className="game-details">
              <h3>{game.name}</h3>
              <h4>Genres: {game.genres?.map((g) => g.name).join(", ")}</h4>
              <div>Release Dates: {game.releaseDates?.map((d) => d.date).join(", ")}</div>
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
  );
};

export default MainPage;
import { useEffect, useState } from "react";
import { fetchGames } from "../api/IGDBAPI";
import GameCard from "../components/GameCard";

interface Genre {
  id: number;
  name: string;
}

interface GameData {
  id: number;
  name: string;
  genres?: Genre[]; // Optional array of genres
}

const GameList = () => {
  const [games, setGames] = useState<GameData[]>([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        console.log("Fetched games:", data);
        setGames(data);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };

    loadGames();
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      <div>
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            genres={game.genres?.map((genre) => genre.name).join(", ") || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default GameList;
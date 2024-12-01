import React, { useState, useEffect } from 'react';
import { GameData } from "../interfaces/Data";

interface GameCardProps {
  gameName: string;
  onSelectGame: (game: GameData) => void;  // Add a callback to notify parent component
}

const GameCard: React.FC<GameCardProps> = ({ gameName, onSelectGame }) => {
  const [game, setGame] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?search=${gameName}&page_size=1&key=${import.meta.env.VITE_RAWG_KEY}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data && data.results.length > 0) {
          setGame(data.results[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (gameName) {
      fetchGame();
    }
  }, [gameName]);

  if (!game) return <p>No game found.</p>;

  return (
    <div className="card" onClick={() => onSelectGame(game)}>
      <img className="card-img" src={game.background_image} alt={`${game.name} cover art`} />
      <h3 className="card-title">{game.name}</h3>
    </div>
  );
};

export default GameCard;
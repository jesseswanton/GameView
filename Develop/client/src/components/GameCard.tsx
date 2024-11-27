import React from 'react';

interface GameCardProps {
  gameId: string;
}

const GameCard: React.FC<GameCardProps> = ({ gameId }) => {
  return (
    <div className="game-card">
      <h3>Game ID: {gameId}</h3>
      {/* You can later add more details like game name, image, etc. */}
    </div>
  );
};

export default GameCard;

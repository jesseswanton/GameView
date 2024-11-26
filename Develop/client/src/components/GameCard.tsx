import { Link } from "react-router-dom";

interface GameCardProps {
  id: number;
  name: string;
  genres: [];
  releaseDates?: { date: string }[];
  handleDelete: () => void;
}

const GameCard = ({ id, name, genres, releaseDates }: GameCardProps) => {
  return (
    <div className="game-card">
      <div className="game-card-details">
        <h3>{name}</h3>
        <h4>Genres: {genres?.map((g: { name: string; }) => g.name).join(", ") || "N/A"}</h4>
        <div>
          Release Dates: {releaseDates?.map((d) => d.date).filter(Boolean).join(", ") || "N/A"}
        </div>
      </div>
      <button>
        <Link to={`/edit-game/${id}`}>
          Edit
        </Link>
      </button>
      <button
        value={String(id)}
        aria-label={`Delete game: ${name}`}
      >
        Delete
      </button>
    </div>
  );
};

export default GameCard;
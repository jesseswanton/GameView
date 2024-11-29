import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/favoritesAPI'; // Import API functions
import GameCard from '../components/GameCard';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);  // Store gameIds
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('id_token'); // Get token from localStorage

    const fetchFavorites = async () => {
      if (token) {
        try {
          const data = await getFavorites(token);  // Fetch favorite games
          setFavorites(data.map((fav: { gameId: string }) => fav.gameId));  // Update state
        } catch (err) {
          setError('Error fetching favorites');
          console.error(err);
        }
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (gameId: string) => {
    const token = localStorage.getItem('id_token');
    if (token) {
      try {
        await removeFavorite(gameId, token);  // Remove game from favorites
        setFavorites(favorites.filter(id => id !== gameId));  // Update state after removal
      } catch (err) {
        setError('Error removing favorite');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="pb-5">
          Hey {auth.getProfile().username}!
      </h2>
      <Link to="/"> <button>Check out some other games</button>
      </Link>
      <h3>
        Your Favorite Games
      </h3>
      {error && <p>{error}</p>}
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((gameId) => (
            <div key={gameId}>
              <GameCard gameId={gameId} />
              <button onClick={() => handleRemoveFavorite(gameId)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No favorite games found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
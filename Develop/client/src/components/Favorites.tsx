import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/favoritesAPI'; // Import API functions
import GameCard from '../components/GameCard';

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
      <h1>Your Favorite Games</h1>
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
import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/favoritesAPI';
import GameCard from '../components/GameCard';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { GameData } from '../interfaces/Data';
// import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);  // Store gameNames
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);  // Store selected game
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('id_token'); // Get token from localStorage

    const fetchFavorites = async () => {
      if (token) {
        try {
          const data = await getFavorites(token);  // Fetch favorite games
          setFavorites(data.map((fav: { gameName: string }) => fav.gameName));  // Update state
        } catch (err) {
          setError('Error fetching favorites');
          console.error(err);
        }
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (gameName: string) => {
    const token = localStorage.getItem('id_token');
    if (token) {
      try {
        await removeFavorite(gameName, token);  // Remove game from favorites
        setFavorites(favorites.filter(id => id !== gameName));  // Update state after removal
      } catch (err) {
        setError('Error removing favorite');
        console.error(err);
      }
    }
  };

  // const navigate = useNavigate();
  // const handleNavigateToSearch = (gameName: string) => {
  //   if (gameName) {
  //     navigate("/search-video", { state: { game: gameName } });
  //   }
  // };

  const handleSelectGame = (game: GameData) => {
    setSelectedGame(game);
  };

  return (
    <div>
      <br></br>
      <h2 className="pb-5">
        Hey {auth.getProfile().username}!
      </h2>
      <Link to="/"> <button className='btn'>Check out some other games</button></Link>
      <br></br>
      <h1 className="title">Your Favorited Games</h1>

      {error && <p>{error}</p>}

      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((gameName) => (
            <div key={gameName}>
              <GameCard gameName={gameName} onSelectGame={handleSelectGame} />
              <button className='btn' onClick={() => handleRemoveFavorite(gameName)}>Remove from Favorites</button>
              {/* <button className='btn' onClick={() => handleNavigateToSearch(gameName)}>See Reviews</button> */}
            </div>
          ))
        ) : (
          <p>No favorite games found.</p>
        )}
      </div>

      {selectedGame && (
        <div className="game-details">
          <div className="">
            <h3>{selectedGame.name}</h3>
            <p>Rating: {selectedGame.rating} / 5</p>

            <div>
              <strong>Platforms:</strong>
              <ul>
                {selectedGame.platforms?.map((platform, index) => (
                  <li key={index}>{platform.platform.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Genres:</strong>
              <ul>
                {selectedGame.genres?.map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
            </div>

            <p>Release Date: {selectedGame.released}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
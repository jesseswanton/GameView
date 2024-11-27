import  { useState } from 'react';
import axios from 'axios';

interface Cardprops {
    id: number;
    name: string;
    image: string;
  
}

const GameCard: React.FC<Cardprops> = ({ id, name, image }) => {
     const [isFavorite, setIsFavorite] = useState(false);

     const handeFavoriteToggle = async () => {
        try {
            const newFavoriteState = !isFavorite;
            setIsFavorite(newFavoriteState);
            
           await axios.post('/api/favorites', {
                gameId: id,
                favorite: newFavoriteState,
            });

            } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div className='card'>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <button onClick={handeFavoriteToggle}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
        </div>
    );}

    export default GameCard;
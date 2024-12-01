const API_URL = 'http://localhost:3002/api/favorites';

// Function to get all favorite games
export const getFavorites = async (token: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching favorites');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching favorites');
  }
};

// Function to add or remove a game from favorites
export const toggleFavorite = async (gameName: string, isFavorite: boolean, token: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameName, favorite: isFavorite }),
    });

    if (!response.ok) {
      throw new Error('Error updating favorite');
    }

    return response.json();  // Return success message or response data
  } catch (err) {
    console.error(err);
    throw new Error('Error updating favorite');
  }
};

// Function to remove a game from favorites
export const removeFavorite = async (gameName: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/${gameName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error removing favorite');
    }

    return response.json();  // Return success message
  } catch (err) {
    console.error(err);
    throw new Error('Error removing favorite');
  }
};
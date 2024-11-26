const API_BASE_URL = "https://api.igdb.com/v4";
const HEADERS = {
  "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
  Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

// Fetch a list of games
export const fetchGames = async (): Promise<any[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        fields: "id, name, genres.name, release_dates.date",
        limit: 10,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Games fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

// Fetch a specific game by ID
export const fetchGameById = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        fields: "id, name, genres.name, release_dates.date",
        where: `id = ${id}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch game");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    return null;
  }
};
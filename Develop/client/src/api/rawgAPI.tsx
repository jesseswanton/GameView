export const fetchGames = async (query: string, page: number, ) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?${query}&page_size=50&page=${page}&key=${import.meta.env.VITE_RAWG_KEY}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json();
      if (data) {
        return data.results;
      }
    } catch (error) {
      console.log(error)
    }
}

export const fetchGameDetails = async (id: string) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_KEY}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error)
    }
}
import { Favorite } from '../models/favorite.js';
// Add a favorite for the authenticated user
export const addFavorite = async (req, res) => {
    const { gameId } = req.body; // Game ID to add to favorites
    const userId = Number(req.user?.username); // Get user ID from the token and convert to number
    if (!gameId) {
        return res.status(400).json({ message: 'Game ID is required' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const favorite = await Favorite.create({ userId, gameId, id: 0, createdAt: new Date(), updatedAt: new Date() });
        return res.status(201).json(favorite);
    }
    catch (error) {
        console.error('Error adding favorite:', error);
        return res.status(500).json({ message: 'Failed to add favorite' });
    }
};
// Remove a favorite for the authenticated user
export const removeFavorite = async (req, res) => {
    const { gameId } = req.body; // Game ID to remove from favorites
    const userId = req.user?.username; // Get user ID from the token
    if (!gameId) {
        return res.status(400).json({ message: 'Game ID is required' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const favorite = await Favorite.findOne({ where: { userId, gameId } });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        await favorite.destroy();
        return res.status(200).json({ message: 'Favorite removed' });
    }
    catch (error) {
        console.error('Error removing favorite:', error);
        return res.status(500).json({ message: 'Failed to remove favorite' });
    }
};
// Get all favorites for the authenticated user
export const getUserFavorites = async (req, res) => {
    const userId = req.user?.username; // Get user ID from the token
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const favorites = await Favorite.findAll({ where: { userId } });
        return res.status(200).json(favorites);
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        return res.status(500).json({ message: 'Failed to fetch favorites' });
    }
};

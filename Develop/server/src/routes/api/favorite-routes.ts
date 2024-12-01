import express from 'express';
import { Favorite } from '../../models/favorite.js';
import { User } from '../../models/user.js';
import { authenticateToken } from '../../middleware/auth.js';  // Import the middleware

const router = express.Router();

// Use the authentication middleware to secure your routes
router.use(authenticateToken);  // All routes after this will require authentication

// Check if the game is favorited by the logged-in user
router.get('/:gameName', async (req, res) => {
  const { gameName } = req.params;
  const { username } = req.user!;  // Get the current user from the token

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find if the game is in the user's favorites (using gameName as a string)
    const favorite = await Favorite.findOne({
      where: { userId: user.id, gameName: gameName },
    });

    return res.json({ isFavorite: favorite !== null });
  } catch (error) {
    console.error('Error checking favorite:', error);
    return res.status(500).json({ message: 'Error checking favorite status' });
  }
});

// Add or remove a game from the user's favorites
router.post('/', async (req, res) => {
  const { gameName, favorite } = req.body;
  const { username } = req.user!;  // Get the current user from the token

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the game is in the user's favorites (using gameName as a string)
    const favoriteEntry = await Favorite.findOne({
      where: { userId: user.id, gameName: gameName },
    });

    if (favorite) {
      // Add the game to favorites if not already present
      if (!favoriteEntry) {
        await Favorite.create({
          userId: user.id,
          gameName: gameName,  // Store gameName as a string in the database
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } else {
      // Remove the game from favorites if it exists
      if (favoriteEntry) {
        await favoriteEntry.destroy();
      }
    }

    return res.status(200).json({ message: 'Favorite updated successfully' });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return res.status(500).json({ message: 'Error updating favorite' });
  }
});

// Get all favorite games for a specific user
router.get('/', async (req, res) => {
  const { username } = req.user!;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorites = await Favorite.findAll({ where: { userId: user.id } });

    return res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// Remove a specific game from a user's favorites
router.delete('/:gameName', async (req, res) => {
  const { gameName } = req.params;
  const { username } = req.user!;  // Get the current user from the token

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the game in the user's favorites
    const favoriteEntry = await Favorite.findOne({
      where: { userId: user.id, gameName: gameName },
    });

    if (!favoriteEntry) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // Remove the game from favorites
    await favoriteEntry.destroy();
    return res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Error removing favorite' });
  }
});

export default router;
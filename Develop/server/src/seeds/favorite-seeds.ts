import { Favorite } from '../models/favorite.js';

export const seedFavorites = async () => {
  await Favorite.bulkCreate([
    { id: 1, userId: 1, gameId: 'Test game 1', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, userId: 1, gameId: 'Test game 2', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

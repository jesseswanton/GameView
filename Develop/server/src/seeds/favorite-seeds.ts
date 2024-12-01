import { Favorite } from '../models/favorite.js';

export const seedFavorites = async () => {
  await Favorite.bulkCreate([
    { id: 99, userId: 1, gameName: 'Test game 1', createdAt: new Date(), updatedAt: new Date() },
    { id: 100, userId: 1, gameName: 'Test game 2', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

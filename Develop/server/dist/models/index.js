import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { FavoriteFactory } from './favorite.js';
const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        // host: 'dpg-ct6gk3rv2p9s739buhjg-a',
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserFactory(sequelize);
const Favorite = FavoriteFactory(sequelize);
Favorite.belongsTo(User);
User.hasMany(Favorite);
export { sequelize, User, Favorite };

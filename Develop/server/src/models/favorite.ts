import { DataTypes, Model, Sequelize } from 'sequelize';

export interface FavoriteAttributes {
  id: number;
  userId: number;
  gameId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Favorite extends Model<FavoriteAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public gameId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function FavoriteFactory(sequelize: Sequelize): typeof Favorite {
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      gameId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'favorites',
      sequelize,
    }
  );

  return Favorite;
}

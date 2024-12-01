import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface FavoriteAttributes {
  id: number;
  userId: number;
  gameName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'id'>;

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public gameName!: string;
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
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      gameName: {
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
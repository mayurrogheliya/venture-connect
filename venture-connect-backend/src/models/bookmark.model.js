import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import Startup from './startup.model.js';
import User from './user.model.js';

class Bookmark extends Model {}

Bookmark.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    startupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Startup,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'bookmarks',
    modelName: 'Bookmark',
  },
);

export default Bookmark;

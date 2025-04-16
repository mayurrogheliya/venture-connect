import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_type: {
      type: DataTypes.ENUM(['startup', 'investor', 'admin']),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isProfileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    indexes: [{ unique: true, fields: ['email'] }],
  },
);

export default User;

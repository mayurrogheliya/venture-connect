import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import User from './user.model.js';

class Opportunity extends Model {}

Opportunity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mininvestment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    maxinvestment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    startupstage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'opportunities',
    modelName: 'Opportunity',
    timestamps: true,
  },
);

// User.hasMany(Opportunity, { foreignKey: 'userId' });
// Opportunity.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Opportunity, { foreignKey: 'userId', as: 'opportunities' });
Opportunity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Opportunity;

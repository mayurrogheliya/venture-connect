import sequelize from '../config/database';
import { DataTypes, Model } from 'sequelize';
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
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'opportunities',
    modelName: 'Opportunity',
    timestamps: true,
  },
);

export default Opportunity;

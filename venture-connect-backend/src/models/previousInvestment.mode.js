import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class PreviousInvestment extends Model {}

PreviousInvestment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Year must be a valid number' },
        min: { args: [1900], msg: 'Year must be at least 1900' },
        max: {
          args: [new Date().getFullYear()],
          msg: `Year cannot be greater than ${new Date().getFullYear()}`,
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'previousInvestment',
    tableName: 'previous_investment',
    timestamps: false,
  },
);

export default PreviousInvestment;

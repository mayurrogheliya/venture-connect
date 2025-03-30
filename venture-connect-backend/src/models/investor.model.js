import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Investor extends Model {}

Investor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'investors',
    modelName: 'Investor',
  },
);

export default Investor;

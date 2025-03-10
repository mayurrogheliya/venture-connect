import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Startup extends Model {}

Startup.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'startups',
    modelName: 'Startup',
  },
);

export default Startup;

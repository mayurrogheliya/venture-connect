import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class StartupTeam extends Model {}

StartupTeam.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    founder_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    founder_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedin_profile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'startup_team',
    modelName: 'StartupTeam',
    timestamps: false,
  },
);

export default StartupTeam;

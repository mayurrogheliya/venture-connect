import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class StartupBasicInfo extends Model {}

StartupBasicInfo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startup_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startup_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    linkedin_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_overview: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key_highlights: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'startup_basic_info',
    modelName: 'StartupBasicInfo',
  },
);

export default StartupBasicInfo;

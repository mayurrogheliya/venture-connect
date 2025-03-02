import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class StartupTeamMember extends Model {}

StartupTeamMember.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'startup_team_members',
    modelName: 'StartupTeamMember',
    timestamps: false,
  },
);

export default StartupTeamMember;

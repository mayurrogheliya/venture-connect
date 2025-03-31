import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Opportunity from '../models/opportunity.model.js';
import User from './user.model.js';
class registerStartup extends Model {}
registerStartup.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    opportunityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Opportunity, key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'registerStartup',
    tableName: 'registerstartup',
    timestamps: true,
  },
);

User.hasMany(registerStartup, { foreignKey: 'userId' });
registerStartup.belongsTo(User, { foreignKey: 'userId' });
Opportunity.hasMany(registerStartup, { foreignKey: 'opportunityId' });
registerStartup.belongsTo(Opportunity, { foreignKey: 'opportunityId' });

export default registerStartup;

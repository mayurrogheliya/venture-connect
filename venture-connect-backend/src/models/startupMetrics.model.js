import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class StartupMetrics extends Model {}

StartupMetrics.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mrr: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    yoy: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_funding: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    current_valuation: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    investment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    equity_offered: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    cac: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ltv: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    monthly_burn_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'startup_metrices',
    modelName: 'StartupMetrices',
    timestamps: false,
  },
);

export default StartupMetrics;

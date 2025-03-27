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
      get() {
        return parseFloat(this.getDataValue('mrr'));
      },
    },
    yoy: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('yoy'));
      },
    },
    total_funding: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('total_funding'));
      },
    },
    current_valuation: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('current_valuation'));
      },
    },
    investment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('investment_amount'));
      },
    },
    equity_offered: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('equity_offered'));
      },
    },
    cac: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('cac'));
      },
    },
    ltv: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('ltv'));
      },
    },
    monthly_burn_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('monthly_burn_rate'));
      },
    },
    annualRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('annualRevenue'));
      },
    },
    profitMargin: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('profitMargin'));
      },
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

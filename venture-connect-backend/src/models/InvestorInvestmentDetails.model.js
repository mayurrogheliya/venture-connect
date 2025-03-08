import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class InvestorInvestmentDetails extends Model {}

InvestorInvestmentDetails.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    investmentRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyPortfolio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    interestedDomain: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    mentorship: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'InvestorInvestmentDetails',
    tableName: 'investor_investment_details',
  },
);

export default InvestorInvestmentDetails;

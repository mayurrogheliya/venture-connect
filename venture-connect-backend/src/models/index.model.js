import InvestorBasicInfo from './InvestorBasicInfo.model.js';
import InvestorInvestmentDetails from './InvestorInvestmentDetails.model.js';
import StartupBasicInfo from './startupBasicInfo.model.js';
import StartupMetrics from './startupMetrics.model.js';
import StartupTeam from './startupTeam.model.js';
import StartupTeamMember from './StartupTeamMember.model.js';
import User from './user.model.js';

User.hasOne(StartupBasicInfo, { foreignKey: 'userId', as: 'basicInfo' });
StartupBasicInfo.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(StartupMetrics, { foreignKey: 'userId', as: 'metrics' });
StartupMetrics.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(StartupTeam, { foreignKey: 'userId', as: 'team' });
StartupTeam.belongsTo(User, { foreignKey: 'userId' });

StartupTeam.hasMany(StartupTeamMember, {
  foreignKey: 'teamId',
  as: 'teamMember',
});
StartupTeamMember.belongsTo(StartupTeam, { foreignKey: 'teamId' });

User.hasOne(InvestorBasicInfo, {
  foreignKey: 'investorId',
  as: 'investorBasicInfo',
});
InvestorBasicInfo.belongsTo(User, { foreignKey: 'investorId' });

User.hasOne(InvestorInvestmentDetails, {
  foreignKey: 'investorId',
  as: 'investmentDetails',
});
InvestorInvestmentDetails.belongsTo(User, { foreignKey: 'investorId' });

export {
  User,
  StartupBasicInfo,
  StartupMetrics,
  StartupTeam,
  StartupTeamMember,
  InvestorBasicInfo,
  InvestorInvestmentDetails,
};

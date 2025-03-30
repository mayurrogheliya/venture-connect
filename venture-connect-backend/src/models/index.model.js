import Investor from './investor.model.js';
import InvestorBasicInfo from './InvestorBasicInfo.model.js';
import InvestorInvestmentDetails from './InvestorInvestmentDetails.model.js';
import PreviousInvestment from './previousInvestment.mode.js';
import Startup from './startup.model.js';
import StartupBasicInfo from './startupBasicInfo.model.js';
import StartupMetrics from './startupMetrics.model.js';
import StartupTeam from './startupTeam.model.js';
import StartupTeamMember from './StartupTeamMember.model.js';
import User from './user.model.js';

User.hasOne(Startup, { foreignKey: 'userId', as: 'startup' });
Startup.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Investor, { foreignKey: 'userId', as: 'investor' });
Investor.belongsTo(User, { foreignKey: 'userId' });

Startup.hasOne(StartupBasicInfo, { foreignKey: 'startupId', as: 'basicInfo' });
StartupBasicInfo.belongsTo(Startup, { foreignKey: 'startupId' });

Startup.hasOne(StartupMetrics, { foreignKey: 'startupId', as: 'metrics' });
StartupMetrics.belongsTo(Startup, { foreignKey: 'startupId' });

Startup.hasOne(StartupTeam, { foreignKey: 'startupId', as: 'team' });
StartupTeam.belongsTo(Startup, { foreignKey: 'startupId' });

StartupTeam.hasMany(StartupTeamMember, {
  foreignKey: 'teamId',
  as: 'teamMember',
});
StartupTeamMember.belongsTo(StartupTeam, { foreignKey: 'teamId' });

Investor.hasOne(InvestorBasicInfo, {
  foreignKey: 'investorId',
  as: 'investorBasicInfo',
});
InvestorBasicInfo.belongsTo(Investor, { foreignKey: 'investorId' });

Investor.hasOne(InvestorInvestmentDetails, {
  foreignKey: 'investorId',
  as: 'investmentDetails',
});
InvestorInvestmentDetails.belongsTo(Investor, { foreignKey: 'investorId' });

Investor.hasMany(PreviousInvestment, {
  foreignKey: 'investorId',
  as: 'previousInvestments',
});
PreviousInvestment.belongsTo(Investor, { foreignKey: 'investorId' });

export {
  User,
  Startup,
  StartupBasicInfo,
  StartupMetrics,
  StartupTeam,
  StartupTeamMember,
  Investor,
  InvestorBasicInfo,
  InvestorInvestmentDetails,
  PreviousInvestment,
};

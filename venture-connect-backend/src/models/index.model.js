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

User.hasMany(PreviousInvestment, {
  foreignKey: 'investorId',
  as: 'previousInvestments',
});
PreviousInvestment.belongsTo(User, { foreignKey: 'investorId' });

export {
  User,
  Startup,
  StartupBasicInfo,
  StartupMetrics,
  StartupTeam,
  StartupTeamMember,
  InvestorBasicInfo,
  InvestorInvestmentDetails,
  PreviousInvestment,
};

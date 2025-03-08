import { StartupBasicInfo, StartupMetrics, StartupTeam, StartupTeamMember, User } from '../models/index.model.js';

export const createStartup = async (
  userData,
  basicInfo,
  metrics,
  team,
  teamMembers = [],
) => {
  const user = await User.create(userData);

  const SBasicInfo = await StartupBasicInfo.create({
    ...basicInfo,
    userId: user.id,
  });

  const SMetric = await StartupMetrics.create({
    ...metrics,
    userId: user.id,
  });

  const STeam = await StartupTeam.create({
    ...team,
    userId: user.id,
  });

  const TeamMemberRecords = await Promise.all(
    (Array.isArray(teamMembers) ? teamMembers : []).map(async (member) => {
      return await StartupTeamMember.create({
        ...member,
        teamId: STeam.id,
      });
    }),
  );

  return { user, SBasicInfo, SMetric, STeam, teamMembers: TeamMemberRecords };
};

export const getAllStartup = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'startup' },
    include: [
      {
        model: StartupBasicInfo,
        as: 'basicInfo',
      },
      {
        model: StartupMetrics,
        as: 'metrics',
      },
      {
        model: StartupTeam,
        as: 'team',
        include: [{ model: StartupTeamMember, as: 'teamMember' }],
      },
    ],
    distinct: true,
  });
  return { totalStartups: count, startups: rows };
};

export const getStartupById = async (userId) => {
  return await User.findOne({
    where: { id: userId, user_type: 'startup', status: true },
    include: [
      {
        model: StartupBasicInfo,
        as: 'basicInfo',
      },
      {
        model: StartupMetrics,
        as: 'metrics',
      },
      {
        model: StartupTeam,
        as: 'team',
        include: [{ model: StartupTeamMember, as: 'teamMember' }],
      },
    ],
  });
};

export const updateStartup = async (userId, updateData) => {
  const { basicInfo, metrics, team, teamMembers } = updateData;

  const user = await User.findOne({
    where: { id: userId, user_type: 'startup', status: true },
  });

  if (!user) {
    return null;
  }

  if (basicInfo) {
    await StartupBasicInfo.update(basicInfo, { where: { userId } });
  }

  if (metrics) {
    await StartupMetrics.update(metrics, { where: { userId } });
  }

  if (team) {
    const startupTeam = await StartupTeam.findOne({ where: { userId } });
    if (startupTeam) {
      await StartupTeam.update(team, { where: { userId } });
      if (Array.isArray(teamMembers) && teamMembers.length > 0) {
        await Promise.all(
          teamMembers.map(async (member) => {
            if (!member.id) return;
            const existingMember = await StartupTeamMember.findByPk(member.id);
            if (existingMember) {
              await existingMember.update({
                name: member.name || existingMember.name,
                position: member.position || existingMember.position,
                bio: member.bio || existingMember.bio,
                profile_image:
                  member.profile_image || existingMember.profile_image,
              });
            }
          }),
        );
      }
    }
  }

  return getStartupById(userId);
};

export const deleteStartup = async (userId) => {
  const user = await User.findOne({
    where: { id: userId, user_type: 'startup', status: true },
    include: [
      {
        model: StartupBasicInfo,
        as: 'basicInfo',
      },
      {
        model: StartupMetrics,
        as: 'metrics',
      },
      {
        model: StartupTeam,
        as: 'team',
        include: [{ model: StartupTeamMember, as: 'teamMember' }],
      },
    ],
  });

  if (!user) return null;

  await StartupBasicInfo.update({ startup_logo: null }, { where: { userId } });

  await StartupTeam.update({ founder_image: null }, { where: { userId } });

  if (user.team?.teamMember?.length) {
    await Promise.all(
      user.team.teamMember.map(async (member) => {
        await StartupTeamMember.update(
          {
            profile_image: null,
          },
          { where: { id: member.id } },
        );
      }),
    );
  }

  await user.update({
    status: false,
  });

  return true;
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, user_type: 'startup' } });
};

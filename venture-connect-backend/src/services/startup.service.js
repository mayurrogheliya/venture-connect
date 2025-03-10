import {
  Startup,
  StartupBasicInfo,
  StartupMetrics,
  StartupTeam,
  StartupTeamMember,
  User,
} from '../models/index.model.js';

export const createStartup = async (
  userId,
  basicInfo,
  metrics,
  team,
  teamMembers = [],
) => {
  const startup = await Startup.create({ userId });

  const SBasicInfo = await StartupBasicInfo.create({
    ...basicInfo,
    startupId: startup.id,
  });
  const SMetric = await StartupMetrics.create({
    ...metrics,
    startupId: startup.id,
  });
  const STeam = await StartupTeam.create({ ...team, startupId: startup.id });

  const TeamMemberRecords = await Promise.all(
    (Array.isArray(teamMembers) ? teamMembers : []).map(async (member) => {
      return await StartupTeamMember.create({
        ...member,
        teamId: STeam.id,
      });
    }),
  );

  await User.update({ isProfileCompleted: true }, { where: { id: userId } });

  return {
    startup,
    SBasicInfo,
    SMetric,
    STeam,
    teamMembers: TeamMemberRecords,
  };
};

export const getAllStartup = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'startup' },
    attributes: ['id', 'email', 'status', 'isProfileCompleted'],
    include: [
      {
        model: Startup,
        as: 'startup',
        attributes: ['id'],
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
      },
    ],
    distinct: true,
  });
  return { totalStartups: count, startups: rows };
};

export const getStartupById = async (startupId) => {
  const startup = await Startup.findOne({
    where: { id: startupId },
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

  if (startup.userId) {
    return await User.findOne({ where: { id: startup.userId, status: true } });
  }

  return null;
};

export const updateStartup = async (startupId, updateData) => {
  const { basicInfo, metrics, team, teamMembers } = updateData;

  const startup = await Startup.findOne({
    where: { id: startupId },
  });

  if (!startup) {
    return null;
  }

  if (basicInfo) {
    await StartupBasicInfo.update(basicInfo, { where: { startupId } });
  }

  if (metrics) {
    await StartupMetrics.update(metrics, { where: { startupId } });
  }

  if (team) {
    const startupTeam = await StartupTeam.findOne({ where: { startupId } });
    if (startupTeam) {
      await StartupTeam.update(team, { where: { startupId } });
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

  return getStartupById(startupId);
};

export const deleteStartup = async (startupId) => {
  const startup = await Startup.findOne({
    where: { id: startupId },
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

  if (!startup) return null;

  await StartupBasicInfo.update(
    { startup_logo: null },
    { where: { startupId } },
  );
  await StartupTeam.update({ founder_image: null }, { where: { startupId } });

  if (startup.team?.teamMember?.length) {
    await Promise.all(
      startup.team.teamMember.map(async (member) => {
        await StartupTeamMember.update(
          {
            profile_image: null,
          },
          { where: { id: member.id } },
        );
      }),
    );
  }

  if (startup.userId) {
    await User.update({ status: false }, { where: { id: startup.userId } });
  }

  return true;
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, user_type: 'startup' } });
};

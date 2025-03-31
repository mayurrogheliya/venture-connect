import registerStartup from '../models/registerstartup.model.js';
import Opportunity from '../models/opportunity.model.js';
import User from '../models/user.model.js';
import Startup from '../models/startup.model.js';
import StartupBasicInfo from '../models/startupBasicInfo.model.js';
import StartupMetrics from '../models/startupMetrics.model.js';

// Fetch All Registered Startups
export const getAllRegisteredStartupsService = async (opportunityId) => {
  try {
    const registeredStartups = await registerStartup.findAll({
      where: { opportunityId, status: true },
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'user_type'],
          include: [
            {
              model: Startup,
              as: 'startup',
              include: [
                {
                  model: StartupBasicInfo,
                  as: 'basicInfo',
                  attributes: ['startup_name', 'stage', 'industry'],
                },
                {
                  model: StartupMetrics,
                  as: 'metrics',
                  attributes: ['annualRevenue', 'current_valuation'],
                },
              ],
            },
          ],
        },
        {
          model: Opportunity,
          attributes: ['id'],
        },
      ],
    });

    // Transforming the response to match the desired structure
    return registeredStartups.map((reg) => {
      const startup = reg.User?.startup || {};
      const basicInfo = startup?.basicInfo || {};
      const metrics = startup?.metrics || {};

      return {
        id: reg.id,
        userId: reg.userId,
        opportunityId: reg.opportunityId,
        status: reg.status,
        startupName: basicInfo.startup_name || null,
        preferredStage: basicInfo.stage || null,
        industry: basicInfo.industry || null,
        annualRevenue: metrics.annualRevenue || null,
        currentValuation: metrics.current_valuation || null,
        createdAt: reg.createdAt,
        updatedAt: reg.updatedAt,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerStartupService = async (userId, opportunityId) => {
  try {
    const result = await registerStartup.create({
      userId,
      opportunityId,
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRegisteredStartupService = async (
  id,
  userId,
  opportunityId,
) => {
  try {
    const result = await registerStartup.findOne({
      where: { id, userId, opportunityId, status: true }, // Ensure it exists and is active
    });

    if (!result) {
      return {
        message:
          'No active registration found for the provided ID, User ID, and Opportunity ID.',
      };
    }

    result.status = false; // Soft delete by updating status to false
    await result.save();

    return {
      message: 'Startup registration status updated to false successfully.',
      registration: result, // Return the updated record for confirmation
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

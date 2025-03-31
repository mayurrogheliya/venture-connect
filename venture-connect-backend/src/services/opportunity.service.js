import Opportunity from '../models/opportunity.model.js';
import opportunityValidationSchema from '../validation/opportunityValidation.js';
import InvestorBasicInfo from '../models/InvestorBasicInfo.model.js';
import User from '../models/user.model.js';

export const createOpportunityService = async (opportunityData, userId) => {
  await opportunityValidationSchema.validate(opportunityData, {
    abortEarly: false,
  });
  return await Opportunity.create({ ...opportunityData, userId });
};

export const getAllOpportunitiesService = async () => {
  return await Opportunity.findAll();
};

export const getOpportunitiesByUserIdService = async (userId) => {
  return await Opportunity.findAll({
    where: { userId, status: 'active' },
  });
};

export const getOpportunityByIdService = async (opportunityid, userId) => {
  return await Opportunity.findOne({ where: { id: opportunityid, userId } });
};

export const updateOpportunityService = async (
  opportunityid,
  opportunityData,
  userId,
) => {
  await opportunityValidationSchema.validate(opportunityData, {
    abortEarly: false,
  });
  const opportunity = await Opportunity.findOne({
    where: { id: opportunityid, userId },
  });

  if (!opportunity) return null;

  await opportunity.update(opportunityData);
  return opportunity;
};

export const deleteOpportunityService = async (opportunityid, userId) => {
  const opportunity = await Opportunity.findOne({
    where: { id: opportunityid, userId },
  });
  if (!opportunity) return null;
  await opportunity.update({ status: 'inactive' });
  return opportunity;
};

export const getAllOpportunitiesWithoutUserIdService = async () => {
  return await Opportunity.findAll({
    where: { status: 'active' },
    include: [
      {
        model: User,
        as: 'user',
        include: [
          {
            model: InvestorBasicInfo,
            as: 'investorBasicInfo',
            attributes: ['investor_image', 'name', 'investor_type'],
          },
        ],
      },
    ],
  });
};

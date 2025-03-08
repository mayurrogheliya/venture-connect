import Opportunity from '../models/opportunity.model.js';
import opportunityValidationSchema from '../validation/opportunityValidation.js';

export const createOpportunityService = async (opportunityData) => {
  await opportunityValidationSchema.validate(opportunityData, {
    abortEarly: false,
  });
  return await Opportunity.create(opportunityData);
};

export const getAllOpportunitiesService = async () => {
  return await Opportunity.findAll();
};

export const getOpportunityByIdService = async (opportunityid) => {
  return await Opportunity.findByPk(opportunityid);
};

export const updateOpportunityService = async (
  opportunityid,
  opportunityData,
) => {
  await opportunityValidationSchema.validate(opportunityData, {
    abortEarly: false,
  });
  const opportunity = await Opportunity.findByPk(opportunityid);

  if (!opportunity) return null;

  await opportunity.update(opportunityData);
  return opportunity;
};

export const deleteOpportunityService = async (opportunityid) => {
  const opportunity = await Opportunity.findByPk(opportunityid);
  if (!opportunity) return null;
  await opportunity.update({ status: 'inactive' });
  return opportunity;
};

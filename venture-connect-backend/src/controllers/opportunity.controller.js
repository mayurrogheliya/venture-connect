import * as opportunityService from '../services/opportunity.service.js';
import {
  errorResponse,
  successResponse,
} from '../../utils/responseFormatter.js';
export const createOpportunity = async (req, res) => {
  try {
    const opportunity = await opportunityService.createOpportunityService(
      req.body,
    );

    return successResponse(
      res,
      opportunity,
      'Opportunity created successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllOpportunity = async (req, res) => {
  try {
    const opportunities = await opportunityService.getAllOpportunitiesService();

    return successResponse(
      res,
      opportunities,
      'Opportunities retrieved successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await opportunityService.getOpportunityByIdService(
      req.params.id,
    );

    if (!opportunity) return errorResponse(res, 'Opportunity not found', 404);
    return successResponse(
      res,
      opportunity,
      'Opportunity retrieved successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await opportunityService.updateOpportunityService(
      req.params.id,
      req.body,
    );
    if (!opportunity) return errorResponse(res, 'Opportunity not found', 404);
    return successResponse(
      res,
      opportunity,
      'Opportunity updated successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await opportunityService.deleteOpportunityService(
      req.params.id,
    );
    if (!opportunity) return errorResponse(res, 'Opportunity not found', 404);
    return successResponse(
      res,
      opportunity,
      'Opportunity deleted successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

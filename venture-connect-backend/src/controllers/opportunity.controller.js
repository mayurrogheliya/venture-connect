import * as opportunityService from '../services/opportunity.service.js';
import { errorResponse, successResponse } from '../utils/responseFormatter.js';

export const createOpportunity = async (req, res) => {
  try {
    // console.log(req.body, 'user', req.user);
    const userId = req.user.userId;
    const opportunity = await opportunityService.createOpportunityService(
      req.body,
      userId,
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
    const userId = req.user.userId;
    const opportunities =
      await opportunityService.getOpportunitiesByUserIdService(userId);

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
    const userId = req.user.userId;
    const opportunity = await opportunityService.getOpportunityByIdService(
      req.params.id,
      userId,
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
    const userId = req.user.userId;
    const opportunity = await opportunityService.updateOpportunityService(
      req.params.id,
      req.body,
      userId,
    );
    if (!opportunity)
      return errorResponse(res, 'Opportunity not found or Unauthorized', 404);
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
    const userId = req.user.userId;
    const opportunity = await opportunityService.deleteOpportunityService(
      req.params.id,
      userId,
    );
    if (!opportunity)
      return errorResponse(res, 'Opportunity not found or Unauthorized', 404);
    return successResponse(
      res,
      opportunity,
      'Opportunity deleted successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllOpportunitiesWithoutUserId = async (req, res) => {
  try {
    const opportunities =
      await opportunityService.getAllOpportunitiesWithoutUserIdService();

    return successResponse(
      res,
      opportunities,
      'All opportunities retrieved successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

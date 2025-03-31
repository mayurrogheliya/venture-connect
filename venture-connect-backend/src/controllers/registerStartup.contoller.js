import * as registerStartupService from '../services/registerStartup.service.js';
import { errorResponse, successResponse } from '../utils/responseFormatter.js';

export const registerStartup = async (req, res) => {
  const { opportunityId } = req.body;
  const userId = req.user.userId; // Changed from startupId to userId

  console.log('Received User ID:', userId);
  console.log('Received Opportunity ID:', opportunityId);

  if (!userId || !opportunityId) {
    return errorResponse(res, 'User ID and Opportunity ID are required', 400);
  }

  try {
    const result = await registerStartupService.registerStartupService(
      userId,
      opportunityId,
    );

    if (result.message) {
      return successResponse(res, result.message, 200);
    }

    return successResponse(
      res,
      'User successfully registered for the opportunity.',
      201,
      result,
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getAllRegisteredStartups = async (req, res) => {
  const opportunityId = req.params.id;

  if (!opportunityId) {
    return errorResponse(res, 'Opportunity ID is required', 400);
  }

  try {
    const registeredStartups =
      await registerStartupService.getAllRegisteredStartupsService(
        opportunityId,
      );
    return successResponse(
      res,
      registeredStartups,
      'Registered startups fetched successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteRegisteredStartup = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const opportunityId = req.body.opportunityId;
  if (!id) {
    return errorResponse(res, 'ID is required', 400);
  }
  try {
    const result = await registerStartupService.deleteRegisterStartupService(
      id,
      userId,
      opportunityId,
    );
    if (result) {
      return successResponse(
        res,
        null,
        'Registered startup successfully deleted',
      );
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

import { hashPassword } from '../../utils/passwordUtils.js';
import {
  errorResponse,
  successResponse,
} from '../../utils/responseFormatter.js';
import * as startupService from '../services/startup.service.js';
import {
  startupUpdateValidationSchema,
  startupValidationSchema,
} from '../validation/startupValidation.js';

export const createStartupProfile = async (req, res) => {
  try {
    await startupValidationSchema.validate(req.body, { abortEarly: false });
    const {
      user_type,
      email,
      password,
      basicInfo,
      metrics,
      team,
      teamMembers,
    } = req.body;

    const existingUser = await startupService.getUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'User already exists', 400);
    }

    if (!password) {
      return errorResponse(res, 'Password is required', 400);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await startupService.createStartup(
      { user_type, email, password: hashedPassword, isProfileCompleted: true },
      basicInfo,
      metrics,
      team,
      teamMembers,
    );

    return successResponse(
      res,
      newUser,
      'Startup profile created successfully',
    );
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.errors[0], 400);
    }
    return errorResponse(res, error.message);
  }
};

export const getStartups = async (req, res) => {
  try {
    const { totalStartups, startups } = await startupService.getAllStartup();
    return successResponse(
      res,
      { totalStartups, startups },
      'Startups fetched successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getStartup = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    const startup = await startupService.getStartupById(userId);
    if (!startup) {
      return errorResponse(res, 'Startup not found', 404);
    }
    return successResponse(
      res,
      startup,
      'Startup details fetched successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateStartupProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    const updatedStartup = await startupService.updateStartup(userId, req.body);
    if (!updatedStartup) {
      return errorResponse(res, 'Startup not found', 404);
    }

    return successResponse(res, updatedStartup, 'Startup updated successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteStartup = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    const deleted = await startupService.deleteStartup(userId);
    if (!deleted) {
      return errorResponse(res, 'Startup not found', 404);
    }

    return successResponse(res, {}, 'Startup deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

import { userValidateSchema } from '../validation/userValidation.js';
import * as userService from '../services/user.service.js';
import {
  errorResponse,
  successResponse,
} from '../../utils/responseFormatter.js';
import { hashPassword } from '../../utils/passwordUtils.js';

export const registerUser = async (req, res) => {
  try {
    await userValidateSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return errorResponse(
        res,
        'User with this email is already registered.',
        400,
      );
    }

    if (!password) {
      return errorResponse(res, 'Password is required', 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
      ...req.body,
      password: hashedPassword,
      isProfileCompleted: false,
    });

    return successResponse(res, user, 'User registered successfully');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.errors[0], 400);
    }
    return errorResponse(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { totalUsers, users } = await userService.getAllUsers();
    return successResponse(
      res,
      { totalUsers, users },
      'Users successfully retrieved',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, user, 'User successfully retrieved');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllStartupUsers = async (req, res) => {
  try {
    const { totalStartups, startups } = await userService.getAllStartupUsers();
    return successResponse(
      res,
      { totalStartups, startups },
      'Startup Users successfully retrieved',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllInvestorUsers = async (req, res) => {
  try {
    const { totalInvestors, investors } =
      await userService.getAllInvestorUsers();
    return successResponse(
      res,
      { totalInvestors, investors },
      'Investor Users successfully retrieved',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

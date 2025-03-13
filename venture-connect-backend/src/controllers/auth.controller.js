import ms from 'ms';
import * as userService from '../services/user.service.js';
import { comparePassword } from '../utils/passwordUtils.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenUtils.js';
import { loginSchema } from '../validation/authValidate.js';

const ACCESS_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export const login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: ms(REFRESH_EXPIRY),
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: ms(ACCESS_EXPIRY),
    });

    return successResponse(
      res,
      { user, accessToken, refreshToken },
      'Login successful',
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.errors[0], 400);
    }
    return errorResponse(res, error.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  return successResponse(res, null, 'Logged out successfully');
};

import { errorResponse } from '../utils/responseFormatter.js';
import { verifyAccessToken } from '../utils/tokenUtils.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      (await req.cookies?.accessToken) ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return errorResponse(res, 'Please login again.', 403);
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return errorResponse(res, 'Iternal Server error', 500);
  }
};

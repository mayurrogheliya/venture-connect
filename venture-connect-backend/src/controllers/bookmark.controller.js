import { errorResponse, successResponse } from '../utils/responseFormatter.js';
import * as bookmarkService from '../services/bookmark.service.js';

export const addBookmark = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startupId } = req.body;

    if (!startupId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    const bookmark = await bookmarkService.createBookmark(userId, startupId);
    return successResponse(res, bookmark, 'Startup bookmarked successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startupId } = req.params;

    if (!startupId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    await bookmarkService.removeBookmark(userId, startupId);
    return successResponse(res, null, 'Bookmark removed successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookmarks = await bookmarkService.getUserBookmarks(userId);
    return successResponse(res, bookmarks, 'Bookmarks fetched successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

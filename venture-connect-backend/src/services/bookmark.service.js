import {
  Bookmark,
  Startup,
  StartupBasicInfo,
  StartupMetrics,
  User,
} from '../models/index.model.js';

export const createBookmark = async (userId, startupId) => {
  // Check if the bookmark already exists
  const existingBookmark = await Bookmark.findOne({
    where: { userId, startupId },
  });

  if (existingBookmark) {
    throw new Error('Startup is already bookmarked');
  }

  // Check if startup exists
  const startup = await Startup.findByPk(startupId);
  if (!startup) {
    throw new Error('Startup not found');
  }

  // Check if user exists
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return await Bookmark.create({ userId, startupId });
};

export const removeBookmark = async (userId, startupId) => {
  const bookmark = await Bookmark.findOne({
    where: { userId, startupId },
  });

  if (!bookmark) {
    throw new Error('Bookmark not found');
  }

  await bookmark.destroy();
  return true;
};

export const getUserBookmarks = async (userId) => {
  return await Bookmark.findAll({
    where: { userId },
    include: [
      {
        model: Startup,
        as: 'startup', // Corrected alias name
        include: [
          { model: StartupBasicInfo, as: 'basicInfo' },
          { model: StartupMetrics, as: 'metrics' },
        ],
      },
    ],
  });
};

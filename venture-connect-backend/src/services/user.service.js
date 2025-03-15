import { User } from '../models/index.model.js';
export const createUser = async (userData) => {
  const user = User.create(userData);
  return user;
};

export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ['updatedAt', 'createdAt'] },
  });
};

export const getAllUsers = async () => {
  const { count, rows } = await User.findAndCountAll();
  return { totalUsers: count, users: rows };
};

export const getUserById = async (userId) => {
  return await User.findByPk(userId);
};

export const getAllStartupUsers = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'startup', status: true },
  });
  return { totalStartups: count, startups: rows };
};

export const getAllInvestorUsers = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'investor', status: true },
  });
  return { totalInvestors: count, investors: rows };
};

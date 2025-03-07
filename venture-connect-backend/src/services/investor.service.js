import { InvestorBasicInfo, User } from '../models/index.model.js';

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, user_type: 'investor' } });
};

export const createInvestor = async (userData, investorBasicInfo) => {
  const user = await User.create(userData);

  const IBasicInfo = await InvestorBasicInfo.create({
    ...investorBasicInfo,
    investorId: user.id,
  });

  return { user, IBasicInfo };
};

export const getAllInvestors = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'investor' },
    include: [
      {
        model: InvestorBasicInfo,
        as: 'investorBasicInfo',
      },
    ],
    distinct: true,
  });
  return { totalInvestors: count, investors: rows };
};

export const getInvestorById = async (investorId) => {
  return await User.findOne({
    where: { id: investorId, user_type: 'investor', status: 'true' },
    include: [
      {
        model: InvestorBasicInfo,
        as: 'investorBasicInfo',
      },
    ],
  });
};

export const updateInvestor = async (investorId, updateData) => {
  const { investorBasicInfo } = updateData;

  const user = await User.findOne({
    where: { id: investorId, user_type: 'investor', status: true },
  });

  if (!user) {
    return null;
  }

  if (investorBasicInfo) {
    await InvestorBasicInfo.update(investorBasicInfo, {
      where: { investorId },
    });
  }

  return getInvestorById(investorId);
};

export const deleteInvestor = async (investorId) => {
  const user = await User.findOne({
    where: { id: investorId, user_type: 'investor', status: 'true' },
    include: [
      {
        model: InvestorBasicInfo,
        as: 'investorBasicInfo',
      },
    ],
  });

  if (!user) {
    return null;
  }

  await InvestorBasicInfo.update(
    { investor_image: null },
    { where: { investorId } },
  );

  await user.update({ status: 'false' });
  return getInvestorById(investorId);
};

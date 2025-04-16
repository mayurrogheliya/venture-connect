import { errorResponse } from '../utils/responseFormatter.js';
import {
  Investor,
  InvestorBasicInfo,
  InvestorInvestmentDetails,
  PreviousInvestment,
  User,
} from '../models/index.model.js';

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, user_type: 'investor' } });
};

export const createInvestor = async (
  userId,
  investorBasicInfo,
  investmentData,
  previousInvestments = [],
) => {
  if (previousInvestments.length > 6) {
    errorResponse(
      res,
      'Cannot add more than 6 previous investments. Please remove some before adding new ones.',
      400,
    );
  }

  const investor = await Investor.create({ userId });

  const IBasicInfo = await InvestorBasicInfo.create({
    ...investorBasicInfo,
    investorId: investor.id,
  });

  const investmentDetails = await InvestorInvestmentDetails.create({
    ...investmentData,
    investorId: investor.id,
  });

  const investmentRecords = await Promise.all(
    (Array.isArray(previousInvestments) ? previousInvestments : []).map(
      async (investmentRecord) => {
        return await PreviousInvestment.create({
          ...investmentRecord,
          investorId: investor.id,
        });
      },
    ),
  );

  await User.update({ isProfileCompleted: true }, { where: { id: userId } });

  return { investor, IBasicInfo, investmentDetails, investmentRecords };
};

export const getAllInvestors = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'investor', status: true },
    attributes: ['id', 'email', 'status', 'isProfileCompleted'],
    include: [
      {
        model: Investor,
        as: 'investor',
        attributes: ['id'],
        include: [
          {
            model: InvestorBasicInfo,
            as: 'investorBasicInfo',
          },
          {
            model: InvestorInvestmentDetails,
            as: 'investmentDetails',
          },
          {
            model: PreviousInvestment,
            as: 'previousInvestments',
          },
        ],
      },
    ],
    distinct: true,
  });
  return { totalInvestors: count, investors: rows };
};

export const getInvestorById = async (userId) => {
  const user = await User.findOne({
    include: [
      {
        model: Investor,
        as: 'investor',
        where: { userId },
        attributes: ['id', 'userId'],
        include: [
          {
            model: InvestorBasicInfo,
            as: 'investorBasicInfo',
          },
          {
            model: InvestorInvestmentDetails,
            as: 'investmentDetails',
          },
          {
            model: PreviousInvestment,
            as: 'previousInvestments',
          },
        ],
      },
    ],
    where: { user_type: 'investor', status: true },
    attributes: ['id', 'email', 'status', 'isProfileCompleted'],
  });
  return user;
};

export const updateInvestor = async (userId, updateData) => {
  const { investorBasicInfo, investmentDetails, previousInvestments } =
    updateData;

  const investor = await Investor.findOne({ where: { userId } });

  const investorId = investor.id;

  if (!investor) {
    return null;
  }

  if (investorBasicInfo) {
    await InvestorBasicInfo.update(investorBasicInfo, {
      where: { investorId },
    });
  }

  if (investmentDetails) {
    investmentDetails.interestedDomain = Array.isArray(
      investmentDetails.interestedDomain,
    )
      ? investmentDetails.interestedDomain
      : [];

    await InvestorInvestmentDetails.update(investmentDetails, {
      where: { investorId },
    });
  }

  if (previousInvestments) {
    const existingInvestments = await PreviousInvestment.count({
      where: { investorId },
    });

    if (previousInvestments.length + existingInvestments.length > 6) {
      errorResponse(
        res,
        'Cannot add more than 6 previous investments. Please remove some before adding new ones.',
        400,
      );
    }

    if (Array.isArray(previousInvestments) && previousInvestments.length > 0) {
      await Promise.all(
        previousInvestments.map(async (investment) => {
          if (!investment.id) return;
          const existingInvestment = await PreviousInvestment.findByPk(
            investment.id,
          );
          if (existingInvestment) {
            await existingInvestment.update({ ...investment });
          }
        }),
      );
    }
  }

  return getInvestorById(userId);
};

export const deleteInvestor = async (investorId) => {
  const investor = await Investor.findOne({
    where: { id: investorId },
    include: [
      {
        model: InvestorBasicInfo,
        as: 'investorBasicInfo',
      },
      {
        model: InvestorInvestmentDetails,
        as: 'investmentDetails',
      },
      {
        model: PreviousInvestment,
        as: 'previousInvestments',
      },
    ],
  });

  if (!investor) {
    return null;
  }

  await InvestorBasicInfo.update(
    { investor_image: null },
    { where: { investorId } },
  );

  if (investor.userId) {
    await User.update({ status: false }, { where: { id: investor.userId } });
  }

  return true;
};

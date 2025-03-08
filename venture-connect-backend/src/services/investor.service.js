import { errorResponse } from '../../utils/responseFormatter.js';
import {
  InvestorBasicInfo,
  InvestorInvestmentDetails,
  PreviousInvestment,
  User,
} from '../models/index.model.js';

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, user_type: 'investor' } });
};

export const createInvestor = async (
  userData,
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

  const user = await User.create(userData);

  const IBasicInfo = await InvestorBasicInfo.create({
    ...investorBasicInfo,
    investorId: user.id,
  });

  const investmentDetails = await InvestorInvestmentDetails.create({
    ...investmentData,
    investorId: user.id,
  });

  const investmentRecords = await Promise.all(
    previousInvestments.map((investmentRecord) =>
      PreviousInvestment.create({
        ...investmentRecord,
        investorId: user.id,
      }),
    ),
  );

  return { user, IBasicInfo, investmentDetails, investmentRecords };
};

export const getAllInvestors = async () => {
  const { count, rows } = await User.findAndCountAll({
    where: { user_type: 'investor' },
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
};

export const updateInvestor = async (investorId, updateData) => {
  const { investorBasicInfo, investmentDetails, previousInvestments } =
    updateData;

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

  if (investmentDetails) {
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

    await Promise.all(
      previousInvestments.map(async (investment) => {
        if (investment.id) {
          await PreviousInvestment.update(investment, {
            where: { id: investment.id, investorId },
          });
        }
      }),
    );
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

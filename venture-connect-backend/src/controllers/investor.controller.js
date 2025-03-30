import { parseJSONFields } from '../utils/requestParse.js';
import { errorResponse, successResponse } from '../utils/responseFormatter.js';
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '../services/cloudinary.service.js';
import { uploadSingleFile } from '../services/fileUpload.service.js';
import * as investorService from '../services/investor.service.js';
import { investorValidationSchema } from '../validation/investorValidation.js';
import Investor from '../models/investor.model.js';
import * as userService from '../services/user.service.js';

export const createInvestorProfile = async (req, res) => {
  try {
    parseJSONFields(req, [
      'investorBasicInfo',
      'investmentDetails',
      'previousInvestments',
    ]);
    await investorValidationSchema.validate(req.body, { abortEarly: false });

    const {
      userId,
      investorBasicInfo,
      investmentDetails,
      previousInvestments = [],
    } = req.body;

    console.log('req.body', req.body);

    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }

    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return errorResponse(res, 'User not found', 404);
    }

    const existingInvestor = await Investor.findOne({ where: { userId } });
    if (existingInvestor) {
      return errorResponse(res, 'User already has a investor profile', 400);
    }

    const uploadedImage = await uploadSingleFile(req.file);

    const investmentsArray = Array.isArray(previousInvestments)
      ? previousInvestments
      : [];

    const formattedInvestments = investmentsArray.map((investment, index) => ({
      ...investment,
    }));

    const newInvestor = await investorService.createInvestor(
      userId,
      {
        ...investorBasicInfo,
        investor_image: uploadedImage ? uploadedImage.url : null,
      },
      investmentDetails,
      formattedInvestments,
    );

    return successResponse(
      res,
      newInvestor,
      'Investor profile created successfully',
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.errors[0], 400);
    }
    return errorResponse(res, error.message);
  }
};

export const getInvestors = async (req, res) => {
  try {
    const { totalInvestors, investors } =
      await investorService.getAllInvestors();
    return successResponse(
      res,
      { totalInvestors, investors },
      'Investors retrieved successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getInvestor = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }
    const investor = await investorService.getInvestorById(userId);
    if (!investor) return errorResponse(res, 'Investor not found', 404);
    return successResponse(res, investor, 'Investor retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateInvestorProfile = async (req, res) => {
  try {
    parseJSONFields(req, [
      'investorBasicInfo',
      'investmentDetails',
      'previousInvestments',
    ]);
    const { userId } = req.params;

    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }

    const existingInvestor = await investorService.getInvestorById(userId);
    if (!existingInvestor) {
      return errorResponse(res, 'User not found', 404);
    }

    let uploadedImage = {
      investor_image:
        existingInvestor.investor?.investorBasicInfo?.investor_image || null,
    };

    if (req.file) {
      const currentImage =
        existingInvestor.investor?.investorBasicInfo?.investor_image;
      if (currentImage) {
        await deleteImageFromCloudinary(currentImage);
      }
      uploadedImage.investor_image = await uploadImageToCloudinary(
        req.file.path,
      );
    }

    if (req.body.investmentDetails) {
      const existingDomains =
        existingInvestor.investor?.investmentDetails?.interestedDomain || [];
      req.body.investmentDetails.interestedDomain =
        req.body.investmentDetails.interestedDomain !== undefined
          ? Array.isArray(req.body.investmentDetails.interestedDomain)
            ? req.body.investmentDetails.interestedDomain
            : []
          : existingDomains;
    }

    if (existingInvestor.previousInvestments) {
      const existingInvestmentCount =
        existingInvestor.previousInvestments.length;
      if (existingInvestmentCount + req.body.previousInvestments.length > 6) {
        return errorResponse(
          res,
          'Maximum of 6 previous investments allowed',
          400,
        );
      }
    }

    const prevInvestmentsArray = Array.isArray(req.body.previousInvestments)
      ? req.body.previousInvestments
      : [];

    const updatedInvestor = await investorService.updateInvestor(userId, {
      ...req.body,
      investorBasicInfo: {
        ...req.body.investorBasicInfo,
        investor_image: uploadedImage.investor_image,
      },
      previousInvestments: prevInvestmentsArray,
    });

    return successResponse(
      res,
      updatedInvestor,
      'Investor profile updated successfully',
    );
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err) => err.message);
      return errorResponse(res, messages[0]);
    }
    return errorResponse(res, error.message);
  }
};

export const deleteInvestorProfile = async (req, res) => {
  try {
    const { investorId } = req.params;

    if (!investorId) {
      return errorResponse(res, 'Investor ID is required', 400);
    }

    const investorData = await Investor.findOne({ where: { id: investorId } });
    if (!investorData) {
      return errorResponse(res, 'Investor not found', 404);
    }
    const userId = investorData.userId;

    const existingInvestor = await investorService.getInvestorById(userId);
    if (!existingInvestor) {
      return errorResponse(res, 'Investor not found', 404);
    }

    if (existingInvestor.investorBasicInfo?.investor_image) {
      await deleteImageFromCloudinary(
        existingInvestor.investorBasicInfo.investor_image,
      );
    }

    await investorService.deleteInvestor(investorId);
    return successResponse(res, {}, 'Investor profile deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

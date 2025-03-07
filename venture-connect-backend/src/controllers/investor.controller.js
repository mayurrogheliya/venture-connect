import { hashPassword } from '../../utils/passwordUtils.js';
import { parseJSONFields } from '../../utils/requestParse.js';
import {
  errorResponse,
  successResponse,
} from '../../utils/responseFormatter.js';
import { deleteImageFromCloudinary } from '../services/cloudinary.service.js';
import { uploadSingleFile } from '../services/fileUpload.service.js';
import * as investorService from '../services/investor.service.js';
import { investorValidationSchema } from '../validation/investorValidation.js';

export const createInvestorProfile = async (req, res) => {
  try {
    parseJSONFields(req, ['investorBasicInfo', 'investmentDetails']);
    await investorValidationSchema.validate(req.body, { abortEarly: false });

    const { user_type, email, password, investorBasicInfo, investmentDetails } =
      req.body;

    const existingUser = await investorService.getUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'User already exists', 400);
    }

    if (!password) {
      return errorResponse(res, 'Password is required', 400);
    }

    const hashedPassword = await hashPassword(password);

    const uploadedImage = await uploadSingleFile(req.file);
    const newInvestor = await investorService.createInvestor(
      {
        user_type,
        email,
        password: hashedPassword,
        isProfileCompleted: true,
      },
      {
        ...investorBasicInfo,
        investor_image: uploadedImage ? uploadedImage.url : null,
      },
      investmentDetails,
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
    const { investorId } = req.params;
    if (!investorId) {
      return errorResponse(res, 'Investor ID is required', 400);
    }
    const investor = await investorService.getInvestorById(investorId);
    if (!investor) return errorResponse(res, 'Investor not found', 404);
    return successResponse(res, investor, 'Investor retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateInvestorProfile = async (req, res) => {
  try {
    parseJSONFields(req, ['investorBasicInfo', 'investmentDetails']);
    const { investorId } = req.params;

    if (!investorId) {
      return errorResponse(res, 'Investor ID is required', 400);
    }

    const existingInvestor = await investorService.getInvestorById(investorId);
    if (!existingInvestor) {
      return errorResponse(res, 'Investor not found', 404);
    }

    if (req.file) {
      await deleteImageFromCloudinary(
        existingInvestor.investorBasicInfo.investor_image,
      );
      const uploadedImage = await uploadSingleFile(req.file);
      req.body.investorBasicInfo.investor_image = uploadedImage.url;
    }

    const updatedInvestor = await investorService.updateInvestor(
      investorId,
      req.body,
    );

    return successResponse(
      res,
      updatedInvestor,
      'Investor profile updated successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteInvestorProfile = async (req, res) => {
  try {
    const { investorId } = req.params;

    if (!investorId) {
      return errorResponse(res, 'Investor ID is required', 400);
    }

    const existingInvestor = await investorService.getInvestorById(investorId);
    if (!existingInvestor) {
      return errorResponse(res, 'Investor not found', 404);
    }

    await deleteImageFromCloudinary(
      existingInvestor.investorBasicInfo.investor_image,
    );

    await investorService.deleteInvestor(investorId);
    return successResponse(res, null, 'Investor profile deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

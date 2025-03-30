import { parseJSONFields } from '../utils/requestParse.js';
import { errorResponse, successResponse } from '../utils/responseFormatter.js';
import Startup from '../models/startup.model.js';
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '../services/cloudinary.service.js';
import { uploadFiles } from '../services/fileUpload.service.js';
import * as startupService from '../services/startup.service.js';
import * as userService from '../services/user.service.js';
import { startupValidationSchema } from '../validation/startupValidation.js';

export const createStartupProfile = async (req, res) => {
  try {
    parseJSONFields(req, ['basicInfo', 'metrics', 'team', 'teamMembers']);
    await startupValidationSchema.validate(req.body, { abortEarly: false });
    const { userId, basicInfo, metrics, team, teamMembers = [] } = req.body;

    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }

    const existingStartup = await Startup.findOne({ where: { userId } });
    if (existingStartup) {
      return errorResponse(res, 'User already has a startup profile', 400);
    }

    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return errorResponse(res, 'User not found', 404);
    }

    const uploadedImages = await uploadFiles(req.files);

    const membersArray = Array.isArray(teamMembers) ? teamMembers : [];
    const formattedTeamMembers = membersArray.map((member, index) => ({
      ...member,
      profile_image: uploadedImages.teamMembersImages?.[index] || null,
    }));

    const newUser = await startupService.createStartup(
      userId,
      { ...basicInfo, startup_logo: uploadedImages.startupLogo?.[0] || null },
      metrics,
      { ...team, founder_image: uploadedImages.founderImage?.[0] || null },
      formattedTeamMembers,
    );

    return successResponse(
      res,
      newUser,
      'Startup profile created successfully',
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      return errorResponse(res, error.errors[0], 400);
    }
    return errorResponse(res, error.message);
  }
};

export const getStartups = async (req, res) => {
  try {
    const { totalStartups, startups } = await startupService.getAllStartup();
    return successResponse(
      res,
      { totalStartups, startups },
      'Startups fetched successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getStartup = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }

    const startup = await startupService.getStartupById(userId);
    if (!startup) {
      return errorResponse(res, 'Startup not found', 404);
    }
    return successResponse(
      res,
      startup,
      'Startup details fetched successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateStartupProfile = async (req, res) => {
  try {
    parseJSONFields(req, ['basicInfo', 'metrics', 'team', 'teamMembers']);

    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 'User ID is required', 400);
    }

    const existingStartup = await startupService.getStartupById(userId);
    if (!existingStartup) {
      return errorResponse(res, 'User not found', 404);
    }

    let uploadedImages = {
      startupLogo: existingStartup.startup.basicInfo?.startup_logo || null,
      founderImage: existingStartup.startup.team?.founder_image || null,
      teamMembersImages: Array.isArray(
        existingStartup.startup?.team?.teamMember,
      )
        ? existingStartup.startup?.team?.teamMember.map((member) => ({
            id: member.id,
            profile_image: member.profile_image,
          }))
        : [],
    };

    if (req.files) {
      // handle startup log file
      if (req.files.startupLogo) {
        if (existingStartup.startup.basicInfo?.startup_logo) {
          await deleteImageFromCloudinary(
            existingStartup.startup.basicInfo.startup_logo,
          );
        }
        uploadedImages.startupLogo = await uploadImageToCloudinary(
          req.files.startupLogo[0].path,
        );
      }

      // handle founder image file
      if (req.files.founderImage) {
        if (existingStartup.startup.team?.founder_image) {
          await deleteImageFromCloudinary(
            existingStartup.startup.team.founder_image,
          );
        }
        uploadedImages.founderImage = await uploadImageToCloudinary(
          req.files.founderImage[0].path,
        );
      }

      // handle team member images file
      if (req.files.teamMembersImages) {
        const teamMembersArray = Array.isArray(req.body.teamMembers)
          ? req.body.teamMembers
          : [];
        const newTeamImages = req.files.teamMembersImages.map(
          (file, index) => ({
            id: teamMembersArray[index]?.id || null,
            profile_image: file.path,
          }),
        );

        uploadedImages.teamMembersImages = await Promise.all(
          newTeamImages.map(async (member) => {
            const teamMembersArray = Array.isArray(
              existingStartup.startup.team.teamMember,
            )
              ? existingStartup.startup.team.teamMember
              : [];

            const existingMember = teamMembersArray.find(
              (tm) => tm.id === member.id,
            );
            if (existingMember?.profile_image) {
              await deleteImageFromCloudinary(existingMember.profile_image);
            }
            return {
              id: member.id,
              profile_image: await uploadImageToCloudinary(
                member.profile_image,
              ),
            };
          }),
        );
      }
    }

    const membersArray = Array.isArray(req.body.teamMembers)
      ? req.body.teamMembers
      : [];

    const formattedTeamMembers = membersArray.map((member) => {
      const uploadedMemberImage = uploadedImages.teamMembersImages.find(
        (img) => img.id === member.id,
      );

      return {
        ...member,
        profile_image: uploadedMemberImage
          ? uploadedMemberImage.profile_image
          : member.profile_image || null,
      };
    });

    const updatedStartup = await startupService.updateStartup(userId, {
      ...req.body,
      basicInfo: {
        ...req.body.basicInfo,
        startup_logo: uploadedImages.startupLogo,
      },
      metrics: { ...req.body.metrics },
      team: {
        ...req.body.team,
        founder_image: uploadedImages.founderImage,
      },
      teamMembers: formattedTeamMembers,
    });

    return successResponse(res, updatedStartup, 'Startup updated successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteStartup = async (req, res) => {
  try {
    const { startupId } = req.params;
    if (!startupId) {
      return errorResponse(res, 'Startup ID is required', 400);
    }

    const startupData = await Startup.findOne({ where: { id: startupId } });
    if (!startupData) {
      return errorResponse(res, 'Startup not found', 404);
    }
    const userId = startupData.userId;

    const existingStartup = await startupService.getStartupById(userId);
    if (!existingStartup) {
      return errorResponse(res, 'Startup not found', 404);
    }

    if (existingStartup.basicInfo?.startup_logo) {
      await deleteImageFromCloudinary(existingStartup.basicInfo.startup_logo);
    }

    if (existingStartup.team?.founder_image) {
      await deleteImageFromCloudinary(existingStartup.team.founder_image);
    }

    if (Array.isArray(existingStartup.team?.teamMember)) {
      await Promise.all(
        existingStartup.team.teamMember
          .filter((member) => member.profile_image)
          .map((member) => deleteImageFromCloudinary(member.profile_image)),
      );
    }

    await startupService.deleteStartup(startupId);

    return successResponse(res, {}, 'Startup deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

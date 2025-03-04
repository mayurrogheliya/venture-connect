import { uploadImageToCloudinary } from './cloudinary.service.js';

export const uploadFiles = async (files) => {
  const uploadedImages = {};

  if (files) {
    for (const field in files) {
      if (files[field].length > 0) {
        const uploadUrls = await Promise.all(
          files[field].map((file) => uploadImageToCloudinary(file.path)),
        );
        uploadedImages[field] = uploadUrls;
      }
    }
  }

  return uploadedImages;
};

export const uploadEventFile = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  const uploadUrl = await uploadImageToCloudinary(file.path);
  return { url: uploadUrl };
};

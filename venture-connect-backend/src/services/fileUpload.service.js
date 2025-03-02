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

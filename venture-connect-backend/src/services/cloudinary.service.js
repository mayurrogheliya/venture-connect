import fs from 'fs-extra';
import cloudinary from '../config/cloudinary.js';

export const uploadImageToCloudinary = async (
  filePath,
  folder = 'venture-connect',
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    await fs.remove(filePath);
    return result.secure_url;
  } catch (error) {
    await fs.remove(filePath);
    throw new Error('Error uploading image to Cloudinary');
  }
};

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const parts = imageUrl.split('/');
    const publicId = parts.slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary');
  }
};

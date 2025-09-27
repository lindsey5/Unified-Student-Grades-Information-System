import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Image } from '../types/types';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 300000, // 5 minutes (default is 60 seconds)
});

export const uploadImage = async (image: string): Promise<Image | null> => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'usgis',
    });

    return {
      imagePublicId: result.public_id,
      imageUrl: result.secure_url,
    };

  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};
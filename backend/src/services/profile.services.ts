import { User } from '../../generated/prisma';
import { uploadImage } from '../utils/config/cloudinary';
import prisma from '../utils/prismaClient';

const profileService = {
  getProfile: async (id: number) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        description: true,
      },
    });
  },
  updateProfile: async (
    id: number,
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'>,
  ) => {
    return await prisma.user.update({
      where: {
        id,
      },

      data,
    });
  },
  uploadAvatar: async (id: number, file: Express.Multer.File) => {
    const uploadResult = await uploadImage(file.path);

    if (!uploadResult || !uploadResult.public_id || !uploadResult.secure_url) {
      throw new Error('Не вдалося завантажити зображення на Cloudinary або отримати дійсний URL.');
    }

    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: uploadResult.secure_url,
      },
    });
  },
  deleteAvatar: async (id: number) => {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: null,
      },
    });
  },
};

export default profileService;

import { User } from '../../generated/prisma';
import { uploadImage } from '../utils/config/cloudinary';
import prisma from '../utils/prismaClient';
import { getRedisValue, setRedisValue } from '../utils/redisClient';

const profileService = {
  getProfile: async (id: number) => {
    const userCacheKey = `user:${id}`;
    const cachedUser = await getRedisValue(userCacheKey);
    if (cachedUser) {
      return cachedUser;
    }
    const user = await prisma.user.findUnique({
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
    await setRedisValue(userCacheKey, user, 3600 * 24);
    return user;
  },
  updateProfile: async (
    id: number,
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'>,
  ) => {
    const userCacheKey = `user:${id}`;
    const user = await prisma.user.update({
      where: {
        id,
      },

      data,
    });
    await setRedisValue(userCacheKey, user, 3600 * 24);
    return user;
  },
  uploadAvatar: async (id: number, file: Express.Multer.File) => {
    const userCacheKey = `user:${id}`;
    const uploadResult = await uploadImage(file.path);

    if (!uploadResult || !uploadResult.public_id || !uploadResult.secure_url) {
      throw new Error('Не вдалося завантажити зображення на Cloudinary або отримати дійсний URL.');
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: uploadResult.secure_url,
      },
    });
    await setRedisValue(userCacheKey, user, 3600 * 24);
    return user;
  },
  deleteAvatar: async (id: number) => {
    const userCacheKey = `user:${id}`;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: null,
      },
    });
    await setRedisValue(userCacheKey, user, 3600 * 24);
    return user;
  },
};

export default profileService;

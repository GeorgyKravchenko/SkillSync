import { PrismaClient, User } from '../../generated/prisma';

const prisma = new PrismaClient();
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
};

export default profileService;

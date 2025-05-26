import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();
const profileService = {
  getProfile: async (id: number) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  updateProfile: async (id: number, data: { name?: string; email?: string }) => {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },
};

export default profileService;

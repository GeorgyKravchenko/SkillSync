import { PrismaClient } from '../../generated/prisma';
import { hash, verify } from 'argon2';
import { generateToken } from '../utils/generateToken';

const prisma = new PrismaClient();
const authService = {
  authenticate: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password or email');
    } else {
      const token = generateToken(user.id);
      return { user, token };
    }
  },
  register: async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    const token = generateToken(newUser.id);

    return { user: newUser, token };
  },
};
export default authService;

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../generated/prisma';
import cookieParser from 'cookie-parser'; // Не забудьте подключить
import { generateToken } from '../utils/generateToken';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!token && !refreshToken) {
      res.status(401).json({ message: 'Требуется аутентификация' });
      return;
    }
    if (!token && refreshToken) {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      ) as JwtPayload;
      token = generateToken(decodedRefresh.userId);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      res.status(401).json({ message: 'Пользователь не найден' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Токен истек' });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Неверный токен' });
      return;
    }

    console.error('Ошибка аутентификации:', error);
    res.status(500).json({ message: 'Ошибка сервера при аутентификации' });
    return;
  }
};

export default authMiddleware;

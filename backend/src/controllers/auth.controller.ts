import { Request, Response } from 'express';
import authService from '../services/auth.services';
import { generateToken } from '../utils/generateToken';

const authController = {
  userAuthenticate: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.authenticate(email, password);
      res.status(200).json({
        message: 'Authentication successful',
        user,
        token,
      });
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({
        message: 'Authentication failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
  userRegister: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const { user, token } = await authService.register(name, email, password);
      res.status(200).json({
        message: 'Authentication successful',
        user,
        token: generateToken(user.id),
      });
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({
        message: 'Authentication failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
};
export default authController;

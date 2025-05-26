import { Request, Response } from 'express';
import profileService from '../services/profile.services';

const profileController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
      const user = await profileService.getProfile(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error getting profile' });
    }
  },
  updateProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      const { name, email } = req.body;
      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
      const user = await profileService.updateProfile(id, { name, email });
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
    }
  },
};
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

export default profileController;

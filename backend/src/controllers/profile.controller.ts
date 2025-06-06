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
      const { name, email, description, avatar } = req.body;
      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
      const user = await profileService.updateProfile(id, { name, email, description, avatar });
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
    }
  },
  uploadAvatar: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      console.log('Backend: req.file:', req.file); // Це найважливіше!
      console.log('Backend: req.body:', req.body);
      if (!id || !req.file) {
        res.status(400).json({ message: 'User ID and file are required' });
        return;
      }
      const user = await profileService.uploadAvatar(id, req.file);
      res.status(200).json({ message: 'Avatar uploaded successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading avatar' });
    }
  },
  deleteAvatar: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }
      const user = await profileService.deleteAvatar(id);
      res.status(200).json({ message: 'Avatar deleted successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting avatar' });
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

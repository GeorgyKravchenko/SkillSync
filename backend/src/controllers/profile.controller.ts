import { Request, Response } from 'express';
import profileService from '../services/profile.services';

const profileController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;

      if (!id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const user = await profileService.getProfile(id);

      if (!user) {
        res.status(404).json({ message: 'User profile not found' });
        return;
      }
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error getting profile:', error.message);
        res.status(500).json({ message: `Error getting profile: ${error.message}` });
        return;
      }
      console.error('Unknown error getting profile:', error);
      res.status(500).json({ message: 'Error getting profile' });
      return;
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      const { name, email, description, avatar } = req.body;

      if (!id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      if (!name && !email && !description && !avatar) {
        res
          .status(400)
          .json({
            message:
              'At least one field (name, email, description, or avatar) must be provided for update',
          });
        return;
      }

      if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
        res.status(400).json({ message: 'Name must be a non-empty string' });
        return;
      }
      if (
        email !== undefined &&
        (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      ) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
      }
      if (description !== undefined && typeof description !== 'string') {
        res.status(400).json({ message: 'Description must be a string' });
        return;
      }
      if (avatar !== undefined && typeof avatar !== 'string') {
        res.status(400).json({ message: 'Avatar must be a string (URL or path)' });
        return;
      }

      const user = await profileService.updateProfile(id, { name, email, description, avatar });

      if (!user) {
        res.status(404).json({ message: 'User not found or update failed' });
        return;
      }
      res.status(200).json({ message: 'Profile updated successfully', user });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: `Error updating profile: ${error.message}` });
        return;
      }
      console.error('Unknown error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
      return;
    }
  },

  uploadAvatar: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;

      if (!id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      const user = await profileService.uploadAvatar(id, req.file);

      if (!user) {
        res.status(404).json({ message: 'User not found or avatar upload failed' });
        return;
      }
      res.status(200).json({ message: 'Avatar uploaded successfully', user });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error uploading avatar:', error.message);
        res.status(500).json({ message: `Error uploading avatar: ${error.message}` });
        return;
      }
      console.error('Unknown error uploading avatar:', error);
      res.status(500).json({ message: 'Error uploading avatar' });
      return;
    }
  },

  deleteAvatar: async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;

      if (!id) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const user = await profileService.deleteAvatar(id);

      if (!user) {
        res
          .status(404)
          .json({
            message: 'User not found or avatar could not be deleted (possibly already null)',
          });
        return;
      }
      res.status(200).json({ message: 'Avatar deleted successfully', user });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting avatar:', error.message);
        res.status(500).json({ message: `Error deleting avatar: ${error.message}` });
        return;
      }
      console.error('Unknown error deleting avatar:', error);
      res.status(500).json({ message: 'Error deleting avatar' });
      return;
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
      file?: any;
    }
  }
}

export default profileController;

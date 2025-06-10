import { Request, Response } from 'express';
import authService from '../services/auth.services';
import { generateToken } from '../utils/generateToken';

const authController = {
  userAuthenticate: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(400).json({ message: 'Email is required and cannot be empty' });
        return;
      }
      if (!password || typeof password !== 'string' || password.trim().length === 0) {
        res.status(400).json({ message: 'Password is required and cannot be empty' });
        return;
      }

      const { user, token } = await authService.authenticate(email, password);

      if (!user || !token) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 3600000,
        })
        .status(200)
        .json({
          message: 'Authentication successful',
          user,
          token,
        });
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid credentials') {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }
        console.error('Authentication error:', error.message);
        res.status(500).json({ message: `Authentication failed: ${error.message}` });
        return;
      }
      console.error('Unknown authentication error:', error);
      res.status(500).json({ message: 'Authentication failed: Unknown error' });
      return;
    }
  },

  userRegister: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({ message: 'Name is required and cannot be empty' });
        return;
      }
      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(400).json({ message: 'Email is required and cannot be empty' });
        return;
      }
      if (!password || typeof password !== 'string' || password.trim().length === 0) {
        res.status(400).json({ message: 'Password is required and cannot be empty' });
        return;
      }
      if (password.length < 6) {
        res.status(400).json({ message: 'Password must be at least 6 characters long' });
        return;
      }

      const { user, token } = await authService.register(name, email, password);

      if (!user || !token) {
        res
          .status(409)
          .json({ message: 'User registration failed, possibly email already exists' });
        return;
      }

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 3600000,
        })
        .status(201)
        .json({
          message: 'Registration successful',
          user,
          token: generateToken(user.id),
        });
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes('duplicate key value') ||
          error.message.includes('email already exists')
        ) {
          res.status(409).json({ message: 'Registration failed: Email already registered' });
          return;
        }
        console.error('Registration error:', error.message);
        res.status(500).json({ message: `Registration failed: ${error.message}` });
        return;
      }
      console.error('Unknown registration error:', error);
      res.status(500).json({ message: 'Registration failed: Unknown error' });
      return;
    }
  },
};

export default authController;

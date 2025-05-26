import { Router } from 'express';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', authController.userRegister);
authRouter.post('/login', authController.userAuthenticate);
export default authRouter;

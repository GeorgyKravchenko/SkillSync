import { Router } from 'express';
import profileController from '../controllers/profile.controller';

const profileRouter = Router();

profileRouter.get('/', profileController.getProfile);
profileRouter.post('/', profileController.updateProfile);
export default profileRouter;

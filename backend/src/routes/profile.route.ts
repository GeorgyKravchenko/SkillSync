import { Router } from 'express';
import profileController from '../controllers/profile.controller';
import upload from '../utils/config/multer';

const profileRouter = Router();

profileRouter.get('/', profileController.getProfile);
profileRouter.post('/', profileController.updateProfile);
profileRouter.post('/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
profileRouter.delete('/delete-avatar', profileController.deleteAvatar);
export default profileRouter;

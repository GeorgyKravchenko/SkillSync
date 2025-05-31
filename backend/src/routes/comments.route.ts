import { Router } from 'express';
import commentController from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.post('/', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

export default commentRouter;

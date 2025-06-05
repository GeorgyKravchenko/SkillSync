import { Router } from 'express';
import commentController from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.post('/', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);
commentRouter.post('/:id/like', commentController.addLikeForComment);
commentRouter.post('/:id/dislike', commentController.addDislikeForComment);

export default commentRouter;

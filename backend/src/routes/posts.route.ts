import { Router } from 'express';
import postsController from '../controllers/posts.controller';

const postsRouter = Router();
postsRouter.get('/', postsController.getPosts);
postsRouter.get('/topic/:topicId', postsController.getPostsByTopic);
postsRouter.get('/:id', postsController.getPostById);
postsRouter.post('/', postsController.createPost);
postsRouter.put('/:id', postsController.updatePost);
postsRouter.delete('/:id', postsController.deletePost);
export default postsRouter;

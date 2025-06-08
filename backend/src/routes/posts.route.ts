import { Router } from 'express';
import postsController from '../controllers/posts.controller';

const postsRouter = Router();
postsRouter.get('/', postsController.getPosts);
postsRouter.get('/topic/:topicId', postsController.getPostsByTopic);
postsRouter.get('/:id', postsController.getPostById);
postsRouter.post('/', postsController.createPost);
postsRouter.put('/:id', postsController.updatePost);
postsRouter.delete('/:id', postsController.deletePost);
postsRouter.post('/:id/like', postsController.addLikeForPost);
postsRouter.post('/:id/dislike', postsController.addDislikeForPost);
postsRouter.post('/search', postsController.searchPosts);
export default postsRouter;

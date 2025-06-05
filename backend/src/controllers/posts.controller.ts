import { Request, Response } from 'express';
import postsService from '../services/posts.service';

const postsController = {
  getPostsByTopic: async (req: Request, res: Response) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;

      const posts = await postsService.getPostsByTopic(topicId, skip, limit);
      if (!posts || posts.length === 0) {
        res.status(404).json({ message: 'Посты по данной теме не найдены' });
        return;
      }
      res.status(200).json(posts);
    } catch (error) {
      console.error('Ошибка при получении постов по теме:', error);
      res.status(500).json({ message: 'Ошибка сервера при получении постов по теме' });
    }
  },

  getPosts: async (req: Request, res: Response) => {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await postsService.getPosts(skip, limit);
      if (!posts || posts.length === 0) {
        res.status(404).json({ message: 'Посты не найдены' });
        return;
      }
      res.status(200).json(posts);
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
      res.status(500).json({ message: 'Ошибка сервера при получении постов' });
    }
  },
  getPostById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Неверный ID поста' });
        return;
      }
      const post = await postsService.getPostById(id);
      if (!post) {
        res.status(404).json({ message: 'Пост не найден' });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Ошибка при получении поста:', error);
      res.status(500).json({ message: 'Ошибка сервера при получении поста' });
    }
  },
  createPost: async (req: Request, res: Response) => {
    try {
      const { title, content, topicId } = req.body;
      const authorId = req.user?.id;
      if (!authorId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const newPost = await postsService.createPost({
        title,
        content,
        topicId: parseInt(topicId),
        authorId,
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
      res.status(500).json({ message: 'Ошибка сервера при создании поста' });
    }
  },
  updatePost: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Неверный ID поста' });
        return;
      }
      const { title, content } = req.body;
      const updatedPost = await postsService.updatePost(id, { title, content });
      if (!updatedPost) {
        res.status(404).json({ message: 'Пост не найден' });
        return;
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error);
      res.status(500).json({ message: 'Ошибка сервера при обновлении поста' });
    }
  },
  deletePost: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Неверный ID поста' });
        return;
      }
      const deletedPost = await postsService.deletePost(id);
      if (!deletedPost) {
        res.status(404).json({ message: 'Пост не найден' });
        return;
      }
      res.status(200).json({ message: 'Пост успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      res.status(500).json({ message: 'Ошибка сервера при удалении поста' });
    }
  },
  addLikeForPost: async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user?.id;
      if (isNaN(postId)) {
        res.status(400).json({ message: 'Неверный ID поста' });
        return;
      }
      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const updatedPost = await postsService.addLikeForPost(postId, userId);
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Ошибка при добавлении лайка к посту:', error);
      res.status(500).json({ message: 'Ошибка сервера при добавлении лайка к посту' });
    }
  },
  addDislikeForPost: async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user?.id;
      if (isNaN(postId)) {
        res.status(400).json({ message: 'Неверный ID поста' });
        return;
      }
      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const updatedPost = await postsService.addDisLikeForPost(postId, userId);
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Ошибка при добавлении дизлайка к посту:', error);
      res.status(500).json({ message: 'Ошибка сервера при добавлении дизлайка к посту' });
    }
  },
};
export default postsController;

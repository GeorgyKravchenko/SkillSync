import { Request, Response } from 'express';
import commentService from '../services/comment.service';

const commentController = {
  createComment: async (req: Request, res: Response) => {
    try {
      const { content, postId } = req.body;
      const authorId = req.user?.id;
      if (isNaN(postId)) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }
      if (!authorId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const comment = await commentService.createComment(content, authorId, postId);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment' });
    }
  },
  updateComment: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }
      const { content } = req.body;
      const comment = await commentService.updateComment(content, id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating comment' });
    }
  },
  deleteComment: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }
      const comment = await commentService.deleteComment(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment' });
    }
  },
  addLikeForComment: async (req: Request, res: Response) => {
    try {
      const commentId = parseInt(req.params.id);
      const userId = req.user?.id;
      if (isNaN(commentId)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }
      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const updatedComment = await commentService.addLikeForComment(commentId, userId);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: 'Error liking comment' });
    }
  },
  addDislikeForComment: async (req: Request, res: Response) => {
    try {
      const commentId = parseInt(req.params.id);
      const userId = req.user?.id;
      if (isNaN(commentId)) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }
      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }
      const updatedComment = await commentService.addDisLikeForComment(commentId, userId);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: 'Error disliking comment' });
    }
  },
};
export default commentController;

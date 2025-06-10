import { Request, Response } from 'express';
import commentService from '../services/comment.service';

const commentController = {
  createComment: async (req: Request, res: Response) => {
    try {
      const { content, postId, parentId } = req.body;
      const authorId = req.user?.id;

      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res
          .status(400)
          .json({ message: 'Comment content is required and must be a non-empty string' });
        return;
      }

      if (isNaN(postId) || postId <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      if (parentId !== undefined && (isNaN(parentId) || parentId <= 0)) {
        res.status(400).json({ message: 'Invalid parent comment ID' });
        return;
      }

      if (!authorId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }

      const comment = await commentService.createComment(content, authorId, postId, parentId);
      if (!comment) {
        res.status(404).json({
          message: 'Failed to create comment, possibly due to invalid post or parent comment ID',
        });
        return;
      }
      res.status(201).json(comment);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating comment:', error.message);
        res.status(500).json({ message: `Error creating comment: ${error.message}` });
        return;
      }
      console.error('Unknown error creating comment:', error);
      res.status(500).json({ message: 'Error creating comment' });
      return;
    }
  },

  updateComment: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { content } = req.body;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }

      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res
          .status(400)
          .json({ message: 'Comment content is required and must be a non-empty string' });
        return;
      }

      const comment = await commentService.updateComment(content, id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found or unauthorized to update' });
        return;
      }
      res.status(200).json(comment);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating comment:', error.message);
        res.status(500).json({ message: `Error updating comment: ${error.message}` });
        return;
      }
      console.error('Unknown error updating comment:', error);
      res.status(500).json({ message: 'Error updating comment' });
      return;
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }

      const comment = await commentService.deleteComment(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found or unauthorized to delete' });
        return;
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting comment:', error.message);
        res.status(500).json({ message: `Error deleting comment: ${error.message}` });
        return;
      }
      console.error('Unknown error deleting comment:', error);
      res.status(500).json({ message: 'Error deleting comment' });
      return;
    }
  },

  addLikeForComment: async (req: Request, res: Response) => {
    try {
      const commentId = parseInt(req.params.id);
      const userId = req.user?.id;

      if (isNaN(commentId) || commentId <= 0) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }

      const updatedComment = await commentService.addLikeForComment(commentId, userId);
      if (!updatedComment) {
        res
          .status(409)
          .json({ message: 'Failed to like comment, possibly already liked or comment not found' });
        return;
      }
      res.status(200).json(updatedComment);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error liking comment:', error.message);
        res.status(500).json({ message: `Error liking comment: ${error.message}` });
        return;
      }
      console.error('Unknown error liking comment:', error);
      res.status(500).json({ message: 'Error liking comment' });
      return;
    }
  },

  addDislikeForComment: async (req: Request, res: Response) => {
    try {
      const commentId = parseInt(req.params.id);
      const userId = req.user?.id;

      if (isNaN(commentId) || commentId <= 0) {
        res.status(400).json({ message: 'Invalid comment ID' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Требуется аутентификация' });
        return;
      }

      const updatedComment = await commentService.addDisLikeForComment(commentId, userId);
      if (!updatedComment) {
        res.status(409).json({
          message: 'Failed to dislike comment, possibly already disliked or comment not found',
        });
        return;
      }
      res.status(200).json(updatedComment);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error disliking comment:', error.message);
        res.status(500).json({ message: `Error disliking comment: ${error.message}` });
        return;
      }
      console.error('Unknown error disliking comment:', error);
      res.status(500).json({ message: 'Error disliking comment' });
      return;
    }
  },
};

export default commentController;

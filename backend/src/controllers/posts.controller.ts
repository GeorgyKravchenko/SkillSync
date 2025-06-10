import { Request, Response } from 'express';
import postsService from '../services/posts.service';

const postsController = {
  getPostsByTopic: async (req: Request, res: Response) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;

      if (isNaN(topicId) || topicId <= 0) {
        res.status(400).json({ message: 'Invalid topic ID' });
        return;
      }

      if (skip < 0 || limit <= 0) {
        res.status(400).json({ message: 'Invalid pagination parameters (skip or limit)' });
        return;
      }

      const posts = await postsService.getPostsByTopic(topicId, skip, limit);

      if (!posts || posts.length === 0) {
        res.status(404).json({ message: 'No posts found for this topic' });
        return;
      }
      res.status(200).json(posts);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching posts by topic:', error.message);
        res.status(500).json({ message: `Server error fetching posts by topic: ${error.message}` });
        return;
      }
      console.error('Unknown error fetching posts by topic:', error);
      res.status(500).json({ message: 'Server error fetching posts by topic' });
      return;
    }
  },

  getPosts: async (req: Request, res: Response) => {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;

      if (skip < 0 || limit <= 0) {
        res.status(400).json({ message: 'Invalid pagination parameters (skip or limit)' });
        return;
      }

      const posts = await postsService.getPosts(skip, limit);

      if (!posts || posts.length === 0) {
        res.status(404).json({ message: 'No posts found' });
        return;
      }
      res.status(200).json(posts);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: `Server error fetching posts: ${error.message}` });
        return;
      }
      console.error('Unknown error fetching posts:', error);
      res.status(500).json({ message: 'Server error fetching posts' });
      return;
    }
  },

  getPostById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      const post = await postsService.getPostById(id);

      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      res.status(200).json(post);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ message: `Server error fetching post: ${error.message}` });
        return;
      }
      console.error('Unknown error fetching post:', error);
      res.status(500).json({ message: 'Server error fetching post' });
      return;
    }
  },

  createPost: async (req: Request, res: Response) => {
    try {
      const { title, content, topicId } = req.body;
      const authorId = req.user?.id;

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ message: 'Post title is required and cannot be empty' });
        return;
      }
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res.status(400).json({ message: 'Post content is required and cannot be empty' });
        return;
      }
      if (isNaN(parseInt(topicId)) || parseInt(topicId) <= 0) {
        res.status(400).json({ message: 'Invalid topic ID' });
        return;
      }

      if (!authorId) {
        res.status(401).json({ message: 'Authentication required to create a post' });
        return;
      }

      const newPost = await postsService.createPost({
        title,
        content,
        topicId: parseInt(topicId),
        authorId,
      });

      if (!newPost) {
        res
          .status(400)
          .json({ message: 'Failed to create post, possibly due to a non-existent topic' });
        return;
      }

      res.status(201).json(newPost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: `Server error creating post: ${error.message}` });
        return;
      }
      console.error('Unknown error creating post:', error);
      res.status(500).json({ message: 'Server error creating post' });
      return;
    }
  },

  updatePost: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;
      const userId = req.user?.id;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      if (!title && !content) {
        res
          .status(400)
          .json({ message: 'Either title or content must be provided to update the post' });
        return;
      }
      if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
        res.status(400).json({ message: 'Post title cannot be empty' });
        return;
      }
      if (content !== undefined && (typeof content !== 'string' || content.trim().length === 0)) {
        res.status(400).json({ message: 'Post content cannot be empty' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Authentication required to update a post' });
        return;
      }

      const updatedPost = await postsService.updatePost(id, { title, content });

      if (!updatedPost) {
        const existingPost = await postsService.getPostById(id);
        if (!existingPost) {
          res.status(404).json({ message: 'Post not found' });
          return;
        } else {
          res.status(403).json({ message: 'You do not have permission to modify this post' });
          return;
        }
      }
      res.status(200).json(updatedPost);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ message: `Server error updating post: ${error.message}` });
        return;
      }
      console.error('Unknown error updating post:', error);
      res.status(500).json({ message: 'Server error updating post' });
      return;
    }
  },

  deletePost: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user?.id;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Authentication required to delete a post' });
        return;
      }

      const deletedPost = await postsService.deletePost(id);

      if (!deletedPost) {
        const existingPost = await postsService.getPostById(id);
        if (!existingPost) {
          res.status(404).json({ message: 'Post not found' });
          return;
        } else {
          res.status(403).json({ message: 'You do not have permission to delete this post' });
          return;
        }
      }
      res.status(200).json({ message: 'Post successfully deleted' });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: `Server error deleting post: ${error.message}` });
        return;
      }
      console.error('Unknown error deleting post:', error);
      res.status(500).json({ message: 'Server error deleting post' });
      return;
    }
  },

  addLikeForPost: async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user?.id;

      if (isNaN(postId) || postId <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Authentication required to like a post' });
        return;
      }

      // If postsService.addLikeForPost returns void, it will complete successfully without throwing an error
      // if the operation was successful. Specific errors like 'Post not found' or 'Already liked'
      // should be thrown by the service and caught here.
      await postsService.addLikeForPost(postId, userId);

      res.status(200).json({ message: 'Post liked successfully' });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding like to post:', error.message);
        // Assuming the service throws specific error messages for these cases
        if (error.message === 'Post not found') {
          res.status(404).json({ message: 'Post not found' });
          return;
        }
        if (error.message === 'You have already liked this post') {
          res.status(409).json({ message: 'You have already liked this post' });
          return;
        }
        res.status(500).json({ message: `Server error adding like to post: ${error.message}` });
        return;
      }
      console.error('Unknown error adding like to post:', error);
      res.status(500).json({ message: 'Server error adding like to post' });
      return;
    }
  },

  addDislikeForPost: async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user?.id;

      if (isNaN(postId) || postId <= 0) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
      }

      if (!userId) {
        res.status(401).json({ message: 'Authentication required to dislike a post' });
        return;
      }

      // If postsService.addDisLikeForPost returns void, it will complete successfully without throwing an error
      // if the operation was successful. Specific errors like 'Post not found' or 'Already disliked'
      // should be thrown by the service and caught here.
      await postsService.addDisLikeForPost(postId, userId);

      res.status(200).json({ message: 'Post disliked successfully' });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding dislike to post:', error.message);
        // Assuming the service throws specific error messages for these cases
        if (error.message === 'Post not found') {
          res.status(404).json({ message: 'Post not found' });
          return;
        }
        if (error.message === 'You have already disliked this post') {
          res.status(409).json({ message: 'You have already disliked this post' });
          return;
        }
        res.status(500).json({ message: `Server error adding dislike to post: ${error.message}` });
        return;
      }
      console.error('Unknown error adding dislike to post:', error);
      res.status(500).json({ message: 'Server error adding dislike to post' });
      return;
    }
  },

  searchPosts: async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!query || typeof query !== 'string' || query.trim().length < 2) {
        res.status(400).json({
          message: 'Search parameter (q) is required and must contain at least 2 characters',
        });
        return;
      }

      if (skip < 0 || limit <= 0) {
        res.status(400).json({ message: 'Invalid pagination parameters (skip or limit)' });
        return;
      }

      const posts = await postsService.searchPosts(query, skip, limit);

      if (!posts || posts.length === 0) {
        res.status(404).json({ message: 'No posts found for your query' });
        return;
      }

      res.status(200).json(posts);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error searching posts:', error.message);
        res.status(500).json({ message: `Server error searching posts: ${error.message}` });
        return;
      }
      console.error('Unknown error searching posts:', error);
      res.status(500).json({ message: 'Server error searching posts' });
      return;
    }
  },
};

export default postsController;

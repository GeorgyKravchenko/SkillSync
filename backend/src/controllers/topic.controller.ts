import { Request, Response } from 'express';
import topicService from '../services/topic.service';

const topicController = {
  getTopics: async (req: Request, res: Response) => {
    try {
      const topics = await topicService.getTopics();
      res.status(200).json(topics);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error getting topics:', error.message);
        res.status(500).json({ message: `Error getting topics: ${error.message}` });
        return;
      }
      console.error('Unknown error getting topics:', error);
      res.status(500).json({ message: 'Error getting topics' });
      return;
    }
  },

  createTopic: async (req: Request, res: Response) => {
    try {
      const { title, slug } = req.body;

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ message: 'Topic title is required and cannot be empty' });
        return;
      }
      if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
        res.status(400).json({ message: 'Topic slug is required and cannot be empty' });
        return;
      }

      const topic = await topicService.createTopic({ title, slug });

      if (!topic) {
        res
          .status(409)
          .json({ message: 'Topic with this slug already exists or could not be created' });
        return;
      }
      res.status(201).json(topic);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating topic:', error.message);
        res.status(500).json({ message: `Error creating topic: ${error.message}` });
        return;
      }
      console.error('Unknown error creating topic:', error);
      res.status(500).json({ message: 'Error creating topic' });
      return;
    }
  },

  deleteTopic: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid topic ID' });
        return;
      }

      const topic = await topicService.deleteTopic(id);

      if (!topic) {
        res.status(404).json({ message: 'Topic not found' });
        return;
      }
      res.status(200).json({ message: 'Topic deleted successfully' });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting topic:', error.message);
        res.status(500).json({ message: `Error deleting topic: ${error.message}` });
        return;
      }
      console.error('Unknown error deleting topic:', error);
      res.status(500).json({ message: 'Error deleting topic' });
      return;
    }
  },
};

export default topicController;

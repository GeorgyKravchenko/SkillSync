import { Request, Response } from 'express';
import topicService from '../services/topic.service';

const topicController = {
  getTopics: async (req: Request, res: Response) => {
    try {
      const topics = await topicService.getTopics();
      res.status(200).json(topics);
    } catch (error) {
      res.status(500).json({ message: 'Error getting topics' });
    }
  },
  createTopic: async (req: Request, res: Response) => {
    try {
      const { title, slug } = req.body;
      const topic = await topicService.createTopic({ title, slug });
      res.status(201).json(topic);
    } catch (error) {
      res.status(500).json({ message: 'Error creating topic' });
    }
  },
  deleteTopic: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid topic ID' });
        return;
      }
      const topic = await topicService.deleteTopic(id);
      if (!topic) {
        res.status(404).json({ message: 'Topic not found' });
        return;
      }
      res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting topic' });
    }
  },
};
export default topicController;

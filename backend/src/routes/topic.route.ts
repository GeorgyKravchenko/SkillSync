import { Router } from 'express';
import topicController from '../controllers/topic.controller';

const topicRouter = Router();
topicRouter.get('/', topicController.getTopics);
topicRouter.get('/:id', topicController.getTopicById);
topicRouter.post('/', topicController.createTopic);
topicRouter.delete('/:id', topicController.deleteTopic);
export default topicRouter;

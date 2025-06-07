import prisma from '../utils/prismaClient';
import { getRedisValue, setRedisValue } from '../utils/redisClient';
const cacheKey = 'topics';

const topicService = {
  getTopics: async () => {
    const cachedTopics = await getRedisValue(cacheKey);
    if (cachedTopics) {
      return cachedTopics;
    }
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
    await setRedisValue(cacheKey, topics);
    return topics;
  },
  createTopic: async (data: { title: string; slug: string }) => {
    const topic = await prisma.topic.create({ data });
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
    await setRedisValue(cacheKey, topics);
    return topic;
  },
  deleteTopic: async (id: number) => {
    const topic = await prisma.topic.delete({ where: { id } });
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
    await setRedisValue(cacheKey, topics);
    return topic;
  },
};
export default topicService;

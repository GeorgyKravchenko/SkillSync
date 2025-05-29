import prisma from '../utils/prismaClient';

const topicService = {
  getTopics: async () => {
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
    return topics;
  },
  createTopic: async (data: { title: string; slug: string }) => {
    const topic = await prisma.topic.create({ data });
    return topic;
  },
  getTopicById: async (id: number) => {
    const topic = await prisma.topic.findUnique({ where: { id } });
    return topic;
  },
  deleteTopic: async (id: number) => {
    const topic = await prisma.topic.delete({ where: { id } });
    return topic;
  },
};
export default topicService;

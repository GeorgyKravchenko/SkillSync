import prisma from '../utils/prismaClient';

const postsService = {
  async getPosts(skip: number = 0, limit: number = 10) {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: limit,
      skip,
    });
  },
  async getPostsByTopic(topicId: number, skip: number = 0, limit: number = 10) {
    return await prisma.post.findMany({
      where: { topicId },
      take: limit,
      skip,
    });
  },
  async getPostById(id: number) {
    return await prisma.post.findUnique({
      where: { id },
    });
  },
  async createPost(data: { title: string; content: string; topicId: number; authorId: number }) {
    return await prisma.post.create({ data });
  },
  async updatePost(id: number, data: { title?: string; content?: string }) {
    return await prisma.post.update({ where: { id }, data });
  },
  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  },
};
export default postsService;

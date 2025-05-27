import prisma from '../utils/prismaClient';

const postsService = {
  async getPosts(skip: number = 0, limit: number = 10) {
    return await prisma.post.findMany({
      take: limit,
      skip,
    });
  },
  async getPostById(id: number) {
    return await prisma.post.findUnique({
      where: { id },
    });
  },
  async createPost(data: { title: string; content: string; authorId: number }) {
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

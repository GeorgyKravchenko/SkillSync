import prisma from '../utils/prismaClient';

const commentService = {
  async createComment(content: string, authorId: number, postId: number) {
    const comments = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });
    return comments;
  },
  async updateComment(content: string, id: number) {
    const comments = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });
    return comments;
  },
  async deleteComment(id: number) {
    const comments = await prisma.comment.delete({
      where: { id },
    });
    return comments;
  },
};

export default commentService;

import { Reaction } from '../../generated/prisma';
import prisma from '../utils/prismaClient';

const postsService = {
  async getPosts(skip: number = 0, limit: number = 10) {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        dislikesCount: true,
        likesCount: true,
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
      select: {
        id: true,
        title: true,
        content: true,
        dislikesCount: true,
        likesCount: true,
        PostReactions: {
          select: {
            authorId: true,
            reaction: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            dislikesCount: true,
            likesCount: true,
            CommentReactions: {
              select: {
                authorId: true,
                reaction: true,
              },
            },
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
  async addLikeForPost(postId: number, userId: number) {
    const existing = await prisma.postReaction.findUnique({
      where: {
        postId_authorId: {
          postId,
          authorId: userId,
        },
      },
    });

    if (existing?.reaction === Reaction.LIKE) {
      await prisma.postReaction.delete({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      });

      await prisma.post.update({
        where: { id: postId },
        data: {
          likesCount: { decrement: 1 },
        },
      });
    } else {
      if (existing?.reaction === Reaction.DISLIKE) {
        await prisma.post.update({
          where: { id: postId },
          data: {
            dislikesCount: { decrement: 1 },
            likesCount: { increment: 1 },
          },
        });

        await prisma.postReaction.update({
          where: {
            postId_authorId: {
              postId,
              authorId: userId,
            },
          },
          data: {
            reaction: Reaction.LIKE,
          },
        });
      } else {
        await prisma.postReaction.create({
          data: {
            postId,
            authorId: userId,
            reaction: Reaction.LIKE,
          },
        });

        await prisma.post.update({
          where: { id: postId },
          data: {
            likesCount: { increment: 1 },
          },
        });
      }
    }
  },
  async addDisLikeForPost(postId: number, userId: number) {
    const existing = await prisma.postReaction.findUnique({
      where: {
        postId_authorId: {
          postId,
          authorId: userId,
        },
      },
    });

    if (existing?.reaction === Reaction.DISLIKE) {
      await prisma.postReaction.delete({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      });

      await prisma.post.update({
        where: { id: postId },
        data: {
          dislikesCount: { decrement: 1 },
        },
      });
    } else {
      if (existing?.reaction === Reaction.LIKE) {
        await prisma.post.update({
          where: { id: postId },
          data: {
            dislikesCount: { increment: 1 },
            likesCount: { decrement: 1 },
          },
        });

        await prisma.postReaction.update({
          where: {
            postId_authorId: {
              postId,
              authorId: userId,
            },
          },
          data: {
            reaction: Reaction.DISLIKE,
          },
        });
      } else {
        await prisma.postReaction.create({
          data: {
            postId,
            authorId: userId,
            reaction: Reaction.DISLIKE,
          },
        });

        await prisma.post.update({
          where: { id: postId },
          data: {
            dislikesCount: { increment: 1 },
          },
        });
      }
    }
  },
};
export default postsService;

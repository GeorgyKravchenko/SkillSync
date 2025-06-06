import { Reaction } from '../../generated/prisma';
import prisma from '../utils/prismaClient';

const commentService = {
  async createComment(content: string, authorId: number, postId: number) {
    return await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });
  },

  async updateComment(content: string, id: number) {
    return await prisma.comment.update({
      where: { id },
      data: { content },
    });
  },

  async deleteComment(id: number) {
    return await prisma.comment.delete({
      where: { id },
    });
  },

  async addLikeForComment(commentId: number, userId: number) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_authorId: {
          commentId,
          authorId: userId,
        },
      },
    });

    if (existing?.reaction === Reaction.LIKE) {
      await prisma.commentReaction.delete({
        where: {
          commentId_authorId: {
            commentId,
            authorId: userId,
          },
        },
      });

      await prisma.comment.update({
        where: { id: commentId },
        data: {
          likesCount: { decrement: 1 },
        },
      });
    } else {
      if (existing?.reaction === Reaction.DISLIKE) {
        await prisma.comment.update({
          where: { id: commentId },
          data: {
            dislikesCount: { decrement: 1 },
            likesCount: { increment: 1 },
          },
        });

        await prisma.commentReaction.update({
          where: {
            commentId_authorId: {
              commentId,
              authorId: userId,
            },
          },
          data: {
            reaction: Reaction.LIKE,
          },
        });
      } else {
        await prisma.commentReaction.create({
          data: {
            commentId,
            authorId: userId,
            reaction: Reaction.LIKE,
          },
        });

        await prisma.comment.update({
          where: { id: commentId },
          data: {
            likesCount: { increment: 1 },
          },
        });
      }
    }
    return await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        likesCount: true,
        dislikesCount: true,
        CommentReactions: {
          where: { authorId: userId },
          select: { reaction: true },
        },
      },
    });
  },

  async addDisLikeForComment(commentId: number, userId: number) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_authorId: {
          commentId,
          authorId: userId,
        },
      },
    });

    if (existing?.reaction === Reaction.DISLIKE) {
      await prisma.commentReaction.delete({
        where: {
          commentId_authorId: {
            commentId,
            authorId: userId,
          },
        },
      });

      await prisma.comment.update({
        where: { id: commentId },
        data: {
          dislikesCount: { decrement: 1 },
        },
      });
    } else {
      if (existing?.reaction === Reaction.LIKE) {
        await prisma.comment.update({
          where: { id: commentId },
          data: {
            dislikesCount: { increment: 1 },
            likesCount: { decrement: 1 },
          },
        });

        await prisma.commentReaction.update({
          where: {
            commentId_authorId: {
              commentId,
              authorId: userId,
            },
          },
          data: {
            reaction: Reaction.DISLIKE,
          },
        });
      } else {
        await prisma.commentReaction.create({
          data: {
            commentId,
            authorId: userId,
            reaction: Reaction.DISLIKE,
          },
        });

        await prisma.comment.update({
          where: { id: commentId },
          data: {
            dislikesCount: { increment: 1 },
          },
        });
      }
    }
    return await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        likesCount: true,
        dislikesCount: true,
        CommentReactions: {
          where: { authorId: userId },
          select: { reaction: true },
        },
      },
    });
  },
};

export default commentService;

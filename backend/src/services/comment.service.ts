import { Reaction } from '../../generated/prisma';
import prisma from '../utils/prismaClient';
import { getRedisValue, redis, setRedisValue } from '../utils/redisClient';

function getPostCacheKey(id: number) {
  return `post:${id}`;
}

const commentService = {
  async createComment(content: string, authorId: number, postId: number, parentId?: number) {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
        parentId,
        isReply: parentId ? true : false,
      },
    });
    await redis.del(getPostCacheKey(postId));
    return comment;
  },

  async updateComment(content: string, id: number) {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    await redis.del(getPostCacheKey(comment.postId));
    return comment;
  },

  async deleteComment(id: number) {
    const comment = await prisma.comment.delete({
      where: { id },
    });
    await redis.del(getPostCacheKey(comment.postId));
    return comment;
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

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        postId: true,
        likesCount: true,
        dislikesCount: true,
        CommentReactions: {
          where: { authorId: userId },
          select: { reaction: true },
        },
        replies: {
          select: {
            likesCount: true,
            dislikesCount: true,
            CommentReactions: {
              where: { authorId: userId },
              select: { reaction: true },
            },
          },
        },
      },
    });

    if (comment) {
      const post = await prisma.post.findUnique({
        where: { id: comment.postId },
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
              avatar: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              isReply: true,
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
              replies: {
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
                      avatar: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });

      if (post) {
        await setRedisValue(getPostCacheKey(post.id), post, 3600);
      }
    }

    return comment;
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

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        postId: true,
        likesCount: true,
        dislikesCount: true,
        CommentReactions: {
          where: { authorId: userId },
          select: { reaction: true },
        },
        replies: {
          select: {
            likesCount: true,
            dislikesCount: true,
            CommentReactions: {
              where: { authorId: userId },
              select: { reaction: true },
            },
          },
        },
      },
    });

    if (comment) {
      const post = await prisma.post.findUnique({
        where: { id: comment.postId },
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
              avatar: true,
            },
          },
          comments: {
            select: {
              id: true,
              content: true,
              isReply: true,
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
              replies: {
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
                      avatar: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });

      if (post) {
        await setRedisValue(getPostCacheKey(post.id), post, 3600);
      }
    }

    return comment;
  },
};

export default commentService;

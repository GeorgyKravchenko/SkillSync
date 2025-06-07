import { Post, Reaction } from '../../generated/prisma';
import prisma from '../utils/prismaClient';
import { getRedisValue, redis, setRedisValue } from '../utils/redisClient';

function getPostsCacheKey(skip: number, limit: number) {
  return `posts:${skip}:${limit}`;
}

function getPostCacheKey(postId: number) {
  return `post:${postId}`;
}

const postsService = {
  async getPosts(skip: number = 0, limit: number = 10) {
    const cacheKey = getPostsCacheKey(skip, limit);
    const cachedPosts = await getRedisValue<any[]>(cacheKey);
    if (cachedPosts) return cachedPosts;

    const posts = await prisma.post.findMany({
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

    await setRedisValue(cacheKey, posts, 3600);
    return posts;
  },

  async getPostsByTopic(topicId: number, skip: number = 0, limit: number = 10) {
    const cacheKey = `posts:topic:${topicId}:${skip}:${limit}`;
    const cachedPosts = await getRedisValue<any[]>(cacheKey);
    if (cachedPosts) return cachedPosts;

    const posts = await prisma.post.findMany({
      where: { topicId },
      take: limit,
      skip,
    });

    await setRedisValue(cacheKey, posts, 3600);
    return posts;
  },

  async getPostById(id: number) {
    const cacheKey = getPostCacheKey(id);
    const cached = await getRedisValue<any>(cacheKey);
    if (cached) return cached;

    const post = await prisma.post.findUnique({
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
            avatar: true,
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
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (post) {
      await setRedisValue(cacheKey, post, 3600);
    }

    return post;
  },

  async createPost(data: { title: string; content: string; topicId: number; authorId: number }) {
    await redis.del(getPostsCacheKey(0, 10));
    return await prisma.post.create({ data });
  },

  async updatePost(id: number, data: { title?: string; content?: string }) {
    await redis.del(getPostCacheKey(id));
    await redis.del(getPostsCacheKey(0, 10));
    return await prisma.post.update({ where: { id }, data });
  },

  async deletePost(id: number) {
    await redis.del(getPostCacheKey(id));
    await redis.del(getPostsCacheKey(0, 10));
    return await prisma.post.delete({ where: { id } });
  },

  async addLikeForPost(postId: number, userId: number) {
    const existing = await prisma.postReaction.findUnique({
      where: { postId_authorId: { postId, authorId: userId } },
    });

    if (existing?.reaction === Reaction.LIKE) {
      await prisma.postReaction.delete({
        where: { postId_authorId: { postId, authorId: userId } },
      });
      await prisma.post.update({ where: { id: postId }, data: { likesCount: { decrement: 1 } } });
    } else {
      if (existing?.reaction === Reaction.DISLIKE) {
        await prisma.post.update({
          where: { id: postId },
          data: { dislikesCount: { decrement: 1 }, likesCount: { increment: 1 } },
        });
        await prisma.postReaction.update({
          where: { postId_authorId: { postId, authorId: userId } },
          data: { reaction: Reaction.LIKE },
        });
      } else {
        await prisma.postReaction.create({
          data: { postId, authorId: userId, reaction: Reaction.LIKE },
        });
        await prisma.post.update({ where: { id: postId }, data: { likesCount: { increment: 1 } } });
      }
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
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
      },
    });
    if (post) await setRedisValue(getPostCacheKey(postId), post, 3600);
  },

  async addDisLikeForPost(postId: number, userId: number) {
    const existing = await prisma.postReaction.findUnique({
      where: { postId_authorId: { postId, authorId: userId } },
    });

    if (existing?.reaction === Reaction.DISLIKE) {
      await prisma.postReaction.delete({
        where: { postId_authorId: { postId, authorId: userId } },
      });
      await prisma.post.update({
        where: { id: postId },
        data: { dislikesCount: { decrement: 1 } },
      });
    } else {
      if (existing?.reaction === Reaction.LIKE) {
        await prisma.post.update({
          where: { id: postId },
          data: { dislikesCount: { increment: 1 }, likesCount: { decrement: 1 } },
        });
        await prisma.postReaction.update({
          where: { postId_authorId: { postId, authorId: userId } },
          data: { reaction: Reaction.DISLIKE },
        });
      } else {
        await prisma.postReaction.create({
          data: { postId, authorId: userId, reaction: Reaction.DISLIKE },
        });
        await prisma.post.update({
          where: { id: postId },
          data: { dislikesCount: { increment: 1 } },
        });
      }
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
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
      },
    });
    if (post) await setRedisValue(getPostCacheKey(postId), post, 3600);
  },
};

export default postsService;

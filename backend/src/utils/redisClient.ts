import Redis from 'ioredis';

const redis = new Redis();

const setRedisValue = async <T>(key: string, value: T, ttl?: number) => {
  try {
    if (!redis) {
      throw new Error('Redis client is not initialized');
    }
    await redis.set(key, JSON.stringify(value));
    if (ttl) {
      await redis.expire(key, ttl);
    }
  } catch (err) {
    console.error('Redis set error:', err);
    throw err;
  }
};

const getRedisValue = async <T>(key: string): Promise<T | null> => {
  try {
    if (!redis) {
      throw new Error('Redis client is not initialized');
    }
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Redis get error:', err);
    return null;
  }
};

export { setRedisValue, getRedisValue, redis };

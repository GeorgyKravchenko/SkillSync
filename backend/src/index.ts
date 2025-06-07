import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route';
import profileRouter from './routes/profile.route';
import authMiddleware from './middleware/auth.middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postsRouter from './routes/posts.route';
import topicRouter from './routes/topic.route';
import commentRouter from './routes/comments.route';
import { redis } from './utils/redisClient';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());

app.use('/api/auth', authRouter);
app.use('/api/profile', authMiddleware, profileRouter);
app.use('/api/posts', authMiddleware, postsRouter);
app.use('/api/topics', authMiddleware, topicRouter);
app.use('/api/comments', authMiddleware, commentRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await redis.flushdb();
});

export default app;

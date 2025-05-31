import request from 'supertest';
import app from '../../src/index';
import prisma from '../../src/utils/prismaClient';
import { mockUserData } from '../../src/utils/mock/mockUserData';
import argon2 from 'argon2';
let cookie: string;
let createdPostId: number;
let testUserId: number;

beforeAll(async () => {
  await prisma.user.delete({
    where: {
      email: mockUserData.email,
    },
  });
  const hashedPassword = await argon2.hash('test12344321');
  const user = await prisma.user.create({
    data: {
      name: mockUserData.name,
      email: mockUserData.email,
      password: hashedPassword,
    },
  });
  testUserId = user.id;

  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ email: user.email, password: 'test12344321' });

  cookie = loginResponse.headers['set-cookie'][0];
});

afterAll(async () => {
  await prisma.comment.deleteMany({
    where: {
      postId: createdPostId,
    },
  });
  await prisma.post.deleteMany({
    where: {
      id: createdPostId,
    },
  });
  await prisma.user.delete({
    where: {
      id: testUserId,
    },
  });
  await prisma.$disconnect();
});

async function createPost(data = {}) {
  return request(app)
    .post('/api/posts')
    .set('Cookie', cookie)
    .send({
      title: 'Default Title',
      content: 'Default Content',
      topicId: 1,
      ...data,
    });
}

describe('POST /api/posts', () => {
  it('should create a post with valid data', async () => {
    const response = await createPost({
      title: 'Valid Post Title',
      content: 'Valid content',
      topicId: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Valid Post Title',
      content: 'Valid content',
      topicId: 1,
      authorId: testUserId,
    });

    createdPostId = response.body.id;
  });

  it('should fail without authentication', async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'No auth',
      content: 'No auth content',
      topicId: 1,
    });
    expect(res.status).toBe(401);
  });

  it('should fail with missing required fields', async () => {
    const res = await createPost({ title: '', content: '', topicId: null });
    expect(res.status).toBe(500);
  });
});

describe('GET /api/posts', () => {
  it('should return list of posts', async () => {
    const res = await request(app).get('/api/posts').set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/posts/:id', () => {
  it('should return single post', async () => {
    const res = await request(app).get(`/api/posts/${createdPostId}`).set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdPostId);
  });

  it('should return 404 for non-existent post', async () => {
    const res = await request(app).get('/api/posts/9999999').set('Cookie', cookie);
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/posts/:id', () => {
  it('should update the post', async () => {
    const res = await request(app).put(`/api/posts/${createdPostId}`).set('Cookie', cookie).send({
      title: 'Updated title',
      content: 'Updated content',
    });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated title');
  });

  it('should return 500 when updating non-existent post', async () => {
    const res = await request(app).put('/api/posts/9999999').set('Cookie', cookie).send({
      title: 'No post',
      content: 'No post',
    });

    expect(res.status).toBe(500);
  });
});

describe('DELETE /api/posts/:id', () => {
  it('should delete the post', async () => {
    const res = await request(app).delete(`/api/posts/${createdPostId}`).set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Пост успешно удален');
  });

  it('should return 500 when deleting non-existent post', async () => {
    const res = await request(app).delete(`/api/posts/${createdPostId}`).set('Cookie', cookie);

    expect(res.status).toBe(500);
  });

  it('should return 500 when trying to get deleted post', async () => {
    const res = await request(app).get(`/api/posts/${createdPostId}`).set('Cookie', cookie);
    expect(res.status).toBe(404);
  });
});

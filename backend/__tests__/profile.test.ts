import request from 'supertest';
import { mockUserData } from '../src/utils/mock/mockUserData';
import prisma from '../src/utils/prismaClient';
import argon2 from 'argon2';
import app from '../src/index';
let cookie: string;
let testUserId: number;

beforeAll(async () => {
  // Очищення за email
  await prisma.user.deleteMany({
    where: { email: mockUserData.email },
  });

  const hashedPassword = await argon2.hash('test12344321');
  const user = await prisma.user.create({
    data: {
      ...mockUserData,
      password: hashedPassword,
    },
  });

  testUserId = user.id;

  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ email: user.email, password: 'test12344321' });

  if (!loginResponse.headers['set-cookie']) {
    console.error(loginResponse.body); // 👈 додай це для дебагу
    throw new Error('Login failed — no cookie set');
  }

  cookie = loginResponse.headers['set-cookie'][0];
});
afterAll(async () => {
  await prisma.user.delete({
    where: {
      id: testUserId,
    },
  });
  await prisma.$disconnect();
});

describe('GET /api/profile', () => {
  it('should return profile', async () => {
    const res = await request(app).get('/api/profile').set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      email: mockUserData.email,
      name: mockUserData.name,
    });
  });
});

describe('PUT /api/profile', () => {
  it('should update profile', async () => {
    const res = await request(app).put('/api/profile').set('Cookie', cookie).send({
      name: 'Updated name',
      email: 'updatedUser@gmail.com',
      description: 'Updated description',
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: 'Updated name',
      email: 'updatedUser@gmail.com',
      description: 'Updated description',
    });
  });
});

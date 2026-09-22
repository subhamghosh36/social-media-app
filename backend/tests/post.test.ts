import request from 'supertest';
import app from '../src/app';

// Note: In a real test setup, you'd want to mock Prisma 
// or run migrations against a test database before these run.

describe('Post API Integration Tests', () => {
  it('GET /api/posts should return a list of posts', async () => {
    const res = await request(app).get('/api/posts');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('POST /api/posts should create a new post with text content', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ content: 'Integration testing is awesome!' });
    
    // Remember, we added a mock auth middleware that injects a test user ID!
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Post created successfully');
    expect(res.body.post).toHaveProperty('content', 'Integration testing is awesome!');
  });
});

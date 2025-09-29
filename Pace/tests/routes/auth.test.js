const request = require('supertest');
const app = require('../../server'); // import your Express app

describe('Auth Routes', () => {

  // Test for POST /auth/signin
  test('POST /api/auth/login should login an existing user', async () => {
    // You should have a user in your DB with this email/password
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        emailOrUsername: 'alice@example.com',
        password: 'Secret123!'
      });

    expect(res.statusCode).toBe(200);               // HTTP 200 OK
    expect(res.body).toHaveProperty('success', true);  
  });

  // Optional: test login failure with wrong password
  test('POST /api/auth/login should fail with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        emailOrUsername: 'testuser@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(404);              // Unauthorized
    expect(res.body).toHaveProperty('error', 'Invalid credentials'); // error message
  });

});

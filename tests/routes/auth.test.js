const request = require('supertest');
const { app, server } = require('../../server'); // Import both app and server
const mongoose = require('mongoose'); // Import mongoose for cleanup

describe('POST /api/auth/signup', () => {
  it('should create a new user and return public profile', async () => {
    const userData = {
      name: "Arissrrfsseeu",
      username: "arsefiressuue12",
      email: "@exsaedemfrple.com",
      password: "Secsfeserertt45!"
    };

    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(userData.name);
    expect(res.body.username).toBe(userData.username);
    expect(res.body.email).toBe(userData.email);

    expect(res.body.password).toBeUndefined();

    expect(res.headers['set-cookie']).toBeDefined();
    expect(
      res.headers['set-cookie'].some(cookie => cookie.startsWith('accessToken'))
    ).toBe(true);
    expect(
      res.headers['set-cookie'].some(cookie => cookie.startsWith('refreshToken'))
    ).toBe(true);
  });

  afterAll(async () => {
    // Close the HTTP server to end your test process
    if (server && typeof server.close === 'function') {
      await server.close();
    }
    // Disconnect mongoose to release DB handles
    await mongoose.disconnect();
  });
});

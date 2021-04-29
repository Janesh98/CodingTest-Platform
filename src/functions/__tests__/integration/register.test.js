const app = require('../../app');
const mongoose = require('mongoose');
const NewUserDB = require('../../models/UserModel');
const supertest = require('supertest');
const request = supertest(app);

describe('/register', () => {
  beforeEach((done) => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/JestDB';
    mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
      () => done()
    );
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });
  it('POST /, should return 400 Error as user details invalid', async () => {
    const mockData = {
      data: {
        googleId: '123',
        email: 'invalidEmail',
      },
    };
    const res = await request.post('/register').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        email: 'Must be a valid email address',
      },
    };
    expect(res.statusCode).toBe(400);
    expect(res.body.email).toBe(expected.data.email);
  });
  it('POST /, should Validate and Register user', async () => {
    const mockData = {
      data: {
        googleId: '123',
        email: 'test@gmail.com',
      },
    };
    const res = await request.post('/register').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        googleId: mockData.data.googleId,
        data: null,
      },
    };
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(expected.data);
  });
});

describe('/checkRegister', () => {
  beforeEach((done) => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/JestDB';
    mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
      () => done()
    );
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });
  it('POST /, should check if user is registered', async () => {
    const mockData = {
      data: {
        googleId: '123',
        email: 'test@gmail.com',
      },
    };
    const newUserEntry = new NewUserDB({
      email: mockData.data.email,
      googleId: mockData.data.googleId,
    });
    await newUserEntry.save();
    const res = await request.post('/checkRegister').send({
      data: mockData.data,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data[0].email).toBe(mockData.data.email);
    expect(res.body.data[0].googleId).toBe(mockData.data.googleId);
  });
});

const app = require('../../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
const CodingTestDB = require('../../models/CodingTestModel');

describe('/newTest', () => {
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
  it('POST /, should add new coding test', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        testName: 'the test',
        timeLimit: 60
      },
    };
    const res = await request.post('/test').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
        status: "success"
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});

describe('/getTests', () => {
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
  it('POST /, should get coding tests for user', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        testName: 'the test',
        timeLimit: 60
      },
    };
    const newCodingTestEntry = new CodingTestDB({
          googleId: '123',
          testName: 'the test',
          timeLimit: 60
    });
    await newCodingTestEntry.save();
    const res = await request.post('/tests').send({
      data: mockData.data,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data[0].testName).toBe('the test');
  });
  
});
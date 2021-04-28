const app = require('../../app');
const mongoose = require('mongoose');
const NewUserDB = require('../../models/UserModel');
const supertest = require('supertest');
const request = supertest(app);
const CodingTestDB = require('../../models/CodingTestModel');
const CodingChallengeDB = require('../../models/CodingChallengeModel');
const QuestionsDB = require('../../models/QuestionsModel');
const ParticipantDB = require('../../models/ParticipantsModel');

describe('/deleteTest', () => {
  beforeEach((done) => {
    mongoose.connect(
      'mongodb://localhost:27017/JestDB',
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
  it('POST /, should delete test', async () => {
    const mockData = {
      data: {
        googleId: '123',
        testName: "6969",
        _id: '12345'
      },
    };
    const res = await request.post('/delete').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
      },
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});

describe('/deleteChallenge', () => {
  beforeEach((done) => {
    mongoose.connect(
      'mongodb://localhost:27017/JestDB',
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
  it('POST /, should delete the challenge', async () => {
    const mockData = {
      data: {
        googleId: '123',
        testName: "6969",
        title: "hello world!",
        _id: '12345'
      },
    };
    const res = await request.post('/deleteChallenge').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
      },
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});

describe('/deleteQuestions', () => {
  beforeEach((done) => {
    mongoose.connect(
      'mongodb://localhost:27017/JestDB',
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
  it('POST /, should delete questions', async () => {
    const mockData = {
      data: {
        googleId: '123',
        testName: "6969",
        _id: '12345'
      },
    };
    const res = await request.post('/deleteQuestions').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
      },
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});

describe('/deleteUserData', () => {
  beforeEach((done) => {
    mongoose.connect(
      'mongodb://localhost:27017/JestDB',
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
  it('POST /, should delete user data', async () => {
    const mockData = {
      data: {
        googleId: '123',
      },
    };
    const res = await request.post('/deleteUserData').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
      },
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});

describe('/resetTest', () => {
  beforeEach((done) => {
    mongoose.connect(
      'mongodb://localhost:27017/JestDB',
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
  it('POST /, should reset test', async () => {
    const mockData = {
      data: {
        TestId: "6969",
      },
    };
    const res = await request.post('/resetTest').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: null,
      },
    };
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected.data);
  });
  
});
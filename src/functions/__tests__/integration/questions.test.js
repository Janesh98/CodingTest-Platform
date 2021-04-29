const app = require('../../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
const QuestionsDB = require('../../models/QuestionsModel');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');

describe('/getQuestions', () => {
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
  it('POST /, should get all questions', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        testName: 'the test',
      },
    };

    const newQuestionsEntry = new QuestionsDB({
          googleId: '123',
          testName: 'the test',
          questions: ['who']
    });
    await newQuestionsEntry.save();
    const res = await request.post('/getQuestions').send({
      data: mockData.data,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data[0].questions[0]).toBe('who');
  });
  
});

describe('/updateQuestions', () => {
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
  it('POST /, should update existing questions', async () => {    
    const mockData = {
      data: {
        _id: id,
        questions: ['who', 'what', 'where'],
      },
    };
    const res = await request.post('/updateQuestions').send({
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

describe('/addQs', () => {
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
  it('POST /, should add new questions', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        testName: 'the test',
        questions: ['who', 'what', 'where'],
      },
    };
    const res = await request.post('/questions').send({
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
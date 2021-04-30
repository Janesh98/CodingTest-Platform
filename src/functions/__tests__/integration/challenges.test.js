const app = require('../../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
const CodingChallengeDB = require('../../models/CodingChallengeModel');

describe('/newChallenge', () => {
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
  it('POST /, should add a new challenge', async () => {
    const mockData = {
      data: {
        googleId: '123',
          testName: 'the test',
          title: 'test title',
          problemDescription: 'test prob',
          inputFormat: '1 2 3',
          returnFormat: '5',
          constraints: '1 < n < 10',
          sampleInput: '1 2 3',
          sampleOutput: '5',
          exampleExplanation: 'test example',
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
          timeout: 15
      },
    };
    const res = await request.post('/challenge').send({
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

describe('/updateChallenge', () => {
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
  it('POST /, should update an existing challenge', async () => {
    const mockData = {
      data: {
        googleId: '123',
          testName: 'the test',
          title: 'test title',
          problemDescription: 'test prob',
          inputFormat: '1 2 3',
          returnFormat: '5',
          constraints: '1 < n < 10',
          sampleInput: '1 2 3',
          sampleOutput: '5',
          exampleExplanation: 'test example',
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
          timeout: 15
      },
    };
    const res = await request.post('/updateChallenge').send({
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

describe('/getChallenges', () => {
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
  it('POST /, should get all challenges', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        testName: 'the test',
      },
    };

    const newChallengeEntry = new CodingChallengeDB({
        googleId: '123',
          testName: 'the test',
          title: 'test title',
          problemDescription: 'test prob',
          inputFormat: '1 2 3',
          returnFormat: '5',
          constraints: '1 < n < 10',
          sampleInput: '1 2 3',
          sampleOutput: '5',
          exampleExplanation: 'test example',
          testInput1: 1,
          testOutput1: 1,
          testInput2: 2,
          testOutput2: 2,
          testInput3: 3,
          testOutput3: 3,
          testInput4: 4,
          testOutput4: 4,
          testInput5: 5,
          testOutput5: 5,
          testInput6: 6,
          testOutput6: 6,
          testInput7: 7,
          testOutput7: 7,
          testInput8: 8,
          testOutput8: 8,
          testInput9: 9,
          testOutput9: 9,
          testInput10: 10,
          testOutput10: 10,
          timeout: 15
    });
    await newChallengeEntry.save();
    const res = await request.post('/challenges').send({
      data: mockData.data,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data[0].title).toBe("test title");
    expect(res.body.data[0].problemDescription).toBe("test prob");
  });
  
});
const app = require('../../app');
const mongoose = require('mongoose');
const ParticipantDB = require('../../models/ParticipantsModel');
const supertest = require('supertest');
const request = supertest(app);

describe('/getParticipants', () => {
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
  it('POST /, should get participants', async () => {
    const mockData = {
      data: {
        TestId: '123',
      },
    };
    const newParticipant = new ParticipantDB({
      TestId: mockData.data.TestId,
      googleId: '1234',
      email: 'test@gmail.com',
      expiryDate: "2021-12-31T00:00"
    });
    await newParticipant.save();
    const res = await request.post('/getParticipants').send({
      data: mockData.data,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].TestId).toBe(mockData.data.TestId);
    expect(res.body.data[0].googleId).toBe('1234');
    expect(res.body.data[0].email).toBe('test@gmail.com');
  });
});

describe('/getParticipantResults', () => {
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
  it('POST /, should get participant results', async () => {
    const mockData = {
      data: {
        TestId: '123',
      },
    };
    const newParticipant = new ParticipantDB({
      TestId: mockData.data.TestId,
      googleId: '1234',
      email: 'test@gmail.com',
      expiryDate: "2021-12-31T00:00"
    });
    await newParticipant.save();
    const res = await request.post('/getParticipantResults').send({
      data: { _id: newParticipant._id },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].TestId).toBe(mockData.data.TestId);
    expect(res.body.data[0].googleId).toBe('1234');
    expect(res.body.data[0].email).toBe('test@gmail.com');
  });
});

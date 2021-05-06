const app = require('../../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');
const { db } = require('../../utilities/admin');

jest.mock('../../utilities/admin');
describe('/sendEmail', () => {
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
  it('POST /, should send an email and id participant document', async () => {
    const adminMock = {
      add: jest.fn().mockImplementation(({ result }) => {
        return {};
      }),
    };
    await jest.spyOn(db, 'collection').mockReturnValue(adminMock);
    const mockData = {
      data: {
        email: 'email@mail.com',
        _id: id,
        googleId: '123',
        attemptedTest: false,
        expiryDate: "2021-12-31T00:00"
      },
    };

    const res = await request.post('/email').send({
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

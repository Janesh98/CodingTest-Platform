const app = require('../../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const request = supertest(app);
const NewUserDB = require('../../models/UserModel');
var id = mongoose.mongo.ObjectId('4eb6e7e7e9b7f4194e000001');

describe('/company', () => {
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
  it('POST /, should get all companies', async () => {    


    const newUserEntry = new NewUserDB({
          googleId: '123',
          email: 'test@mail.com',
          company: 'test company'
    });
    await newUserEntry.save();
    const res = await request.post('/company/all').send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
    expect(res.body.data[0].company).toBe('test company');
  });
  
});

describe('/addCompany', () => {
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
  it('POST /, should add new company', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        company: 'test company'
      },
    };
    const newUserEntry = new NewUserDB({
          googleId: '123',
          email: 'test@mail.com',
    });
    await newUserEntry.save();
    const res = await request.post('/company').send({
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

  it('POST /, should fail to add new company', async () => {    
    const mockData = {
      data: {
        googleId: '123',
        company: 'test company'
      },
    };
    const res = await request.post('/company').send({
      data: mockData.data,
    });

    const expected = {
      data: {
        data: 'Account for googleId does not exist',
        status: "failed"
      },
    };

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual(expected.data);
  });
  
});
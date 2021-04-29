const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);

describe('/submission', () => {
  it('GET /, Add Submission and wait until completion - python', async () => {
    const res = await request.post('/submission').send({
      data: {
        code:
          'aW1wb3J0IHN5cwoKZGVmIHNvbHV0aW9uKGwpOgogICAgcmV0dXJuIHNvcnRlZChsKQoKZGVmIG1haW4oKToKICAgIGwgPSBbXQogICAgZm9yIGxpbmUgaW4gc3lzLmFyZ3ZbMTpdOgogICAgICAgIG4gPSBpbnQobGluZS5zdHJpcCgpKQogICAgICAgIGwuYXBwZW5kKG4pCgogICAgcHJpbnQoIlNvbHV0aW9uOiB7fSIuZm9ybWF0KHNvbHV0aW9uKGwpKSkKCmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6CiAgICBtYWluKCk=',
        input: '123 456 12 56 879 0 1 2 34 4 567 23',
        language: 'python',
        wait: true,
      },
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('memory');
    expect(res.body.data).toHaveProperty('time');
    expect(res.body.data).toHaveProperty('stdout');
    expect(res.body.data).toHaveProperty('stderr');
  });
  it('GET /, Add Submission and wait until completion - java', async () => {
    const res = await request.post('/submission').send({
      data: {
        code:
          'cHVibGljIGNsYXNzIE1haW4KewogICAgcHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nIGFyZ3NbXSkKICAgIHsKICAgICAgICBTeXN0ZW0ub3V0LnByaW50bG4oIkhlbGxvLCBXb3JsZCIpOwogICAgICAgIGZvcihTdHJpbmcgczogYXJncykgewogICAgICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKHMpOwogICAgICAgIH0KICAgIH0KfQ==',
        input:
          '123 6969 12 56 879 0 1 2 34 4 567 23 12 78 0 13901 2480 289340 238 348 282 23 4 5 6 7 7 2 34 56 75',
        language: 'java',
        wait: true,
      },
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('memory');
    expect(res.body.data).toHaveProperty('time');
    expect(res.body.data).toHaveProperty('stdout');
    expect(res.body.data).toHaveProperty('stderr');
  });
});

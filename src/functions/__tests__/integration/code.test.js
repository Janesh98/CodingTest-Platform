const app = require('../../app');

const supertest = require('supertest');
const request = supertest(app);

describe('/code', () => {
  // it('POST /, Execute Code in Python', async () => {
  //   const res = await request
  //     .post('/code')
  //     .send({
  //       data: {
  //         language: 'python',
  //         code: 'cHJpbnQoJ2hlbGxvIHdvcmxkJyk=',
  //         stdin: 'MTIz',
  //       },
  //     })
  //     .timeout(15000);

  //   const expected = {
  //     data: {
  //       stdout: 'aGVsbG8gd29ybGQK\n',
  //       stderr: null,
  //       compile_output: null,
  //       message: null,
  //     },
  //   };
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.data.stdout).toBe(expected.data.stdout);
  //   expect(res.body.data.stderr).toBeNull();
  //   expect(res.body.data.compile_output).toBeNull();
  //   expect(res.body.data.message).toBeNull();
  // });
  it('POST /, should return 404 Error', async () => {
    const res = await request
      .post('/code')
      .send({
        data: {
          language: 'doesNotExist',
          code: 'cHJpbnQoJ2hlbGxvIHdvcmxkJyk=',
          stdin: 'MTIz',
        },
      })
      .timeout(15000);

    const expected = {
      data: {
        stdout: 'aGVsbG8gd29ybGQK\n',
        stderr: null,
        compile_output: null,
        message: null,
      },
    };
    expect(res.statusCode).toBe(404);
  });
});

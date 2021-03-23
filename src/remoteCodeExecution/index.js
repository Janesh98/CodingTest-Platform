const express = require('express');
const app = express();
const port = 8000;
const Docker = require('dockerode');
const docker = new Docker();
const streams = require('memory-streams');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// example creates hello world python file and executes it
app.get('/container', (req, res) => {
  var stdout = new streams.WritableStream();
  var stderr = new streams.WritableStream();

  docker
    .run(
      'python:3-alpine',
      [
        '/bin/sh',
        '-c',
        'echo "print(\'hello world)" > test.py && python3 test.py',
      ],
      [stdout, stderr],
      { Tty: false }
    )
    .then(([result, container]) => {
      console.log(result);
      stdout = stdout.toString().trim();
      stderr = stderr.toString().trim();
      container.remove();
      return res.status(200).json({
        stdout: stdout,
        stderr: stderr,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

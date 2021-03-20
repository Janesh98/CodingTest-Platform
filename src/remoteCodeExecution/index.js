const express = require('express');
const app = express();
const port = 8000;
const Docker = require('dockerode');
const docker = new Docker();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// example creates hello world python file and executes it
app.get('/container', (req, res) => {
  try {
    //callback
    docker.run(
      'python:3-alpine',
      [
        '/bin/sh',
        '-c',
        'echo "print(\'hello world\')" > test.py && python3 test.py',
      ],
      process.stdout,
      (err, data, container) => {
        container.remove();
        return res.json({
          err,
          data,
          container,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.send('Failed to execute');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

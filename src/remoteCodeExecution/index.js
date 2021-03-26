const express = require('express');
const app = express();
const port = 8000;
const Docker = require('dockerode');
const docker = new Docker();
const streams = require('memory-streams');
const { Base64 } = require('js-base64');

app.use(express.json());

// executes code in docker container, deleting container afterwards.
app.post('/container', (req, res) => {
  // code is a Base64 encoded string
  const code = req.body.data.code;
  // input passed to program as command line args
  const input = req.body.data.input;
  var decoded = Base64.decode(code);
  // TODO issue with quotes that need to be escaped in code
  // e.g echo command converts print("hello world") to print(hello world),
  // removing quotes, they need to be escaped with a \.
  // console.log(decoded);
  // // decoded = decoded.replace(/(["'])/g, '\\$1');
  // console.log(decoded);

  var stdout = new streams.WritableStream();
  var stderr = new streams.WritableStream();

  docker
    .run(
      'python:3-alpine',
      [
        '/bin/sh',
        '-c',
        `echo "${decoded}" > test.py && python3 test.py ${input}`,
      ],
      [stdout, stderr],
      { Tty: false }
    )
    .then(([result, container]) => {
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
  console.log(`Server listening on port: ${port}`);
});

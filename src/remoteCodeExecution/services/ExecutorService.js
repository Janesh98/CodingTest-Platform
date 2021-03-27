const Docker = require('dockerode');
const docker = new Docker();
const streams = require('memory-streams');
const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');

// executes code submitted in docker container, deleting container afterwards.
class ExecutorService {
  async execute(code, input) {
    var decoded = Base64.decode(code);
    decoded = escapeQuotes(decoded);

    var stdout = new streams.WritableStream();
    var stderr = new streams.WritableStream();

    const data = await docker.run(
      'python:3-alpine',
      [
        '/bin/sh',
        '-c',
        `echo "${decoded}" > test.py && python3 test.py ${input}`,
      ],
      [stdout, stderr],
      { Tty: false }
    );
    const container = data[1];
    await container.remove();
    stdout = stdout.toString().trim();
    stderr = stderr.toString().trim();
    return {
      stdout,
      stderr,
    };
  }
}

module.exports = ExecutorService;

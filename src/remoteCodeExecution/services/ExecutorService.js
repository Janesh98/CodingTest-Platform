const Docker = require('dockerode');
const docker = new Docker();
const streams = require('memory-streams');
const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { getRunTime } = require('../utils/runTime');

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
    const stats = await container.inspect();
    const runTime = getRunTime(stats.State.StartedAt, stats.State.FinishedAt);
    await container.remove();
    stdout = stdout.toString().trim();
    stderr = stderr.toString().trim();
    return {
      time: runTime,
      stdout,
      stderr,
    };
  }
}

module.exports = ExecutorService;

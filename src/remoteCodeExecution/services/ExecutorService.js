const Docker = require('dockerode');
const docker = new Docker();
const streams = require('memory-streams');
const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { getRunTime } = require('../utils/runTime');

// executes code submitted in docker container, deleting container afterwards.
class ExecutorService {
  async execute(code, input, language) {
    var stdout = new streams.WritableStream();
    var stderr = new streams.WritableStream();

    const context = this.createContext(code, input, language);

    const data = await docker.run(
      context.image,
      ['/bin/sh', '-c', context.cmd],
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

  // returns correct docker image name and command to execute
  createContext(code, input, language) {
    var decoded = Base64.decode(code);
    decoded = escapeQuotes(decoded);

    var context = {};
    language = language.toLowerCase();
    switch (language) {
      case 'python3':
        context.image = 'python:3-alpine';
        context.cmd = `echo "${decoded}" > test.py && python3 test.py ${input}`;
        break;
      case 'java':
        context.image = 'openjdk:8-alpine';
        context.cmd = `echo "${decoded}" > Main.java && javac Main.java && java Main ${input}`;
        break;
      default:
        throw new Error(`Error: '${language}' is not a supported language.`);
    }
    return context;
  }
}

module.exports = ExecutorService;

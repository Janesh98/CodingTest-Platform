const docker = require('../config/dockerSetup');
const streams = require('memory-streams');
const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { getRunTime } = require('../utils/runTime');
const { extractMemory } = require('../utils/extractMemory');

// executes code submitted in docker container, deleting container afterwards.
class ExecutorService {
  async execute(code, input, language, maxTimeLimit) {
    var stdout = new streams.WritableStream();
    var stderr = new streams.WritableStream();

    const context = this.createContext(code, input, language, maxTimeLimit);

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
    const output = extractMemory(stderr);

    if (this.isTimeoutError(stderr)) {
      output.stderr = 'Timeout Error: Maximum time limit exceeded.';
    }

    return {
      time: runTime,
      memory: output.memory,
      stdout: Base64.encode(stdout),
      stderr: Base64.encode(output.stderr),
    };
  }

  // returns correct docker image name and command to execute
  createContext(code, input, language, maxTimeLimit) {
    code = Base64.decode(code);
    input = Base64.decode(input);
    code = escapeQuotes(code);
    const getMem = "time -f 'MEM: %M'";
    if (!maxTimeLimit) {
      maxTimeLimit = 15;
    } else {
      maxTimeLimit = parseInt(maxTimeLimit);
      maxTimeLimit < 15 ? 15 : maxTimeLimit;
    }
    const timeout = `/usr/bin/timeout ${maxTimeLimit}s`;

    var context = {};
    language = language.toLowerCase();
    switch (language) {
      case 'python':
        context.image = 'python:3-alpine';
        context.cmd = `echo "${code}" > test.py && ${getMem} ${timeout} python3 test.py ${input}`;
        break;
      case 'java':
        context.image = 'openjdk:8-alpine';
        context.cmd = `echo "${code}" > Main.java && javac Main.java && ${getMem} java Main ${input}`;
        break;
      case 'javascript':
        context.image = 'node:lts';
        context.cmd = `echo "${code}" > test.js && node test.js`;
        break;
      default:
        throw new Error(`'${language}' is not a supported language.`);
    }
    return context;
  }

  isTimeoutError(stderr) {
    return stderr.includes('Command terminated by signal 15');
  }
}

module.exports = ExecutorService;

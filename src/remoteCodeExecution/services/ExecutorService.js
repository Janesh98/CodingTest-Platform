const docker = require('../config/dockerSetup');
const streams = require('memory-streams');
const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { getRunTime } = require('../utils/runTime');
const { extractMemory } = require('../utils/extractMemory');

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
    const output = extractMemory(stderr);
    return {
      time: runTime,
      memory: output.memory,
      stdout: Base64.encode(stdout),
      stderr: Base64.encode(output.stderr),
    };
  }

  // returns correct docker image name and command to execute
  createContext(code, input, language) {
    code = Base64.decode(code);
    input = Base64.decode(input);
    code = escapeQuotes(code);
    const getMem = "time -f 'MEM: %M'";

    var context = {};
    language = language.toLowerCase();
    switch (language) {
      case 'python':
        context.image = 'python:3-alpine';
        context.cmd = `echo "${code}" > test.py && ${getMem} python3 test.py ${input}`;
        break;
      case 'java':
        context.image = 'openjdk:8-alpine';
        context.cmd = `echo "${code}" > Main.java && javac Main.java && ${getMem} java Main ${input}`;
        break;
      default:
        throw new Error(`'${language}' is not a supported language.`);
    }
    return context;
  }
}

module.exports = ExecutorService;
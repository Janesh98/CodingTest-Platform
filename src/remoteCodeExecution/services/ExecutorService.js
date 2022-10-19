const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { extractMemory } = require('../utils/extractMemory');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto');

// executes code submitted by user and returns stdout and stderr.
class ExecutorService {
  async execute(code, input, language, maxTimeLimit) {
    const context = this.createContext(code, input, language, maxTimeLimit);

    const runTime = null;
    // TODO: calculate runtime, the time taken to execute the code

    const output = await this.executeShellCommand(context.cmd);
    const stdout = output.stdout.toString().trim();
    const stderr = output.stderr.toString().trim();
    const out = extractMemory(stderr);

    // delete temporary file
    await this.executeShellCommand(`rm -rf ${context.folder}`);

    if (this.isTimeoutError(stderr)) {
      output.stderr = 'Timeout Error: Maximum time limit exceeded.';
    }

    return {
      time: runTime,
      memory: out.memory,
      stdout: Base64.encode(stdout),
      stderr: Base64.encode(out.stderr),
    };
  }

  async executeShellCommand(cmd) {
    try {
      console.info('cmd: ', cmd);
      const output = await exec(cmd);
      console.info('stdout: ', output.stdout);
      console.info('stderr: ', output.stderr);
      return output;
    } catch (err) {
      console.error('err: ', err);
      return { stdout: '', stderr: err };
    }
  }

  // returns correct docker image name and command to execute
  createContext(code, input, language, maxTimeLimit) {
    code = Base64.decode(code);
    input = Base64.decode(input);
    code = escapeQuotes(code);
    const getMem = "/usr/bin/time -f 'MEM: %M'";
    if (!maxTimeLimit) {
      maxTimeLimit = 15;
    } else {
      maxTimeLimit = parseInt(maxTimeLimit);
      maxTimeLimit < 15 ? 15 : maxTimeLimit;
    }
    const timeout = `/usr/bin/timeout ${maxTimeLimit}s`;
    const id = crypto.randomBytes(16).toString('hex');

    var context = {};
    context.folder = `/tmp/code/${id}`;
    language = language.toLowerCase();
    switch (language) {
      case 'python':
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/test.py && ${getMem} ${timeout} python3 ${context.folder}/test.py ${input}`;
        break;
      case 'java':
        // TODO: add getMem and timeout for java and javascript
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/Main.java && javac ${context.folder}/Main.java && ${getMem} java ${context.folder}/Main.java ${input}`;
        break;
      case 'javascript':
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/test.js && node ${context.folder}/test.js ${input}`;
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

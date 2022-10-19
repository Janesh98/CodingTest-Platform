const { Base64 } = require('js-base64');
const { escapeQuotes } = require('../utils/escape');
const { extractMemory } = require('../utils/extractMemory');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto');

// executes code submitted by user and returns stdout and stderr.
class ExecutorService {
  async execute(code, input, language, maxTimeLimit) {
    maxTimeLimit = this.getTimeLimit(maxTimeLimit);
    const context = this.createContext(code, input, language, maxTimeLimit);

    const runTime = null;
    // TODO: calculate runtime, the time taken to execute the code

    const output = await this.executeShellCommand(context.cmd, maxTimeLimit);
    const stdout = output.stdout.toString().trim();
    const stderr = output.stderr.toString().trim();
    const out = extractMemory(stderr);

    // delete temporary file
    await this.executeShellCommand(`rm -rf ${context.folder}`, 0);

    if (this.isTimeoutError(output.stderr)) {
      out.stderr = `Timeout Error: Maximum time limit of ${maxTimeLimit}s exceeded.`;
      console.info(out.stderr);
    }

    return {
      time: runTime,
      memory: out.memory,
      stdout: Base64.encode(stdout),
      stderr: Base64.encode(out.stderr),
    };
  }

  async executeShellCommand(cmd, maxTimeLimit) {
    try {
      console.info('cmd: ', cmd);
      const output = await exec(cmd, { timeout: maxTimeLimit });
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
    const id = crypto.randomBytes(16).toString('hex');

    var context = {};
    context.folder = `/tmp/code/${id}`;
    language = language.toLowerCase();
    switch (language) {
      case 'python':
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/test.py && ${getMem} python3 ${context.folder}/test.py ${input}`;
        break;
      case 'java':
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/Main.java && javac ${context.folder}/Main.java && ${getMem} java ${context.folder}/Main.java ${input}`;
        break;
      case 'javascript':
        context.cmd = `mkdir -p ${context.folder}/ && echo "${code}" > ${context.folder}/test.js && ${getMem} node ${context.folder}/test.js ${input}`;
        break;
      default:
        throw new Error(`'${language}' is not a supported language.`);
    }
    return context;
  }

  getTimeLimit(maxTimeLimit) {
    if (!maxTimeLimit) {
      maxTimeLimit = 15;
    } else {
      maxTimeLimit = parseInt(maxTimeLimit);
      maxTimeLimit < 15 ? 15 : maxTimeLimit;
    }

    return maxTimeLimit * 1000;
  }

  isTimeoutError(stderr) {
    return (
      (stderr.hasOwnProperty('signal') && stderr.signal === 'SIGTERM') ||
      (stderr.hasOwnProperty('killed') && stderr.killed === true)
    );
  }
}

module.exports = ExecutorService;

const throng = require('throng');
const ExecutorService = require('./services/ExecutorService');
const submissionQueue = require('./config/queueSetup');
const workers = process.env.WEB_CONCURRENCY || 2;
const maxJobsPerWorker = process.env.MAX_JOBS_PER_WORKER || 50;

const start = async () => {
  submissionQueue.process(maxJobsPerWorker, async (job) => {
    try {
      const code = job.data.code;
      const input = job.data.input;
      const language = job.data.language;
      const maxTimeLimit = job.data.timeout;

      const output = await new ExecutorService().execute(
        code,
        input,
        language,
        maxTimeLimit
      );
      await job.update(output);
      return { data: output };
    } catch (err) {
      console.error(err);
      return { data: err };
    }
  });
};

// Initialize workers
throng({ workers, start });

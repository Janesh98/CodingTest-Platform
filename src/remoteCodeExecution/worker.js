const throng = require('throng');
const Queue = require('bull');
const ExecutorService = require('./services/ExecutorService');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const workers = process.env.WEB_CONCURRENCY || 2;
const maxJobsPerWorker = process.env.MAX_JOBS_PER_WORKER || 50;

const start = async () => {
  const submissionQueue = new Queue('submissions', REDIS_URL);

  submissionQueue.process(maxJobsPerWorker, async (job) => {
    try {
      const code = job.data.code;
      const input = job.data.input;

      const output = await new ExecutorService().execute(code, input);
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

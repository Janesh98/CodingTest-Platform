const submissionQueue = require('../config/queueSetup');
const ExecutorService = require('../services/ExecutorService');

// add submission to queue
exports.addSubmission = async (req, res) => {
  const data = req.body.data;
  if (data?.wait === true) {
    const code = data.code;
    const input = data.input;
    const language = data.language;

    const output = await new ExecutorService().execute(code, input, language);
    res.status(200).json({ data: output });
  } else {
    const job = await submissionQueue.add(data);
    res.status(201).json({ id: job.id });
  }
};

// return status of submission and output if it has been processed.
exports.getSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await submissionQueue.getJob(id);

    if (job === null) {
      res
        .status(404)
        .json({ data: { error: `Submission with id ${id} does not exist` } });
    } else {
      const state = await job.getState();
      const progress = job._progress;
      const reason = job.failedReason;
      const data = job.data;
      if (state === 'completed') {
        res.json({
          id,
          state,
          progress,
          reason,
          data,
        });
      } else {
        res.json({
          id,
          state,
          progress,
          reason,
          data: null,
        });
      }
    }
  } catch (err) {
    res.status(404).json({ data: err });
  }
};

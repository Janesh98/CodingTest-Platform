const ExecutorService = require('../services/ExecutorService');

exports.submission = async (req, res) => {
  try {
    const code = req.body.data.code;
    const input = req.body.data.input;
    const output = await new ExecutorService().execute(code, input);
    res.status(200).json(output);
  } catch (err) {
    console.error(err);
    res.json(404).json(err);
  }
};

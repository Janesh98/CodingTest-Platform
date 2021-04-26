const submitCode = require('../services/CodeService');

exports.executeCode = (req, res) => {
  const code = req.body.data.code;
  const language = req.body.data.language;
  const stdin = req.body.data.stdin;

  submitCode(code, language, stdin)
    .then((output) => {
      const data = output.data;

      return res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        data: err,
      });
    });
};

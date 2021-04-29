const CodeService = require('../services/CodeService');

exports.executeCode = async (req, res) => {
  const code = req.body.data.code;
  const language = req.body.data.language;
  const stdin = req.body.data.stdin;

  CodeService.submitCode(code, language, stdin)
    .then((output) => {
      const data = output.data;

      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        data: err,
      });
    });
};

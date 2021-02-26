const submitCode = async (code, languageId, stdin = '') => {
  // Lazy load axios to reduce unecessary memory usage
  const axios = require('axios').default;

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'true', wait: 'true' },
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '671207b829msh7bf3336d5f94edbp13fecbjsn452157ddab57',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      language_id: languageId,
      source_code: code,
      stdin: stdin,
    },
  };

  return await axios.request(options);
};

exports.executeCode = (req, res) => {
  const code = req.body.data.code;
  const language = req.body.data.language;
  const stdin = req.body.data.stdin;

  // judge0 api id to refer to programming language
  languageId = 71;
  switch (language) {
    case 'python':
      languageId = 71;
      break;
    case 'java':
      languageId = 62;
      break;
    case 'javascript':
      languageId = 63;
      break;
    default:
      console.log(`Language '${language}' is not supported`);
  }

  submitCode(code, languageId, stdin)
    .then((output) => {
      const data = output.data;

      return res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json({
        data: err,
      });
    });
};

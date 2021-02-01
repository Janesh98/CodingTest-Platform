const axios = require('axios').default;
const functions = require('firebase-functions');

const submitCode = async (code, stdin = '') => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'true', wait: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '671207b829msh7bf3336d5f94edbp13fecbjsn452157ddab57',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
    data: {
      language_id: 71,
      source_code: code,
      stdin: stdin,
    },
  };

  return await axios.request(options);
};

exports.executeCode = (req, res) => {
  const code = req.body.data.code;
  const language = req.body.data.language;

  const runtimeOpts = {
    timeoutSeconds: 10,
  };

  submitCode(code)
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

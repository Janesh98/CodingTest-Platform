const axios = require('axios').default;

class CodeService {
  static async submitCode(code, language, stdin = '') {
    // judge0 api id to refer to programming language
    let languageId;
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
        throw new Error(`Language '${language}' is not supported`);
    }

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
  }
}

module.exports = CodeService;

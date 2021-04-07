import { submission } from './endpoints';
import axios from 'axios';

// return code output after sending to api endpoint
export const addSubmission = async (data) => {
  // uses Judge0 api
  if (process.env.REACT_APP_ALT_RCE_API === 'true') {
    data = {
      data: {
        language: data.data.language,
        code: data.data.code,
        stdin: data.data.input,
      },
    };
    console.log(data);

    return await axios.post(submission, data);
  }
  // uses our custom solution api
  const job = await axios.post(submission, data);

  var output = await axios.get(`${submission}/${job.data.id}`);

  while (output?.data.state !== 'completed') {
    await new Promise((r) => setTimeout(r, 500));
    output = await axios.get(`${submission}/${job.data.id}`);
  }
  return output;
};

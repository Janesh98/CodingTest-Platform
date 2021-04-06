import { submission } from './endpoints';
import axios from 'axios';

export const addSubmission = async (data) => {
  if (process.env.REACT_APP_ALT_RCE_API === 'true') {
    data = {
      language: data.language,
      code: data.base64Code,
      stdin: data.base64Input,
    };
  }
  const job = await axios.post(submission, data);

  var output = await axios.get(`${submission}/${job.data.id}`);

  while (output?.data.state !== 'completed') {
    await new Promise((r) => setTimeout(r, 500));
    output = await axios.get(`${submission}/${job.data.id}`);
  }
  return output;
};

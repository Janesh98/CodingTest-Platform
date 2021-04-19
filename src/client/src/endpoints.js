const baseUrl =
  process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:5000/coding-test-platform/us-central1/api'
    : 'https://us-central1-coding-test-platform.cloudfunctions.net/api';

const rceBaseUrl = process.env.REACT_APP_RCE_API || 'http://localhost:8000';

export const submission =
  process.env.REACT_APP_ALT_RCE_API === 'false'
    ? `${rceBaseUrl}/submission`
    : `${baseUrl}/code`;
export const callCompany = `${baseUrl}/company/all`;
export const updateCompany = `${baseUrl}/company`;
export const callRegister = `${baseUrl}/register`;
export const checkRegister = `${baseUrl}/checkRegister`;
export const addTest = `${baseUrl}/test`;
export const addChallenge = `${baseUrl}/challenge`;
export const addQs = `${baseUrl}/questions`;
export const getTests = `${baseUrl}/tests`;
export const getParticipants = `${baseUrl}/getParticipants`;
export const getParticipantResults = `${baseUrl}/getParticipantResults`;
export const deleteTest = `${baseUrl}/delete`;
export const deleteUserData = `${baseUrl}/deleteUserData`;
export const updateChallenge = `${baseUrl}/updateChallenge`;
export const updateQuestions = `${baseUrl}/updateQuestions`;
export const sendEmail = `${baseUrl}/email`;
export const getChallenges = `${baseUrl}/challenges`;
export const getQuestions = `${baseUrl}/getQuestions`;
export const deleteChallenge = `${baseUrl}/deleteChallenge`;
export const deleteQuestions = `${baseUrl}/deleteQuestions`;
export const getCodingTest = `${baseUrl}/codingTest`;
export const submitCodingTest = `${baseUrl}/codingTest/submit`;

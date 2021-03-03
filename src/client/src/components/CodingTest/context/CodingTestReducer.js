export const CodingTestReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CODE_OUTPUT':
      return {
        ...state,
        codeOutput: action.payload,
      };

    case 'UPDATE_TEST_RESULTS':
      return {
        ...state,
        testResults: action.payload,
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'UPDATE_CODING_TEST':
      return {
        ...state,
        codingTest: action.payload,
      };

    case 'UPDATE_CURRENT_CHALLENGE_INDEX':
      return {
        ...state,
        currentChallengeIndex: action.payload,
      };
    default:
      return state;
  }
};

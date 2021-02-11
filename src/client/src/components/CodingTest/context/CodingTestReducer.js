export const CodingTestReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CODE_OUTPUT':
      return {
        ...state,
        codeOutput: action.payload,
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

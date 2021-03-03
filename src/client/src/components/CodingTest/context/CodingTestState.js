import React, { createContext, useReducer } from 'react';
import { CodingTestReducer } from './CodingTestReducer';

// Initial State
const initialState = {
  codeOutput: [],
  language: 'Python',
  codingTest: null,
  currentChallengeIndex: 0,
};

// Create context
export const CodingTestContext = createContext(initialState);

// Provider component
export const CodingTestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CodingTestReducer, initialState);

  // Actions
  const updateCodeOutput = (output) => {
    dispatch({
      type: 'UPDATE_CODE_OUTPUT',
      payload: output,
    });
  };

  const updateLanguage = (language) => {
    dispatch({
      type: 'UPDATE_LANGUAGE',
      payload: language,
    });
  };

  const updateCodingTest = (codingTest) => {
    dispatch({
      type: 'UPDATE_CODING_TEST',
      payload: codingTest,
    });
  };

  const updateCurrentChallengeIndex = (currentChallengeIndex) => {
    dispatch({
      type: 'UPDATE_CURRENT_CHALLENGE_INDEX',
      payload: currentChallengeIndex,
    });
  };

  return (
    <CodingTestContext.Provider
      value={{
        codeOutput: state.codeOutput,
        language: state.language,
        codingTest: state.codingTest,
        currentChallengeIndex: state.currentChallengeIndex,
        updateCodeOutput,
        updateLanguage,
        updateCodingTest,
        updateCurrentChallengeIndex,
      }}
    >
      {children}
    </CodingTestContext.Provider>
  );
};

import React, { createContext, useReducer } from 'react';
import { CodingTestReducer } from './CodingTestReducer';

// Initial State
const initialState = {
  codeOutput: [],
  language: 'Python',
  codingTest: null,
  currentChallengeIndex: 0,
  testResults: [],
  code: '',
  currentQuestionIndex: 0,
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

  const updateTestResults = (testResultList) => {
    dispatch({
      type: 'UPDATE_TEST_RESULTS',
      payload: testResultList,
    });
  };

  const updateLanguage = (language) => {
    dispatch({
      type: 'UPDATE_LANGUAGE',
      payload: language,
    });
  };

  const updateCode = (code) => {
    dispatch({
      type: 'UPDATE_CODE',
      payload: code,
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

  const updateCurrentQuestionIndex = (currentQuestionIndex) => {
    dispatch({
      type: 'UPDATE_CURRENT_QUESTION_INDEX',
      payload: currentQuestionIndex,
    });
  };

  return (
    <CodingTestContext.Provider
      value={{
        codeOutput: state.codeOutput,
        language: state.language,
        codingTest: state.codingTest,
        currentChallengeIndex: state.currentChallengeIndex,
        currentQuestionIndex: state.currentQuestionIndex,
        testResults: state.testResults,
        code: state.code,
        updateCodeOutput,
        updateLanguage,
        updateCodingTest,
        updateCurrentChallengeIndex,
        updateCurrentQuestionIndex,
        updateTestResults,
        updateCode,
      }}
    >
      {children}
    </CodingTestContext.Provider>
  );
};

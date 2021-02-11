import React, { createContext, useReducer } from 'react';
import { CodingTestReducer } from './CodingTestReducer';

// Initial State
const initialState = {
  codeOutput: {},
  language: 'Python',
};

// Create context
export const CodingTestContext = createContext(initialState);

// Provider component
export const CodingTestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CodingTestReducer, initialState);

  // Actions
  const updateCodeOuput = (output) => {
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

  return (
    <CodingTestContext.Provider
      value={{
        codeOutput: state.codeOutput,
        language: state.language,
        updateCodeOuput,
        updateLanguage,
      }}
    >
      {children}
    </CodingTestContext.Provider>
  );
};

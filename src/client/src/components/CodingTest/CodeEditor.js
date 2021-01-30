import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');

  return (
    <div>
      <Editor
        height="60vh"
        defaultLanguage={language}
        theme="vs-dark"
        onChange={(value, event) => setCode(value)}
      />
    </div>
  );
};

export default CodeEditor;

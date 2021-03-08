import React, { useContext } from 'react';
import Editor from '@monaco-editor/react';
import {
  makeStyles,
  Paper,
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { executeCode } from '../../endpoints';
import { CodingTestContext } from './context/CodingTestState';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
  },
  run: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: theme.palette.success.contrastText,
    height: '4%',
  },
}));

const CodeEditor = () => {
  const classes = useStyles();
  const {
    language,
    updateCodeOutput,
    codingTest,
    currentChallengeIndex,
    updateTestResults,
    code,
    updateCode,
  } = useContext(CodingTestContext);

  // saves code to global memory
  const saveCodeProgress = () => {
    codingTest.challenges[currentChallengeIndex].code = code;
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    saveCodeProgress();

    const codeOutputList = [];
    const testResults = [];
    // encode to base64 string
    const base64Code = btoa(code);
    codingTest.challenges[currentChallengeIndex].testCases.map(
      async (test, i) => {
        const base64Stdin = btoa(test.input);
        const output = await executeCode({
          language: language.toLowerCase(),
          code: base64Code,
          stdin: base64Stdin,
        });

        codeOutputList[i] = output.data;

        var testResult = false;
        if (
          output.data.stdout !== null &&
          atob(output.data.stdout).trim() === test.output
        ) {
          testResult = true;
        }

        testResults[i] = testResult;
      }
    );
    updateCodeOutput(codeOutputList);
    updateTestResults(testResults);
  };

  return (
    <>
      <div>
        <Editor
          height="61vh"
          // default language only checked once on intial load
          defaultLanguage={language.toLowerCase()}
          language={language.toLowerCase()}
          theme="vs-dark"
          onChange={(value, event) => updateCode(value)}
          value={code}
        />
      </div>
      <Paper square className={classes.run}>
        <Container align="right">
          <Button
            disableElevation={true}
            variant="contained"
            type="submit"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<CodeIcon />}
            onClick={(e) => handleSubmitCode(e)}
          >
            <Typography variant="button">Run Code</Typography>
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default CodeEditor;

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
import { CodingTestContext } from './context/CodingTestState';
import { addSubmission } from '../../codeExecutionEndpoint';

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

  const saveResults = (codeOutput, testResults) => {
    codingTest.challenges[currentChallengeIndex].codeOutput = codeOutput;
    codingTest.challenges[currentChallengeIndex].testResults = testResults;
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
        const base64Input = btoa(test.input);
        const output = await addSubmission({
          data: {
            language: language.toLowerCase(),
            code: base64Code,
            input: base64Input,
          },
        });

        codeOutputList[i] = output.data.data;

        var testResult = false;
        if (
          output.data.data.stdout !== null &&
          atob(output.data.data.stdout).trim() === test.output
        ) {
          testResult = true;
        }

        testResults[i] = testResult;
      }
    );
    updateCodeOutput(codeOutputList);
    updateTestResults(testResults);
    saveResults(codeOutputList, testResults);
  };

  return (
    <>
      <div data-testid="editor">
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
            data-testid="submit"
          >
            <Typography variant="button">Run Code</Typography>
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default CodeEditor;

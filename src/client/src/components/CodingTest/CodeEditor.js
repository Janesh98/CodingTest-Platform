import React, { useState, useContext } from 'react';
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
  const [code, setCode] = useState('');
  const classes = useStyles();
  const { language, updateCodeOuput, codingTest } = useContext(
    CodingTestContext
  );

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    // encode to base64 string
    const base64Code = btoa(code);
    const base64Stdin = btoa(codingTest.challenges[0].testInput1);
    const output = await executeCode({
      language: language.toLowerCase(),
      code: base64Code,
      stdin: base64Stdin,
    });

    updateCodeOuput(output.data);
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
          onChange={(value, event) => setCode(value)}
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

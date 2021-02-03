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
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const classes = useStyles();
  const { updateCodeOuput } = useContext(CodingTestContext);

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    // encode to base64 string
    const encodedString = btoa(code);
    const output = await executeCode({
      language: language,
      code: encodedString,
    });
    // decode from base64 string
    const decodedString = atob(output.data.stdout);
    // set code execution output
    updateCodeOuput(decodedString);
  };

  return (
    <>
      <div>
        <Editor
          height="61vh"
          defaultLanguage={language}
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
            <Typography variant="button">Run</Typography>
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default CodeEditor;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Problem from './Problem';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { CodingTestProvider } from './context/CodingTestState';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '0px',
  },
  problem: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: theme.palette.success.contrastText,
    height: '100%',
  },
  terminal: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: theme.palette.success.contrastText,
    height: '35%',
  },
  run: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: theme.palette.success.contrastText,
    height: '4%',
  },
}));

export default function CodingTest() {
  const classes = useStyles();

  return (
    <CodingTestProvider>
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={5}>
          <Paper square className={classes.problem}>
            <Problem />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CodeEditor />
          <Paper square className={classes.terminal}>
            <Terminal />
          </Paper>
        </Grid>
      </Grid>
    </CodingTestProvider>
  );
}

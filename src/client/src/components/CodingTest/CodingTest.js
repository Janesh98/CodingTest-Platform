import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Problem from './Problem';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { CodingTestProvider } from './context/CodingTestState';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '0px',
  },
  problem: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: '#1d1d1d',
    height: '100%',
  },
  terminal: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: '#1d1d1d',
    height: '30.6%',
  },
}));

export default function CodingTest() {
  const classes = useStyles();

  return (
    <CodingTestProvider>
      <Grid
        container
        className={classes.root}
        style={{ backgroundColor: '#1d1d1d' }}
        spacing={0}
        data-testid="coding-test-grid"
      >
        <Grid item xs={12} sm={12}>
          <Header />
        </Grid>
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

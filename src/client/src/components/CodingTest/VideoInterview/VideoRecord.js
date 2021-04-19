import React from 'react';
import Questions from './Questions'
import { CodingTestProvider } from '../context/CodingTestState';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Camera from './Camera';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '0px',
  },

  problem: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background:"#1d1d1d",
    height: '100%',
  },
  terminal: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: "#1d1d1d",
    height: '100%',
  },
}));

const VideoRecord = () => {
  const classes = useStyles();

  return (
    <CodingTestProvider>
      <Grid container direction={"column"} style={{ "backgroundColor": "#1d1d1d" }} spacing={0}>
      <Grid item>
        <Grid item xs={12} sm={12}>
        <Header />
        </Grid>
          <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper square className={classes.problem}>
            <Questions />
          </Paper>
        </Grid>
          <Grid item xs={12} sm={6}>
              <Paper square className={classes.terminal}>
                <Camera />
             </Paper>
          </Grid>
      </Grid>
      </Grid>
      </Grid>
     </CodingTestProvider>
  );
}

export default VideoRecord;
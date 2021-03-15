import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCodingTest } from '../../../endpoints';
import { CodingTestContext } from '../context/CodingTestState';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  description: {
    overflow: 'auto',
    maxHeight: '87vh',
  },
}));

const Questions = () => {
  const { codingTestId, participantId } = useParams();
  const {
    updateCodingTest,
    codingTest,
    currentQuestionIndex,
  } = useContext(CodingTestContext);
  const classes = useStyles();

//  const saveProgress = () => {
//    const ct = codingTest.questions[0][currentQuestionIndex];
//   // ct.questionAnswers = questionAnswers;
//  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCodingTest(codingTestId, participantId);
        updateCodingTest(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    return fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProgress = (index) => {
    const ct = codingTest.challenges[index];

  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
        </AppBar>
        <Typography>
         {codingTest !== null ? codingTest.questions[0]['question' + currentQuestionIndex] : ''}
         </Typography>
      </div>
    </>
  );
};

export default Questions;

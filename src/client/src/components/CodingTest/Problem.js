import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCodingTest } from '../../endpoints';
import { CodingTestContext } from './context/CodingTestState';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  description: {
    overflow: 'auto',
    maxHeight: '87vh',
  },
}));

const Problem = () => {
  const { id } = useParams();
  const { updateCodingTest, codingTest } = useContext(CodingTestContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCodingTest(id);
        updateCodingTest(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    return fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseProblemDescription = () => {
    const ct = codingTest.challenges[0];
    let s = '';
    for (const [key, value] of Object.entries(ct)) {
      s += `${key}\n${value}\n\n`;
    }

    return s;
  };

  return (
    <Box p={3} className={classes.description}>
      <Typography align="left" style={{ whiteSpace: 'pre-line' }}>
        {codingTest !== null ? parseProblemDescription() : ''}
      </Typography>
    </Box>
  );
};

export default Problem;

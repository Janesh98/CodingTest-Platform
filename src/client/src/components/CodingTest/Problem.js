import { Box, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Problem = () => {
  const [problem, setProblem] = useState('');

  useEffect(() => {
    setProblem(
      'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.'
    );
  }, []);

  return (
    <Box p={3}>
      <div id="problem-description">
        <Typography align="left" style={{ whiteSpace: 'pre-line' }}>
          {problem}
        </Typography>
      </div>
    </Box>
  );
};

export default Problem;

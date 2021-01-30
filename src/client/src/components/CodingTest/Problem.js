import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Problem = () => {
  const [problem, setProblem] = useState('');

  useEffect(() => {
    setProblem(
      "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1."
    );
  }, []);

  return (
    <Container>
      <Typography>{problem}</Typography>
    </Container>
  );
};

export default Problem;

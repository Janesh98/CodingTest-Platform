import React, { useContext } from 'react';
import { Container, Typography } from '@material-ui/core';
import { CodingTestContext } from './context/CodingTestState';

const Terminal = () => {
  const { codeOutput } = useContext(CodingTestContext);

  return (
    <div>
      <Container>
        <Typography
          align="left"
          variant="body1"
          gutterBottom={true}
          style={{ whiteSpace: 'pre-line' }}
        >
          {codeOutput}
        </Typography>
      </Container>
    </div>
  );
};

export default Terminal;

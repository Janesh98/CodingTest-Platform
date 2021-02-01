import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

const Terminal = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput('True\nFalse');
  }, []);

  return (
    <div>
      <Container>
        <Typography
          align="left"
          variant="body1"
          gutterBottom={true}
          style={{ whiteSpace: 'pre-line' }}
        >
          {output}
        </Typography>
      </Container>
    </div>
  );
};

export default Terminal;

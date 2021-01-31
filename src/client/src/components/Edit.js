import React from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './css/Edit.css';

export default function Edit() {
  return (
    <Container>
    <NavBar/>
    <div id="edit-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5">
              Edit Existing Coding Test
              </Typography>
              </div>
              </Container>
        </Grid>
      </div>
  
    </Container>
  );
};
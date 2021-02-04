import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './css/Create.css';
import NavBar from './Navbar';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Create(){
    const history = useHistory();

    const handleOnClick = async (e) => {
        try {
          e.preventDefault();
          history.push('/setup');
        } catch {
          console.log('error');
        }
      };

    return(
        <Container>
            <NavBar/>
            <div id="create-container">
               <Grid container align="center" justify="center" direction="column">
                  <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                     New Coding Test Name
                    </Typography>
                    <TextField
                     variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Coding test name"
                      placeholder="Coding test name'"
                      name="name"
                      autoComplete="name"
                      autoFocus
                    />
                    <Button
                    id = "save-challenge"
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<ArrowForwardIcon />}
                    onClick={(e) => handleOnClick(e)}
                    >
                    Continue to Setup
                    </Button>
                  </Container>
                </Grid>
            </div>
        </Container>
    );
};

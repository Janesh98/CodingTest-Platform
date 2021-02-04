import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './css/Setup.css';
import NavBar from './Navbar';
import Card from "./Card"
import { useHistory } from 'react-router-dom';


export default function Setup() {
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

    const handleOnClickExit = async (e) => {
        try {
          e.preventDefault();
          history.push('/');
        } catch {
          console.log('error');
        }
      };
  
  return (
    <Container>
      <NavBar/>
    <div id="setup-container" style={{marginTop: 80}}>
      <Grid container align="center" justify="center" direction="column">
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h3" variant="h5">
              Setup A New Coding Test
            </Typography>
          </div>
          <Card/>
          <form>
            <Typography component="h10" variant="h10">
              Challenge Title 
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title E.g. 'FizzBuzz'"
                placeholder="Title E.g. 'FizzBuzz'"
                name="title"
                autoComplete="title"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Problem Description
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {3}
                id="problem description"
                label="Problem Description"
                placeholder="Problem Description of Challenge"
                name="problem description"
                autoComplete="problem description"
              />
              <Typography component="h10" variant="h10">
                Input Format
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="input format"
                label="Input Format"
                placeholder="Input Format"
                name="input format"
                autoComplete="input format"
              />
            
              <Typography component="h10" variant="h10">
                Return Format
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="return format"
                label="Return Format"
                placeholder="Return Format"
                name="return format"
                autoComplete="return format"
              />
              <Typography component="h10" variant="h10">
                Constraints
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {2}
                id= "constraints"
                label="Constraints"
                placeholder="Constraints"
                name="constraints"
                autoComplete="constraints"
              />
              <Typography component="h10" variant="h10">
                Sample Input 
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample input"
                label="Sample Input"
                placeholder="Sample Input"
                name="sample input"
                autoComplete="sample input"
              />
              <Typography component="h10" variant="h10">
                Sample Output 
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample output"
                label="Sample Output"
                placeholder="Sample Output"
                name="sample output"
                autoComplete="sample output"
              />
              <Typography component="h10" variant="h10">
                Example with Explanation  
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {2}
                id="example with explanation"
                label="Example with Explanation"
                placeholder="Example with Explanation"
                name="example with explanation"
                autoComplete="example with explanation"
              />
              <Typography component="h10" variant="h10">
                Test Cases (Please provide at least 1 test case)  
              </Typography>
               <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 id="test input 1"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 autoComplete="Input"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 id="test output 1"
                 label="Expected Output"
                 placeholder="Expected Output"
                 name="Output"
                 autoComplete="Output"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 2"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 autoComplete="Input"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 2"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 autoComplete="Output"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 3"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 autoComplete="Input"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 3"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 autoComplete="Output"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 4"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 autoComplete="Input"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 4"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 autoComplete="Output"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 5"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 autoComplete="Input"
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 5"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 autoComplete="Output"
               />
              <Button
                id = "save-challenge"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={refreshPage}
                >
                  Save Challenge 
                </Button>
                <Button
                id = "save-challenge"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<ExitToAppIcon />}
                onClick={(e) => handleOnClickExit(e)}
                >
                  Save Challenge and Exit
                </Button>
          </form>
        </Container>
      </Grid>
    </div>
    </Container>
  );
};

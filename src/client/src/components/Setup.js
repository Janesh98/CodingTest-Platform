import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './css/Setup.css';
import NavBar from './Navbar';
import Card from "./Card"
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { addChallenge } from '../endpoints';


const Setup = () => {
  const [title, setTitle] = useState('');
  const [probDesc, setProbDesc] = useState('');
  const [inFormat, setInFormat] = useState('');
  const [returnFormat, setReturnFormat] = useState('');
  const [constraints, setConstraints] = useState('');
  const [sampleIn, setSampleIn] = useState('');
  const [sampleOut, setSampleOut] = useState('');
  const [exampleExplanation, setExampleExplanation] = useState('');
  const [testIn1, setTestIn1] = useState('');
  const [testOut1, setTestOut1] = useState('');
  const [testIn2, setTestIn2] = useState('');
  const [testOut2, setTestOut2] = useState('');
  const [testIn3, setTestIn3] = useState('');
  const [testOut3, setTestOut3] = useState('');
  const [testIn4, setTestIn4] = useState('');
  const [testOut4, setTestOut4] = useState('');
  const [testIn5, setTestIn5] = useState('');
  const [testOut5, setTestOut5] = useState('');
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();
  const testName = history.location.state.newTestName;

  function refreshPage() {
    window.location.reload(false);
  }

  const handleOnClickSave = async (e) => {
    e.preventDefault();
    if (title.length === 0 || probDesc.length === 0 || inFormat === 0) {
      setISError(true);
      return setError('All highlighted fields must not be empty');
    } else {
    await addChallenge({
      googleId: currentUser.uid,
      testName: testName,
      title: title,
      problemDescription: probDesc,
      inputFormat: inFormat,
      returnFormat: returnFormat,
      constraints: constraints,
      sampleInput: sampleIn,
      sampleOutput: sampleOut,
      exampleExplanation: exampleExplanation,
      testInput1: testIn1,
      testOutput1: testOut1,
      testInput2: testIn2,
      testOutput2: testOut2,
      testInput3: testIn3,
      testOutput3: testOut3,
      testInput4: testIn4,
      testOutput4: testOut4,
      testInput5: testIn5,
      testOutput5: testOut5,
      });
    return refreshPage();
    }
    };

  const handleOnClickContinue = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/questions',
        state:{ newTestName : testName}});
    } catch {
      console.log('error');
    }
  };

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
    <div id="setup-container" style={{marginTop: 200}}>
      <Grid container align="center" justify="center" direction="column">
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h3" variant="h5">
              Setup A New Coding Test
            </Typography>
          </div>
          <Card/>
          <form>
            <Typography component="h10">
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
                autoFocus
                error={isError}
                helperText={error}
                onChange={(input) => setTitle(input.target.value)}
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}
                onChange={(input) => setProbDesc(input.target.value)}
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}
                onChange={(input) => setInFormat(input.target.value)}
              />
            
              <Typography component="h10">
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
                error={isError}
                helperText={error}
                onChange={(input) => setReturnFormat(input.target.value)}
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}    
                onChange={(input) => setConstraints(input.target.value)}
                
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}             
                onChange={(input) => setSampleIn(input.target.value)}
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}          
                onChange={(input) => setSampleOut(input.target.value)}
              />
              <Typography component="h10">
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
                error={isError}
                helperText={error}            
                onChange={(input) => setExampleExplanation(input.target.value)}
              />
              <Typography component="h10">
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
                 error={isError}
                 helperText={error}
                 onChange={(input) => setTestIn1(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 id="test output 1"
                 label="Expected Output"
                 placeholder="Expected Output"
                 name="Output"       
                 error={isError}
                 helperText={error}      
                 onChange={(input) => setTestOut1(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 2"
                 label="Input"
                 placeholder="Input"
                 name="Input"              
                 onChange={(input) => setTestIn2(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 2"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"             
                 onChange={(input) => setTestOut2(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 3"
                 label="Input"
                 placeholder="Input"
                 name="Input"          
                 onChange={(input) => setTestIn3(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 3"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 onChange={(input) => setTestOut3(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 4"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 onChange={(input) => setTestIn4(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 4"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 onChange={(input) => setTestOut4(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test input 5"
                 label="Input"
                 placeholder="Input"
                 name="Input"
                 onChange={(input) => setTestIn5(input.target.value)}
               />
               <TextField
                 variant="outlined"
                 margin="normal"
                 id="test output 5"
                 label="Expected Output"
                 placeholder=" Expected Output"
                 name="Output"
                 onChange={(input) => setTestOut5(input.target.value)}
               />
              <Button
                id = "save-challenge"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={(e) => handleOnClickSave(e)}
                >
                  Save Challenge 
                </Button>
                <Button
                id = "continue"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<ArrowForwardIcon />}
                onClick={(e) => handleOnClickContinue(e)}
                >
                  Continue 
                </Button>
                <Button
                id = "exit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ExitToAppIcon />}
                onClick={(e) => handleOnClickExit(e)}
                >
                  Exit
                </Button>
          </form>
        </Container>
      </Grid>
    </div>
    </Container>
  );
};

export default Setup;
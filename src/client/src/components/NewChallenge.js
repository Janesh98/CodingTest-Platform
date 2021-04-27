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
import Card from './Card';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { addChallenge } from '../endpoints';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const NewChallenge = () => {
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
  const [testIn6, setTestIn6] = useState('');
  const [testOut6, setTestOut6] = useState('');
  const [testIn7, setTestIn7] = useState('');
  const [testOut7, setTestOut7] = useState('');
  const [testIn8, setTestIn8] = useState('');
  const [testOut8, setTestOut8] = useState('');
  const [testIn9, setTestIn9] = useState('');
  const [testOut9, setTestOut9] = useState('');
  const [testIn10, setTestIn10] = useState('');
  const [testOut10, setTestOut10] = useState('');
  const [testCase2, setTestCase2] = useState(false);
  const [testCase3, setTestCase3] = useState(false);
  const [testCase4, setTestCase4] = useState(false);
  const [testCase5, setTestCase5] = useState(false);
  const [testCase6, setTestCase6] = useState(false);
  const [testCase7, setTestCase7] = useState(false);
  const [testCase8, setTestCase8] = useState(false);
  const [testCase9, setTestCase9] = useState(false);
  const [testCase10, setTestCase10] = useState(false);
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();
  const testName = history.location.state.newTestName;

  const handleOnClickSave = async (e) => {
    e.preventDefault();
    if (title.length === 0 || probDesc.length === 0 || inFormat === 0) {
      setISError(true);
      return setError('All highlighted fields must not be empty');
    } else {
      await axios.post(addChallenge, {
        data: {
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
          testInput6: testIn6,
          testOutput6: testOut6,
          testInput7: testIn7,
          testOutput7: testOut7,
          testInput8: testIn8,
          testOutput8: testOut8,
          testInput9: testIn9,
          testOutput9: testOut9,
          testInput10: testIn10,
          testOutput10: testOut10,
        },
      });
      history.push({
        pathname: '/edittest',
        state: { testName: testName },
      });
    }
  };

  const handleOnClickFab = async (e) => {
    try {
      e.preventDefault();
      setTestCase2(true);
      if(testCase9){
        setTestCase10(true);
      }
      if(testCase8){
        setTestCase9(true);
      }
      if(testCase7){
        setTestCase8(true);
      }
      if(testCase6){
        setTestCase7(true);
      }
      if(testCase5){
        setTestCase6(true);
      }
      if(testCase4){
        setTestCase5(true);
      }
      if(testCase3){
        setTestCase4(true);
      }
      if(testCase2){
        setTestCase3(true);
      }
      
    } catch {
      console.log('error');
    }
  };

  const handleOnClickFabRemove = async (e) => {
    try {
      e.preventDefault();
      if(testCase10){
        setTestCase10(false);
        setTestIn10("");
        setTestOut10("");
      }else if(testCase9){
        setTestCase9(false);
        setTestIn9("");
        setTestOut9("");
      }else if(testCase8){
        setTestCase8(false);
        setTestIn8("");
        setTestOut8("");
      }else if(testCase7){
        setTestCase7(false);
        setTestIn7("");
        setTestOut7("");
      }else if(testCase6){
        setTestCase6(false);
        setTestIn6("");
        setTestOut6("");
      }else if(testCase5){
        setTestCase5(false);
        setTestIn5("");
        setTestOut5("");
      }else if(testCase4){
        setTestCase4(false);
        setTestIn4("");
        setTestOut4("");
      }else if(testCase3){
        setTestCase3(false);
        setTestIn3("");
        setTestOut3("");
      }else if(testCase2){
        setTestCase2(false);
        setTestIn2("");
        setTestOut2("");
      }
    } catch {
      console.log('error');
    }
  };

  const handleOnClickCancel = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/edittest',
        state: { testName: testName },
      });
    } catch {
      console.log('error');
    }
  };

  return (
    <Container>
      <NavBar />
      <form id="challenge-form">
        <Grid container align="center" justify="center" style={{marginTop: '75px'}} spacing={5} direction="row" data-testid="setup-grid"> 
          <Grid item xs={12}>
              <Typography component="h3" variant="h5">
                Setup A New Coding Test
              </Typography>
            <Card />
          </Grid>
              <Grid item xs={6}>
              <Typography component="h1">Challenge Title</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                refs="title"
                label="Title E.g. 'FizzBuzz'"
                placeholder="Title E.g. 'FizzBuzz'"
                name="title"
                autoFocus
                error={isError}
                helperText={error}
                onChange={(input) => setTitle(input.target.value)}
              />
              <Typography component="h1" data-testid = "Problem Description typography">Problem Description</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={3}
                id="problem description"
                inputProps={{ "data-testid": "Problem Description" }}
                aria-label="Problem Description"
                placeholder="Problem Description of Challenge"
                name="problem description"
                error={isError}
                helperText={error}
                onChange={(input) => setProbDesc(input.target.value)}
              />
              <Typography component="h1" data-testid = "Input Format typography">Input Format</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="input format"
                inputProps={{ "data-testid": "Input Format" }}
                aria-label="Input Format"
                placeholder="Input Format"
                name="input format"
                error={isError}
                helperText={error}
                onChange={(input) => setInFormat(input.target.value)}
              />

              <Typography component="h1" data-testid = "Return Format typography">Return Format</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="return format"
                inputProps={{ "data-testid": "Return Format" }}
                aria-label="Return Format"
                placeholder="Return Format"
                name="return format"
                error={isError}
                helperText={error}
                onChange={(input) => setReturnFormat(input.target.value)}
              />
              <Typography component="h1" data-testid = "Constraints typography">Constraints</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                id="constraints"
                inputProps={{ "data-testid": "Constraints" }}
                aria-label="Constraints"
                placeholder="Constraints"
                name="constraints"
                error={isError}
                helperText={error}
                onChange={(input) => setConstraints(input.target.value)}
              />
              <Typography component="h1" data-testid = "Sample Input typography">Sample Input</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample input"
                inputProps={{ "data-testid": "Sample Input" }}
                aria-label="Sample Input"
                placeholder="Sample Input"
                name="sample input"
                error={isError}
                helperText={error}
                onChange={(input) => setSampleIn(input.target.value)}
              />
              <Typography component="h1" data-testid = "Sample Output typography">Sample Output</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample output"
                inputProps={{ "data-testid": "Sample Output" }}
                aria-label="Sample Output"
                placeholder="Sample Output"
                name="sample output"
                error={isError}
                helperText={error}
                onChange={(input) => setSampleOut(input.target.value)}
              />
              <Typography component="h1" data-testid = "Example with Explanation typography">Example with Explanation</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={2}
                id="example with explanation"
                inputProps={{ "data-testid": "Example with Explanation" }}
                aria-label="Example with Explanation"
                placeholder="Example with Explanation"
                name="example with explanation"
                error={isError}
                helperText={error}
                onChange={(input) => setExampleExplanation(input.target.value)}
              />
             
              </Grid>
              <Grid item xs={6}>
                <Grid container align="center" justify="center" style={{marginTop: '75px'}}  direction="column">
                  <Grid item xs={12}>
              <Typography component="h1">
                Test Cases (Please provide at least 1 test case)
              </Typography>
              </Grid>
              <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                style={{marginRight: '20px'}}
                id="test input 1"
                aria-label="Input"
                inputProps={{ "data-testid": "test input 1" }}
                placeholder="Input"
                name="Input"
                error={isError}
                helperText={error}
                onChange={(input) => setTestIn1(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 1"
                inputProps={{ "data-testid": "test output 1" }}
                aria-label="Expected Output"
                placeholder="Expected Output"
                name="Output"
                error={isError}
                helperText={error}
                onChange={(input) => setTestOut1(input.target.value)}
              />
              </Grid>
              {testCase2 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 2"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 2" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn2(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 2"
                inputProps={{ "data-testid": "test output 2" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut2(input.target.value)}
              />
              </Grid> : ''}
              {testCase3 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 3"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 3" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn3(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 3"
                inputProps={{ "data-testid": "test output 3" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut3(input.target.value)}
              />
              </Grid> : '' }
              {testCase4 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 4"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 4" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn4(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 4"
                inputProps={{ "data-testid": "test output 4" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut4(input.target.value)}
              /> 
              </Grid> : '' }
              {testCase5 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 5"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 5" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn5(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 5"
                inputProps={{ "data-testid": "test output 5" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut5(input.target.value)}
              />
              </Grid> : ''}
              {testCase6 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 6"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 6" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn6(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 6"
                inputProps={{ "data-testid": "test output 6" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut6(input.target.value)}
              />
              </Grid> : ''}
              {testCase7 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 7"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 7" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn7(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 7"
                inputProps={{ "data-testid": "test output 7" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut7(input.target.value)}
              />
              </Grid> : ''}
              {testCase8 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 8"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 8" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn8(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 8"
                inputProps={{ "data-testid": "test output 8" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut8(input.target.value)}
              />
              </Grid> : ''}
              {testCase9 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 9"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 9" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn9(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 9"
                inputProps={{ "data-testid": "test output 9" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut9(input.target.value)}
              />
              </Grid> : ''}
              {testCase10 ? <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 10"
                style={{marginRight: '20px'}}
                inputProps={{ "data-testid": "test input 10" }}
                label="Input"
                placeholder="Input"
                name="Input"
                onChange={(input) => setTestIn10(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test output 6"
                inputProps={{ "data-testid": "test output 10" }}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut10(input.target.value)}
              />
              </Grid> : ''}
              <Grid item xs={12}>
              <Fab color="primary" aria-label="add" data-testid="add" disabled={testCase10} onClick={(e) => handleOnClickFab(e)}>
                  <AddIcon />
              </Fab>
              <Fab color="secondary" aria-label="remove" data-testid="remove" disabled={!testCase2} onClick={(e) => handleOnClickFabRemove(e)}>
                  <RemoveIcon />
              </Fab>
              </Grid>
              </Grid>
              </Grid>
              <Container maxWidth= 'xs'>
              <Button
                id="save-challenge"
                data-testid="save"
                variant="contained"
                color="primary"
                size="large"
                style={{marginRight: '10px'}}
                startIcon={<SaveIcon />}
                onClick={(e) => handleOnClickSave(e)}
              >
                Save Challenge
              </Button>
              <Button
                id="exit"
                data-testid="exit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<ExitToAppIcon />}
                onClick={(e) => handleOnClickCancel(e)}
              >
                Cancel
              </Button>
          </Container>
        </Grid>
        </form>
    </Container>
  );
};

export default NewChallenge;

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
import { updateChallenge } from '../endpoints';
import axios from 'axios';

const EditChallenge = () => {
  const history = useHistory();
  const index = history.location.state.index;
  const TestName = history.location.state.testName;
  const challengeData = history.location.state.challengeData;
  const [title, setTitle] = useState(challengeData[index].title);
  const [probDesc, setProbDesc] = useState(
    challengeData[index].problemDescription
  );
  const [inFormat, setInFormat] = useState(challengeData[index].inputFormat);
  const [returnFormat, setReturnFormat] = useState(
    challengeData[index].returnFormat
  );
  const [constraints, setConstraints] = useState(
    challengeData[index].constraints
  );
  const [sampleIn, setSampleIn] = useState(challengeData[index].sampleInput);
  const [sampleOut, setSampleOut] = useState(challengeData[index].sampleOutput);
  const [exampleExplanation, setExampleExplanation] = useState(
    challengeData[index].exampleExplanation
  );
  const [testIn1, setTestIn1] = useState(challengeData[index].testInput1);
  const [testOut1, setTestOut1] = useState(challengeData[index].testOutput1);
  const [testIn2, setTestIn2] = useState(challengeData[index].testInput2);
  const [testOut2, setTestOut2] = useState(challengeData[index].testOutput2);
  const [testIn3, setTestIn3] = useState(challengeData[index].testInput3);
  const [testOut3, setTestOut3] = useState(challengeData[index].testOutput3);
  const [testIn4, setTestIn4] = useState(challengeData[index].testInput4);
  const [testOut4, setTestOut4] = useState(challengeData[index].testOutput4);
  const [testIn5, setTestIn5] = useState(challengeData[index].testInput5);
  const [testOut5, setTestOut5] = useState(challengeData[index].testOutput5);
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const { currentUser } = useAuth();

  const handleOnClickSave = async (e) => {
    e.preventDefault();
    if (title.length === 0 || probDesc.length === 0 || inFormat === 0) {
      setISError(true);
      return setError('All highlighted fields must not be empty');
    } else {
      await axios.post(updateChallenge, {
        data: {
          _id: challengeData[index]._id,
          googleId: currentUser.uid,
          testName: TestName,
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
        },
      });
      history.push({
        pathname: '/edittest',
        state: { TestName: TestName },
      });
    }
  };

  const handleOnClickExit = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/edittest',
        state: { TestName: TestName },
      });
    } catch {
      console.log('error');
    }
  };
  return (
    <Container>
      <NavBar />
      <div id="setup-container" data-testid = "setup-container" style={{ marginTop: 200 }}>
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h3" variant="h5">
                Setup A New Coding Test
              </Typography>
            </div>
            <Card />
            <form>
              <Typography component="h1">Challenge Title</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title E.g. 'FizzBuzz'"
                placeholder="Title E.g. 'FizzBuzz'"
                defaultValue={challengeData[index].title}
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
                defaultValue={challengeData[index].problemDescription}
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
                defaultValue={challengeData[index].inputFormat}
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
                defaultValue={challengeData[index].returnFormat}
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
                defaultValue={challengeData[index].constraints}
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
                defaultValue={challengeData[index].sampleInput}
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
                defaultValue={challengeData[index].sampleOutput}
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
                defaultValue={challengeData[index].exampleExplanation}
                aria-label="Example with Explanation"
                placeholder="Example with Explanation"
                name="example with explanation"
                error={isError}
                helperText={error}
                onChange={(input) => setExampleExplanation(input.target.value)}
              />
              <Typography component="h1">
                Test Cases (Please provide at least 1 test case)
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="test input 1"
                inputProps={{ "data-testid": "test input 1" }}
                defaultValue={challengeData[index].testInput1}
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
                inputProps={{ "data-testid": "test output 1" }}
                defaultValue={challengeData[index].testOutput1}
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
                inputProps={{ "data-testid": "test input 2" }}
                defaultValue={challengeData[index].testInput2}
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
                defaultValue={challengeData[index].testOutput2}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut2(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 3"
                inputProps={{ "data-testid": "test input 3" }}
                defaultValue={challengeData[index].testInput3}
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
                defaultValue={challengeData[index].testOutput3}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut3(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 4"
                inputProps={{ "data-testid": "test input 4" }}
                defaultValue={challengeData[index].testInput4}
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
                defaultValue={challengeData[index].testOutput4}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut4(input.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="test input 5"
                inputProps={{ "data-testid": "test input 5" }}
                defaultValue={challengeData[index].testInput5}
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
                defaultValue={challengeData[index].testOutput5}
                label="Expected Output"
                placeholder=" Expected Output"
                name="Output"
                onChange={(input) => setTestOut5(input.target.value)}
              />
              <Button
                id="save-challenge"
                data-testid = "save"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={(e) => handleOnClickSave(e)}
              >
                Save Changes
              </Button>
              <Button
                id="exit"
                data-testid = "exit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<ExitToAppIcon />}
                onClick={(e) => handleOnClickExit(e)}
              >
                Cancel
              </Button>
            </form>
          </Container>
        </Grid>
      </div>
    </Container>
  );
};

export default EditChallenge;

import React, { useState } from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './css/Questions.css';
import { useHistory } from 'react-router-dom';
import { updateQuestions } from '../endpoints';
import axios from 'axios';

const EditQuestions = () => {
  const history = useHistory();
  const testName = history.location.state.testName;
  const questionsData = history.location.state.questionsData;
  const [question1, setQuestion1] = useState(questionsData[0].question1);
  const [question2, setQuestion2] = useState(questionsData[0].question2);
  const [question3, setQuestion3] = useState(questionsData[0].question3);

  const handleOnClickSave = async (e) => {
    e.preventDefault();
    await axios.post(updateQuestions, {
      data: {
        _id: questionsData[0]._id,
        question1: question1,
        question2: question2,
        question3: question3,
      },
    });
    history.push({
      pathname: '/edittest',
      state: { TestName: testName },
    });
  };

  const handleOnClickExit = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/edittest',
        state: { TestName: testName },
      });
    } catch {
      console.log('error');
    }
  };
  return (
    <Container>
      <NavBar />
      <div id="questions-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5">
                Video Interview Questions(optional)
              </Typography>
            </div>
            <form>
              <Typography component="h1">Question 1</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={2}
                id="question1"
                defaultValue={questionsData[0].question1}
                label="Question 1"
                placeholder="Question 1"
                name="question1"
                onChange={(input) => setQuestion1(input.target.value)}
              />
              <Typography component="h1">Question 2</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={2}
                id="question2"
                defaultValue={questionsData[0].question2}
                label="Question 2"
                placeholder="Question 2"
                name="question2"
                onChange={(input) => setQuestion2(input.target.value)}
              />
              <Typography component="h1">Question 3</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={2}
                id="question3"
                defaultValue={questionsData[0].question3}
                label="Question 3"
                placeholder="Question 3"
                name="question3"
                onChange={(input) => setQuestion3(input.target.value)}
              />
              <Button
                id="save"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={(e) => handleOnClickSave(e)}
              >
                Save and Exit
              </Button>
              <Button
                id="exit"
                variant="contained"
                color="primary"
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

export default EditQuestions;

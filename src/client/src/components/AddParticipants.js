import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './css/AddParticipants.css';
import NavBar from './Navbar';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmailIcon from '@material-ui/icons/Email';
import { sendEmail } from '../endpoints';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';

const AddParticipants = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isError, setISError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [expiryDate, setExpiryDate] = useState('2021-12-31T00:00:00Z');
  const history = useHistory();
  const TestName = history.location.state.testName;
  const id = history.location.state._id;
  const { currentUser } = useAuth();

  const isEmail = (email) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };

  const setEmailAndRemoveErrors = (email) => {
    setEmail(email);
    if (isError) {
      setISError(false);
      setError('');
    }
  };

  const setDate = (date) => {
    setExpiryDate(date + ":00Z");
    console.log(expiryDate);
  };

  const handleOnClickEmail = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setISError(true);
      return setError('Please enter a valid email');
    } else {
      await axios.post(sendEmail, {
        data: { email: email, _id: id, googleId: currentUser.uid, attemptedTest: false, expiryDate: expiryDate},
      });
      document.getElementById("email-form").reset();  
      setEmailSent(true)
    }
  };

  const handleOnClickExit = async (e) => {
    e.preventDefault();
    history.push({
      pathname: '/edittest',
      state: { testName: TestName, _id: id },
    });
  };

  return (
    <Container>
      <NavBar />
      <div id="add-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            {emailSent ? <Alert onClose={()=>{setEmailSent(false)}}>Email Invitation Sent!</Alert> : ''}
            <Typography component="h1" variant="h5">
              Send Participants Email Invitation
            </Typography>
            <form id='email-form'>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              aria-label="Email"
              inputProps={{ "data-testid": "Email" }}
              placeholder="Email"
              name="Email"
              autoFocus
              error={isError}
              helperText={error}
              onChange={(input) => setEmailAndRemoveErrors(input.target.value)}
            />
            <Typography component="h1" variant="h5">
              Date to complete test by:
            </Typography>
             <TextField
               id="date"
               label="Date"
               type="datetime-local"
               defaultValue="2021-12-31T00:00"
               style={{margin:"15px"}}
               InputLabelProps={{
                 shrink: true,
               }}
                onChange={(input) => setDate(input.target.value)}
               />
            <Button
              id="send-invitation"
              data-testid="send"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<EmailIcon />}
              onClick={(e) => handleOnClickEmail(e)}
            >
              Send Invitation
            </Button>
            <Button
              id="exit"
              data-testid="exit"
              variant="contained"
              color="secondary"
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

export default AddParticipants;

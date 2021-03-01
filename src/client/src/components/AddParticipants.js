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
import { sendEmail} from '../endpoints';


const AddParticipants = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isError, setISError] = useState(false);
    const history = useHistory();
    const TestName = history.location.state.testName;
    const id = history.location.state._id;

    function refreshPage() {
        window.location.reload(false);
      }

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

    const handleOnClickEmail = async (e) => {
      e.preventDefault();
      if (!isEmail(email)) {
        setISError(true);
        return setError('Please enter a valid email');
      } else {
        await sendEmail({
          email: email,
          _id: id
        });
        return refreshPage();
      }
      };

      const handleOnClickExit = async (e) => {
        e.preventDefault();
          history.push({
            pathname: '/edittest',
            state:{ TestName : TestName,
                    _id: id }});        
        };

    return(
        <Container>
            <NavBar/>
            <div id="add-container">
               <Grid container align="center" justify="center" direction="column">
                  <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                     Send Participants Email Invitation
                    </Typography>
                    <TextField
                     variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      placeholder="Email"
                      name="Email"
                      autoFocus
                      error={isError}
                      helperText={error}
                      onChange={(input) => setEmailAndRemoveErrors(input.target.value)}
                    />
                    <Button
                    id = "send-invitation"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<EmailIcon />}
                    onClick={(e) => handleOnClickEmail(e)}
                    >
                    Send Invitation
                    </Button>
                    <Button
                    id = "exit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<ExitToAppIcon />}
                    onClick={(e) => handleOnClickExit(e)}
                    >
                    Exit
                    </Button>
                  </Container>
                </Grid>
            </div>
        </Container>
    );
};

export default AddParticipants;

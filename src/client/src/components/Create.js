import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './css/Create.css';
import NavBar from './Navbar';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { addTest, getTests } from '../endpoints';
import { useAuth } from '../contexts/AuthContext';


const Create = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isError, setISError] = useState(false);
    const { currentUser } = useAuth();
    const [tests, setTests] = useState([]);
    const history = useHistory();

    useEffect(() => {
      const getUserTests = async () => {
        try {
          const res = await getTests({
            googleId: currentUser.uid,
          });
          setTests(res.data.map((item) => item.testName.toLowerCase()));
        } catch {
          console.log(
            'error in Create.js getting list of tests from backend api'
          );
        }
      };
  
      getUserTests();
    }, [currentUser.uid]);

    const setNameAndRemoveErrors = (name) => {
      setName(name);
      if (isError) {
        setISError(false);
        setError('');
      }
    };

    const handleOnClick = async (e) => {
      e.preventDefault();
      if (name.length === 0) {
        setISError(true);
        return setError('Test name cannot be null');
      } else if (tests.includes(name.toLowerCase())) {
        setISError(true);
        return setError('A test by this name already exists');
      } else {
        await addTest({
          googleId: currentUser.uid,
          testName: name,
        });
        return history.push({
          pathname: '/setup',
          state:{ newTestName : name}});
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
                      autoFocus
                      error={isError}
                      helperText={error}
                      onChange={(input) => setNameAndRemoveErrors(input.target.value)}
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

export default Create;

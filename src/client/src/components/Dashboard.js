import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './css/Dashboard.css';
import NavBar from './Navbar';

export default function Dashboard() {
  const history = useHistory();
  const [loading] = useState(false);

  const handleSubmitNew = async (e) => {
    try {
      e.preventDefault();
      history.push('/create');
    } catch {
      console.log('error');
    }
  };

  const handleSubmitEdit = async (e) => {
    try {
      e.preventDefault();
      history.push('/edit');
    } catch {
      console.log('error');
    }
  };

  const handleSubmitResults = async (e) => {
    try {
      e.preventDefault();
      history.push('/results');
    } catch {
      console.log('error');
    }
  };

  return (
    <Container>
      <NavBar/>
      <div id="dashboard-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5">
                Dashboard
              </Typography>
              <Typography component="h1" variant="h5">
                ** OTHER INFORMATION WILL BE DISPLAYED HERE **
              </Typography>
              <form>
                <Button
                  id="setup-test"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmitNew(e)}
                >
                  Setup a New Coding Test
                </Button>
                <Button
                  id="edit-test"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={(e) => handleSubmitEdit(e)}
                >
                  Edit Existing Coding Test
                </Button>
                <Button
                  id="history-results"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmitResults(e)}
                >
                  View Previous Tests History/Results
                </Button>
                <Typography>
                  <Link to="/login">Logout</Link>
                </Typography>
              </form>
            </div>
          </Container>
        </Grid>
      </div>
    </Container>
  );
}

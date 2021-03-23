import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './css/Dashboard.css';
import NavBar from './Navbar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

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
      <NavBar />
      <div id="dashboard-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="xs">
            <div>
              <Typography component="h1" variant="h5">
                Dashboard
              </Typography>
              <form>
                <Card raised={true} id="setup-test-card">
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6">
                        Setup a New Coding Test
                      </Typography>
                      <Typography variant="body2">
                        Create a new coding test with challenges and the option
                        of adding video interview questions
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      id="setup-test"
                      type="submit"
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={(e) => handleSubmitNew(e)}
                    >
                      Setup
                    </Button>
                  </CardActions>
                </Card>
                <Card raised={true} id="edit-test-card">
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6">
                        Edit Existing Coding Test
                      </Typography>
                      <Typography variant="body2">
                        Edit or add new challenges and questions to an existing
                        coding test and send email invites to participants
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      id="edit-test"
                      type="submit"
                      size="small"
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                      onClick={(e) => handleSubmitEdit(e)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
                <Card raised={true} id="history-results-card">
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6">
                        View Previous Tests History/Results
                      </Typography>
                      <Typography variant="body2">
                        See the results from coding tests taken by participants
                        including analytics
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      id="history-results"
                      type="submit"
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={(e) => handleSubmitResults(e)}
                    >
                      Results
                    </Button>
                  </CardActions>
                </Card>
              </form>
            </div>
          </Container>
        </Grid>
      </div>
    </Container>
  );
}

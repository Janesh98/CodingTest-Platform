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
import DeleteAccountAlert from './DeleteAccountAlert'
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import create from "./DashboardImages/create.jpg"
import edit from "./DashboardImages/edit.jpg"
import results from "./DashboardImages/results.jpg"



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
  const useStyles = makeStyles((theme) => ({
  media: {
   height: 0,
  paddingTop: '56.25%', // 16:9,
  marginTop:'30'
  },

}));
const classes = useStyles();
  return (
    <Container>
      <NavBar />
        <Grid container align="center" justify="center" direction="row" spacing={3} style={{marginTop: '75px'}} data-testid="dashboard-grid">
          <Grid item xs={12}>
              <Typography component="h1" variant="h5" data-testid="Dashboard typography">
                Dashboard
              </Typography>    
              </Grid>
              <Grid item xs={4}>
                <Card raised={true} id="setup-test-card">           
                  <CardActionArea  onClick={(e) => handleSubmitNew(e)}>
                    <CardMedia
                     className={classes.media}
                       image={create}
                        title="create image"
                         />  
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
                      data-testid="setup-test"
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
                </Grid>
                <Grid item xs={4}>
                <Card raised={true} id="edit-test-card">
                  <CardActionArea onClick={(e) => handleSubmitEdit(e)}>
                    <CardMedia
                     className={classes.media}
                       image={edit}
                        title="edit image"
                         />  
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
                      data-testid="edit-test"
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
                </Grid>
                <Grid item xs={4}>
                <Card raised={true} id="history-results-card">
                  <CardActionArea  onClick={(e) => handleSubmitResults(e)}>
                    <CardMedia
                     className={classes.media}
                       image={results}
                        title="results image"
                         />  
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
                      data-testid="history-results"
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
                </Grid>
          <DeleteAccountAlert />
        </Grid>
    </Container>
  );
}

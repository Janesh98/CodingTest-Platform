import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './css/Results.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getParticipantResults } from '../endpoints';
import axios from 'axios';
import PlayerCard from './PlayerCard'

const ParticipantsResults = () => {
  const [tableData, setTableData] = useState([]);
  const [questionsTableData, setQuestionsTableData] = useState([]);
  const history = useHistory();
  const id = history.location.state.id;
  const [testId, setTestId] = useState('');
  const email = history.location.state.email;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var questionsList = []
 
  const reducer = (accumulator, currentValue) => accumulator + currentValue;


  
  useEffect(() => {
    const rows = async () => {
      var res = await axios.post(getParticipantResults, {
        data: { _id: id },
      });
      setTestId(res.data.data[0].TestId);
      await setTableData(res.data.data[0].codingTestResults[0].challenges.map((item) => ({ title: item.title, testCases : item.testResults.reduce(reducer)/item.testResults.length, challengeData: item})));

      var key;
      var i = 1;
      for (key in res.data.data[0].codingTestResults[0].questions[0]){
        var question = {};

        question = {
          question: res.data.data[0].codingTestResults[0].questions[0][key],
          id: i,
        }


     //   question = {
     //     question: res.data.data[0].codingTestResults[0].questions[0][key],
     //     id: i,
     //     videoUrl: videoUrl
     //   }
        i ++;

        questionsList.push(question);

      }
      await setQuestionsTableData(questionsList.map((item) => ({ id: item.id, question: item.question, videoUrl: item.videoUrl })));

   //   storage.ref().child(`${res.data.data[0].TestId}/${id}/1.mp4`).getDownloadURL()
   //   .then((url) => {
   //     setVideoUrl(url);
   //   })
    
    };
    rows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClickSeeMore = async (challengeData) => {
    history.push({
      pathname: '/ChallengeResult',
      state: {
        challengeData: challengeData
      },
    });
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

  const classes = useStyles();

  return (
    <Container>
      <NavBar />
      <div id="results-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="md">
            <div>
              <Typography component="h1" variant="h5">
                Coding Test Results for: {email} 
              </Typography>
            </div>
            <Typography component="h1" variant="h5">
                Coding Challenges
              </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Test Cases Passed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.testCases * 100}%
                      </TableCell>
                      <TableCell>
                        <Button
                          id="addParticipants"
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e)=> handleOnClickSeeMore(row.challengeData)}
                        >
                          See More
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography component="h1" variant="h5">
                Question Responses
              </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Question</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionsTableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.question}
                      </TableCell>
                      <TableCell>
                        <PlayerCard testId={testId} participantId={id} id={row.id} question={row.question}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </div>
    </Container>
  );
};

export default ParticipantsResults;
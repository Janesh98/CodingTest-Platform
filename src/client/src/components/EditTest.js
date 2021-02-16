import React, { useEffect, useState }from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './css/Edit.css';
import { getChallenges, getQuestions, deleteChallenge, deleteQuestions } from '../endpoints';
import { useAuth } from '../contexts/AuthContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditTest = () => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const TestName = history.location.state.TestName;
    const [tableData, setTableData] = useState([]);
    const [QuestionsTableData, setQuestionsTableData] = useState([]);

    useEffect(() => {
        const rows = async () => {
          var res = await getChallenges({
            googleId: currentUser.uid,
            testName: TestName,
          });
          await setTableData(res.data.map(item => ({title: item.title, problemDescription: item.problemDescription, createdAt: item.createdAt})));
        };
      
        rows();
      }, [currentUser.uid, TestName]);

      useEffect(() => {
        const questionRows = async () => {
          var res = await getQuestions({
            googleId: currentUser.uid,
            testName: TestName,
          });
          console.log(res.data);
          await setQuestionsTableData(res.data.map(item => ({question1: item.question1, question2: item.question2, question3: item.question3})));
        };
      
        questionRows();
      }, [currentUser.uid, TestName]);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },

        cell_short: {
          maxWidth: 150,
          whiteSpace: 'normal',
          wordWrap: 'break-word'
        },
      });
      
    
      const classes = useStyles();

      function refreshPage() {
        window.location.reload(false);
      }

      const handleOnClickDeleteChallenge = async (e) => {
        try {
          const title = e;
          await deleteChallenge({
            googleId: currentUser.uid,
            testName: TestName,
            title: title,
          });
          return refreshPage();
        } catch {
          console.log('error');
        }
      };

      const handleOnClickDeleteQuestions = async (e) => {
        try {
          await deleteQuestions({
            googleId: currentUser.uid,
            testName: TestName,
          });
          return refreshPage();
        } catch {
          console.log('error');
        }
      };

    return (
      <Container>
      <NavBar/>
      <div id="results-container">
          <Grid container align="center" justify="center" direction="column">
            <Container component="main" maxWidth="md">
              <div>
                <Typography component="h1" variant="h5" gutterBottom="true">
                Coding Test: {TestName}
                </Typography>
                </div>
                <Typography component="h1" variant="h5" gutterBottom="true">
                Coding Challenges for this test
                </Typography>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell className={classes.cell_short}>{row.problemDescription}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>
                <IconButton
                aria-label="deleteChallenge" 
                className={classes.margin}
                id = "deleteChallenge"
                variant="contained"
                color="secondary"
                size="small"
                onClick={(e) => handleOnClickDeleteChallenge(row.title)}
                >
                <DeleteIcon />
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography component="h1" variant="h5" gutterBottom="true">
        Video Interview Questions for this test
    </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question 1</TableCell>
            <TableCell>Question 2</TableCell>
            <TableCell>Question 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {QuestionsTableData.map((row) => (
            <TableRow key={row.question1}>
              <TableCell className={classes.cell_short} component="th" scope="row">
                {row.question1}
              </TableCell>
              <TableCell className={classes.cell_short}>{row.question2}</TableCell>
              <TableCell className={classes.cell_short}>{row.question3}</TableCell>
              <TableCell>
                <IconButton
                aria-label="deleteQuestions" 
                className={classes.margin}
                id = "deleteQuestions"
                variant="contained"
                color="secondary"
                size="small"
                onClick={(e) => handleOnClickDeleteQuestions(e)}
                >
                <DeleteIcon />
                </IconButton>
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

  export default EditTest;
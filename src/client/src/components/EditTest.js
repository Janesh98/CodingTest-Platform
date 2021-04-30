import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './css/Edit.css';
import {
  getChallenges,
  getQuestions,
  deleteChallenge,
  deleteQuestions,
} from '../endpoints';
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
import Button from '@material-ui/core/Button';
import axios from 'axios';

const EditTest = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const testName = history.location.state.testName;
  const id = history.location.state._id;
  const [questionsId, setQuestionsId] = useState('');
  const [tableData, setTableData] = useState([]);
  const [QuestionsTableData, setQuestionsTableData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const rows = async () => {
      var res = await axios.post(getChallenges, {
        data: { googleId: currentUser.uid, testName: testName },
      });
      if (mounted) {
        setTableData(
          res.data.data.map((item) => ({
            _id: item._id,
            title: item.title,
            problemDescription: item.problemDescription,
            inputFormat: item.inputFormat,
            returnFormat: item.returnFormat,
            constraints: item.constraints,
            sampleInput: item.sampleInput,
            sampleOutput: item.sampleOutput,
            exampleExplanation: item.exampleExplanation,
            testInput1: item.testInput1,
            testOutput1: item.testOutput1,
            testInput2: item.testInput2,
            testOutput2: item.testOutput2,
            testInput3: item.testInput3,
            testOutput3: item.testOutput3,
            testInput4: item.testInput4,
            testOutput4: item.testOutput4,
            testInput5: item.testInput5,
            testOutput5: item.testOutput5,
            testInput6: item.testInput6,
            testOutput6: item.testOutput6,
            testInput7: item.testInput7,
            testOutput7: item.testOutput7,
            testInput8: item.testInput8,
            testOutput8: item.testOutput8,
            testInput9: item.testInput9,
            testOutput9: item.testOutput9,
            testInput10: item.testInput10,
            testOutput10: item.testOutput10,
            createdAt: item.createdAt,
          }))
        );
      }
    };

    rows();
    return () => {
      mounted = false;
    };
  }, [currentUser.uid, testName]);

  useEffect(() => {
    let mounted = true;
    const questionRows = async () => {
      var res = await axios.post(getQuestions, {
        data: { googleId: currentUser.uid, testName: testName },
      });
      if (mounted && res.data.data[0] !== undefined) {
        setQuestionsId(res.data.data[0]._id);
        await setQuestionsTableData(
          res.data.data[0].questions.map((item) => ({
            question: item,
          }))
        );
      }
    };

    questionRows();
    return () => {
      mounted = false;
    };
  }, [currentUser.uid, questionsId, testName]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },

    cell_short: {
      maxWidth: 150,
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
  });

  const classes = useStyles();

  const updatedRows = async () => {
    var res = await axios.post(getChallenges, {
      data: { googleId: currentUser.uid, testName: testName },
    });
    setTableData(
      res.data.data.map((item) => ({
        _id: item._id,
        title: item.title,
        problemDescription: item.problemDescription,
        inputFormat: item.inputFormat,
        returnFormat: item.returnFormat,
        constraints: item.constraints,
        sampleInput: item.sampleInput,
        sampleOutput: item.sampleOutput,
        exampleExplanation: item.exampleExplanation,
        testInput1: item.testInput1,
        testOutput1: item.testOutput1,
        testInput2: item.testInput2,
        testOutput2: item.testOutput2,
        testInput3: item.testInput3,
        testOutput3: item.testOutput3,
        testInput4: item.testInput4,
        testOutput4: item.testOutput4,
        testInput5: item.testInput5,
        testOutput5: item.testOutput5,
        testInput6: item.testInput6,
        testOutput6: item.testOutput6,
        testInput7: item.testInput7,
        testOutput7: item.testOutput7,
        testInput8: item.testInput8,
        testOutput8: item.testOutput8,
        testInput9: item.testInput9,
        testOutput9: item.testOutput9,
        testInput10: item.testInput10,
        testOutput10: item.testOutput10,
        createdAt: item.createdAt,
      }))
    );
  };

  const handleOnClickAddParticipants = async (e) => {
    history.push({
      pathname: '/addparticipants',
      state: { testName: testName, _id: id },
    });
  };

  const handleOnClickEditChallenge = async (e) => {
    var i;
    for (i = 0; i < tableData.length; i++) {
      if (tableData[i].title === e) {
        break;
      }
    }
    history.push({
      pathname: '/editchallenge',
      state: {
        testName: testName,
        title: e,
        challengeData: tableData,
        index: i,
      },
    });
  };
  const handleOnClickEditQuestions = async (e) => {
    history.push({
      pathname: '/editquestions',
      state: {
        testName: testName,
        questionsData: QuestionsTableData,
        questionsId: questionsId,
      },
    });
  };

  const handleOnClickDeleteChallenge = async (e, _id) => {
    try {
      const title = e;
      await axios.post(deleteChallenge, {
        data: {
          googleId: currentUser.uid,
          testName: testName,
          title: title,
          _id: _id,
        },
      });
      await updatedRows();
    } catch {
      console.log('error');
    }
  };

  const handleOnClickAddQuestions = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/questions',
        state: { newTestName: testName },
      });
    } catch {
      console.log('error');
    }
  };

  const handleOnClickAddChallenge = async (e) => {
    try {
      e.preventDefault();
      history.push({
        pathname: '/newchallenge',
        state: { newTestName: testName },
      });
    } catch {
      console.log('error');
    }
  };

  const handleOnClickDeleteQuestions = async () => {
    try {
      await axios.post(deleteQuestions, {
        data: {
          googleId: currentUser.uid,
          testName: testName,
          _id: questionsId,
        },
      });
      setQuestionsTableData([]);
    } catch {
      console.log('error');
    }
  };

  let addButton;
  if (QuestionsTableData.length === 0) {
    addButton = (
      <TableCell>
        <Button
          id="addQs"
          variant="contained"
          color="primary"
          size="small"
          onClick={(e) => handleOnClickAddQuestions(e)}
        >
          Add Questions
        </Button>
      </TableCell>
    );
  }

  return (
    <Container>
      <NavBar />
      <div id="results-container" data-testid="editTest-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="md">
            <div>
              <Typography component="h1" variant="h5">
                Coding Test: {testName}
              </Typography>
              <Button
                id="addParticipants"
                data-testid="addParticipants"
                variant="contained"
                color="secondary"
                size="small"
                onClick={(e) => handleOnClickAddParticipants(e)}
              >
                Add Participants
              </Button>
            </div>
            <Typography component="h1" variant="h5">
              Coding Challenges for this test
            </Typography>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple table"
                id="challenges-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>
                      <Button
                        id="addChallenge"
                        variant="contained"
                        data-testid="addChallenge"
                        color="primary"
                        size="small"
                        onClick={(e) => handleOnClickAddChallenge(e)}
                      >
                        Add New Challenge
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell className={classes.cell_short}>
                        {row.problemDescription}
                      </TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          className={classes.margin}
                          id="edit-challenge"
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={(e) => handleOnClickEditChallenge(row.title)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="deleteChallenge"
                          className={classes.margin}
                          id="deleteChallenge"
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e) =>
                            handleOnClickDeleteChallenge(row.title, row._id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography component="h1" variant="h5">
              Video Interview Questions for this test
            </Typography>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple table"
                id="questions-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        className={classes.margin}
                        id="edit-questions"
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={QuestionsTableData.length === 0}
                        onClick={(e) => handleOnClickEditQuestions()}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="deleteQuestions"
                        className={classes.margin}
                        id="deleteQuestions"
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={(e) => handleOnClickDeleteQuestions()}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>

                    {addButton}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {QuestionsTableData.map((row) => (
                    <TableRow key={row.question}>
                      <TableCell
                        className={classes.cell_short}
                        component="th"
                        scope="row"
                      >
                        {row.question}
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

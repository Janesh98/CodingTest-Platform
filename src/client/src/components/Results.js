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
import { useAuth } from '../contexts/AuthContext';
import { getTests } from '../endpoints';
import axios from 'axios';

const Results = () => {
  const { currentUser } = useAuth();
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    const rows = async () => {
      var res = await axios.post(getTests, {
        data: { googleId: currentUser.uid },
      });
      if(mounted){
      await setTableData(
        res.data.data.map((item) => ({
          _id: item._id,
          testName: item.testName,
          createdAt: item.createdAt,
          participants: item.participants,
          challenges: item.challenges.length,
        }))
      )};
    };

    rows();
    return () => { mounted = false;}
  }, [currentUser.uid]);

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

  const classes = useStyles();

  const handleOnClickView = async (e, _id, participants) => {
    history.push({
      pathname: '/participantsresults',
      state: {
        _id: _id,
      },
    });
  };

  return (
    <Container>
      <NavBar />
      <div id="results-container" data-testid="results-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="md">
            <div>
              <Typography component="h1" variant="h5">
                Previous Coding Tests Results
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>No. of Participants</TableCell>
                    <TableCell>No. of Challenges</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.testName}>
                      <TableCell component="th" scope="row">
                        {row.testName}
                      </TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.participants.length}</TableCell>
                      <TableCell>{row.challenges}</TableCell>
                      <TableCell>
                        <Button
                          id="addParticipants"
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e) =>
                            handleOnClickView(
                              row.testName,
                              row._id,
                              row.participants
                            )
                          }
                        >
                          View
                        </Button>
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

export default Results;

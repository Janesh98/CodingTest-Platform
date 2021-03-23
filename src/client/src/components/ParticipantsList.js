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
import { getParticipants } from '../endpoints';
import axios from 'axios';

const ParticipantsList = () => {
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const id = history.location.state._id;

  useEffect(() => {
    const rows = async () => {
      var res = await axios.post(getParticipants, {
        data: { TestId: id },
      });
      await setTableData(res.data.data.map((item) => ({ email: item.email })));
    };

    rows();
  }, [id]);

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
                Coding Test Participants
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Participant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.email}>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Button
                          id="addParticipants"
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          View Results
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

export default ParticipantsList;

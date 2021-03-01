import React, { useEffect, useState }from 'react';
import NavBar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './css/Edit.css';
import { getTests, deleteTest } from '../endpoints';
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

const Edit = () => {
  const { currentUser } = useAuth();
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }
  
  useEffect(() => {
  const rows = async () => {
    var res = await getTests({
      googleId: currentUser.uid,
    });
    await setTableData(res.data.map(item => ({_id: item._id, testName: item.testName, createdAt: item.createdAt})));
  };

  rows();
}, [currentUser.uid]);

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

  const classes = useStyles();

  const handleOnClickAddParticipants = async (testName, _id) => {
    history.push({
      pathname: '/addparticipants',
      state:{ testName : testName,
              _id: _id}});
  };

  const handleOnClickDelete = async (e, _id) => {
    try {
      const testName = e;
      await deleteTest({
        googleId: currentUser.uid,
        testName: testName,
        _id: _id,
      });
      return refreshPage();
    } catch {
      console.log('error');
    }
  };

  const handleOnClickEdit = async (e, _id) => {
    history.push({
      pathname: '/edittest',
      state:{ TestName : e,
              _id: _id}});
  };

  return (
    <Container>
    <NavBar/>
    <div id="edit-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="md">
            <div>
              <Typography component="h1" variant="h5">
              Edit Existing Coding Test
              </Typography>
              </div>
              <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell>Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.testName}>
              <TableCell component="th" scope="row">
                {row.testName}
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>
              <Button
                  id = "addParticipants"
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(e) => handleOnClickAddParticipants(row.testName, row._id)}
                  >
                    Add Participants 
                  </Button>
              </TableCell>
              <TableCell>
                <IconButton
                aria-label="edit" 
                className={classes.margin}
                id = "edit"
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => handleOnClickEdit(row.testName, row._id)}
                >
                <EditIcon />
                </IconButton>
                </TableCell>
              <TableCell>
                <IconButton
                aria-label="delete" 
                className={classes.margin}
                id = "delete"
                variant="contained"
                color="secondary"
                size="small"
                onClick={(e) => handleOnClickDelete(row.testName, row._id)}
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

export default Edit;
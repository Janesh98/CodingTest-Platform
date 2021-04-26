import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { storage } from "../firebase"

const Edit = () => {
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
      setTableData(
        res.data.data.map((item) => ({
          _id: item._id,
          testName: item.testName,
          createdAt: item.createdAt,
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

  const handleOnClickAddParticipants = async (testName, _id) => {
    history.push({
      pathname: '/addparticipants',
      state: { testName: testName, _id: _id },
    });
  };

  const deleteFolderContents = (path) => {
        const ref = storage.ref(path);
        ref.listAll()
          .then(dir => {
            dir.items.forEach(fileRef => {
              deleteFile(ref.fullPath, fileRef.name);
            });
            dir.prefixes.forEach(folderRef => {
              deleteFolderContents(folderRef.fullPath);
            })
          })
          .catch(error => {
            console.log(error);
          });
      }

      const deleteFile = (pathToFile, fileName) => {
        const ref = storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete()
      }

      const updatedRows = async () => {
      var res = await axios.post(getTests, {
        data: { googleId: currentUser.uid },
      });
      setTableData(
        res.data.data.map((item) => ({
          _id: item._id,
          testName: item.testName,
          createdAt: item.createdAt,
        }))
      )};

  const handleOnClickDelete = async (e, _id) => {
    try {
      const testName = e;
      deleteFolderContents(_id);
      await axios.post(deleteTest, {
        data: { googleId: currentUser.uid, testName: testName, _id: _id },
      });
      updatedRows();
      document.getElementById("tests-table").reset();
    } catch {
      console.log('error');
    }
  };

  const handleOnClickEdit = async (e, _id) => {
    history.push({
      pathname: '/edittest',
      state: { testName: e, _id: _id },
    });
  };

  return (
    <Container>
      <NavBar />
      <div data-testid="edit-container" id="edit-container">
        <Grid container align="center" justify="center" direction="column">
          <Container component="main" maxWidth="md">
            <div>
              <Typography component="h1" variant="h5">
                Edit Existing Coding Test
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table" id='tests-table'>
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
                          id="addParticipants"
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e) =>
                            handleOnClickAddParticipants(row.testName, row._id)
                          }
                        >
                          Add Participants
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          className={classes.margin}
                          id="edit"
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={(e) =>
                            handleOnClickEdit(row.testName, row._id)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          id="delete"
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={(e) =>
                            handleOnClickDelete(row.testName, row._id)
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
          </Container>
        </Grid>
      </div>
    </Container>
  );
};

export default Edit;

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
import SyntaxHighlighter from 'react-syntax-highlighter';


const ChallengeResult = () => {
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const challengeData = history.location.state.challengeData;

  var data = []
  var i;
  for (i=0; i<challengeData.testCases.length; i++){
        var test = {};
        test = {
          codeOutput: challengeData.codeOutput[i],
          testCases: challengeData.testCases[i],
          testResults: challengeData.testResults[i]
      }
      data.push(test);
  }

  
  useEffect(() => {
    const rows = () => {
      setTableData(data.map((item) => ({ input: item.testCases.input, output : item.testCases.output, pass: item.testResults.toString(), stdout: item.codeOutput.stdout !== null ? atob(item.codeOutput.stdout) : "N/A", runTime: item.codeOutput.time, memory: item.codeOutput.memory})));
    };
    rows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    textField: {
        marginLeft: 'center',
        marginRight: 'center',
        color: 'white',
        paddingBottom: 20,
        marginTop:20,
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
                Coding Challenge Results for: {challengeData.title} 
              </Typography>
            </div>
            <Typography component="h1" variant="h5">
                Code for Solution:
              </Typography>
              <Container component="main" maxWidth="xs">
            <SyntaxHighlighter
                language={challengeData.language.toLowerCase()}
                wrapLongLines
                showLineNumbers={true}
                customStyle={{
                    backgroundColor: "transparent",
                    textAlign: 'left'
                }}
                >
                {atob(challengeData.code)} 
            </SyntaxHighlighter>
            </Container>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Input</TableCell>
                    <TableCell>Expected Output</TableCell>
                    <TableCell>Actual Output</TableCell>
                    <TableCell>Passed?</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>Memory</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.input}>
                      <TableCell component="th" scope="row">
                        {row.input}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.output}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.stdout}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.pass}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.runTime} seconds
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.memory} K/B
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

export default ChallengeResult;
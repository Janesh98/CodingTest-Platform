import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import './css/Setup.css';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>

        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Setup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
    <div id="setup-container">
      <Grid container align="center" justify="center" direction="column">
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h3" variant="h5">
              Setup A New Coding Test
            </Typography>
          </div>
          <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        See Example Challenge
      </Button>
      <Dialog onClose={handleClose} aria-label="example problem" open={open}>
        <DialogTitle id="example problem" onClose={handleClose}>
          Example Coding Problem
        </DialogTitle>
        <DialogContent dividers>
        <form>
            <Typography component="h10" variant="h10">
              Challenge Title 
            </Typography>
            <Box color="black" bgcolor="lightgray" p={1}>
              <Typography>
              Arrays: Left Rotation
              </Typography>
            </Box>
              <Typography component="h10" variant="h10">
                Problem Description
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                A left rotation operation on an array shifts each of the array's elements  unit to the left. For example, if  left rotations are performed on array , then the array would become . Note that the lowest index item moves to the highest index in a rotation. This is called a circular array.
                </Typography>
                <Typography>
                Given an array  of  integers and a number, , perform  left rotations on the array. Return the updated array to be printed as a single line of space-separated integers.
                Complete the function rotLeft in the editor below.
                </Typography>
              </Box>
              <Typography component="h10" variant="h10">
                Input Format
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                  The first line contains two space-separated integers n and d, the size of a and the number of left rotations.
                  The second line contains n space-separated integers, each an a[i].
                </Typography> 
              </Box>
              <Typography component="h10" variant="h10">
                Return Format
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                  int a'[n]: the rotated array
                </Typography>
              </Box>
              <Typography component="h10" variant="h10">
                Constraints
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                  1 ≤ n ≤ 10^5
                </Typography>
                <Typography>
                  1 ≤ d ≤ n
                </Typography>
                <Typography>
                  1 ≤ a[i] ≤ 10^6
                </Typography>
              </Box>
              <Typography component="h10" variant="h10">
                Sample Input 
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                  5 4
                </Typography>
                <Typography>
                  1 2 3 4 5
                </Typography>
              </Box>
              <Typography component="h10" variant="h10">
                Sample Output 
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                  5 1 2 3 4
                </Typography>
              </Box>
              <Typography component="h10" variant="h10">
                Example with Explanation  
              </Typography> 
              <Box color="black" bgcolor="lightgray" p={1}>
                <Typography>
                When we perform d = 4 left rotations, the array undergoes the following sequence of changes:
                </Typography>
                <Typography>
                  [1,2,3,4,5] -{'>'} [2,3,4,5,1] -{'>'} [3,4,5,1,2] -{'>'} [4,5,1,2,3] -{'>'} [5.1,2,3,4]
                </Typography>
              </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          <form>
            <Typography component="h10" variant="h10">
              Challenge Title 
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title E.g. 'FizzBuzz'"
                placeholder="Title E.g. 'FizzBuzz'"
                name="title"
                autoComplete="title"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Problem Description
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {3}
                id="problem description"
                label="Problem Description"
                placeholder="Problem Description of Challenge"
                name="problem description"
                autoComplete="problem description"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Input Format
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="input format"
                label="Input Format"
                placeholder="Input Format"
                name="input format"
                autoComplete="input format"
                autoFocus
              />
            
              <Typography component="h10" variant="h10">
                Return Format
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="return format"
                label="Return Format"
                placeholder="Return Format"
                name="return format"
                autoComplete="return format"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Constraints
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {2}
                id= "constraints"
                label="Constraints"
                placeholder="Constraints"
                name="constraints"
                autoComplete="constraints"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Sample Input 
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample input"
                label="Sample Input"
                placeholder="Sample Input"
                name="sample input"
                autoComplete="sample input"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Sample Output 
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="sample output"
                label="Sample Output"
                placeholder="Sample Output"
                name="sample output"
                autoComplete="sample output"
                autoFocus
              />
              <Typography component="h10" variant="h10">
                Example with Explanation  
              </Typography> 
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows = {2}
                id="example with explanation"
                label="Example with Explanation"
                placeholder="Example with Explanation"
                name="example with explanation"
                autoComplete="example with explanation"
                autoFocus
              />
              <Button
                id = "save-challenge"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                >
                  Save Challenge 
                </Button>
          </form>
        </Container>
      </Grid>
    </div>
    </Container>
  );
};

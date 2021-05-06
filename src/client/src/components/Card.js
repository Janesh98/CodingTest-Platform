import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';


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

export default function Card(){
    const [open, setOpen] = useState(false);

  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
    <Button variant="outlined" data-testid="open" color="primary" onClick={handleClickOpen}>
    See Example Challenge
  </Button>
  <Dialog onClose={handleClose} aria-label="example problem" open={open}>
    <DialogTitle id="example problem" onClose={handleClose}>
      Example Coding Problem
    </DialogTitle>
    <DialogContent dividers>
    <form>
        <Typography component="h1">
          Challenge Title 
        </Typography>
        <Box color="black" bgcolor="lightgray" p={1}>
          <Typography>
          Arrays: Left Rotation
          </Typography>
        </Box>
          <Typography component="h1">
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
          <Typography component="h1">
            Input Format
          </Typography> 
          <Box color="black" bgcolor="lightgray" p={1}>
            <Typography>
              The first two characters contain two space-separated integers n and d, the size of a and the number of left rotations.
              The remaining arguments contain n space-separated integers, each an a[i].
            </Typography> 
          </Box>
          <Typography component="h1">
            Return Format 
          </Typography> 
          <Box color="black" bgcolor="lightgray" p={1}>
            <Typography>
              int a'[n]: the rotated array
            </Typography>
          </Box>
          <Typography component="h1">
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
          <Typography component="h1">
            Sample Input 
          </Typography> 
          <Box color="black" bgcolor="lightgray" p={1}>
            <Typography>
              5 4 1 2 3 4 5
            </Typography>
          </Box>
          <Typography component="h1">
            Sample Output 
          </Typography> 
          <Box color="black" bgcolor="lightgray" p={1}>
            <Typography>
              5 1 2 3 4
            </Typography>
          </Box>
          <Typography component="h1">
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
      <Button autoFocus onClick={handleClose} color="primary" data-testid="close">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  );
};


import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteUserData } from '../endpoints';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(5),
    },
    justifyContent: 'center'
  },
}));

export default function DeleteAccountAlert() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { currentUser, deleteUser } = useAuth();

  const DeleteUserDetails = async () => {
    await axios.post(deleteUserData, {
      data: { googleId: currentUser.uid },
    });
  };

  const handleSubmitDelete = async (e) => {
    try {
      e.preventDefault();
      deleteUser();
      await DeleteUserDetails();
      history.push('/login');
    } catch {
      console.log('error');
    }
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity="warning"
          action={
              <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button
              aria-label="close"
              color="inherit"
              size="small"
              onClick={(e) => {
                handleSubmitDelete(e);
              }}
            >
              Yes
            </Button>
            <Button
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            </ButtonGroup>
          }
        >
          <AlertTitle>Are you sure you want to Delete your account?</AlertTitle> 
          All coding tests and results data will de deleted
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete Account
      </Button>
    </div>
  );
}
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: theme.palette.common.white,
    background: '#1d1d1d',
    width: '100%',
    height: '100%',
    margin: '0px',
  },
}));
const testExpired = () => {

// eslint-disable-next-line react-hooks/rules-of-hooks
const classes = useStyles();

    return(
        <div className={classes.root}>
            <Typography> 
                Sorry, unfortunately your invitaion has expired and is no longer valid.
            </Typography>
        </div>
    
 )}

export default testExpired
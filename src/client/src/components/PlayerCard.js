import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { storage } from "../firebase"
import { ReactVideo } from "reactjs-media";


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

export default function PlayerCard(video){
    const [open, setOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState(undefined)

    useEffect(() => {
      storage.ref().child(`${video.testId}/${video.participantId}/${video.id}.mp4`).getDownloadURL()
      .then((url) => {
        setVideoUrl(url);
      })
    });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
    <Button data-testid="open" variant="outlined" color="primary" onClick={handleClickOpen}>
    See Response
  </Button>
  <Dialog data-testid="dialog" onClose={handleClose} aria-label="example problem" open={open} maxWidth='md'>
    <DialogTitle id="example problem" onClose={handleClose}>
      Question: {video.question}
    </DialogTitle>
    <DialogContent dividers>
    <ReactVideo data-testid="player" src={String(videoUrl)} poster="https://ichef.bbci.co.uk/news/976/cpsprodpb/13F8F/production/_115970818_hi064603139.jpg" />
    </DialogContent>
    <DialogActions>
      <Button autoFocus data-testid="close" onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  );
};


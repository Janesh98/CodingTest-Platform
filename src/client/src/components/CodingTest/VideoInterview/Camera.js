import React, { useState, useContext, useCallback, useRef } from 'react';
import { CodingTestContext } from '../context/CodingTestState';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Webcam from "react-webcam";
import { storage } from "../../../firebase"
import { useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  description: {
    overflow: 'auto',
    maxHeight: '87vh',
  },

  spinner:{
    justifyContent: "center"
  }
}));

const Camera = () => {
  const {
    codingTest,
    currentQuestionIndex,
    updateCurrentQuestionIndex,
      } = useContext(CodingTestContext);
  const classes = useStyles();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [responded, setResponded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [finished, setFinished] = useState(false);
  const { codingTestId, participantId } = useParams();

  const handleStartCaptureClick = () => {
    setCapturing(true);
  
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };
 
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if(mediaRecorderRef.current.state === "recording"){
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setResponded(true);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleFile= useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: ".mpeg"
      });
      setRecordedChunks([]);
      return blob
    }
  }, [recordedChunks]);

  const handleContinue = async () => {
    const file = handleFile();
    setLoading(true);
    await storage.ref().child(`${codingTestId}/${participantId}/${currentQuestionIndex}.mp4`).put(file);
    setLoading(false);

    updateCurrentQuestionIndex(currentQuestionIndex + 1);
    if(Object.keys(codingTest.questions[0].questions).length - 1 === currentQuestionIndex){
      setFinished(true);
    };
    setResponded(false);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
    };

  

  return (
    <>
      <div className={classes.root}>
        {loading ? <Typography>Please wait while your response is uploaded </Typography> : ''}
        {loading ? <CircularProgress size={200} className={classes.spinner} />: ''}
        {!finished ? 
        <Webcam  mirrored = "true" audio={true} height={338} width={600} ref={webcamRef}  videoConstraints={videoConstraints}/> : ''}
                {responded ? 
                <div>
                  <Typography>Thank you! Your response has been recorded.</Typography>
                  <Button color="secondary" variant="contained" disabled={loading} onClick={handleContinue}>Continue</Button>
                  </div>
                 :(capturing ? (
                   <div>    
                   <Button color="secondary" variant="contained" onClick={handleStopCaptureClick}>Stop Recording</Button>
                   <CountdownCircleTimer
                     isPlaying
                     duration={60}
                     colors={[
                       ['#004777', 0.33],
                       ['#F7B801', 0.33],
                       ['#A30000', 0.33],
                     ]}
                     onComplete={handleStopCaptureClick}
                      >
                     {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                    </div>
                   ) : ( !finished ? 
                   <Button   color="primary" variant="contained" onClick={handleStartCaptureClick}>Start Recording</Button> : ''
                 ))}
                 {finished ?
                 <div>
                  <Typography>Thank you! Your response has been recorded and your video interview is complete</Typography>
                  </div> : ''
                  }
      </div>
    </>
  );
};

export default Camera;
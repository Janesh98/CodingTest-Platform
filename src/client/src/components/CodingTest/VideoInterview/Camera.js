import React, { useState, useContext, useCallback, useRef } from 'react';
import { CodingTestContext } from '../context/CodingTestState';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  description: {
    overflow: 'auto',
    maxHeight: '87vh',
  },
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
 // const [recordedChunks, setRecordedChunks] = useState([]);
  var recording = false;
  const [finished, setFinished] = useState(false);

  const handleStartCaptureClick = () => {
    setCapturing(true);
    recording = true;

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
  //  mediaRecorderRef.current.addEventListener(
  //    "dataavailable",
  //    handleDataAvailable
  //  );
    mediaRecorderRef.current.start();
    setTimeout(event => {
     if(recording === true){
       recording = false;
       handleStopCaptureClick()
     };
      }, 9000);
  };

  
 // const handleDataAvailable = useCallback(
 //   ({ data }) => {
 //     if (data.size > 0) {
 //       setRecordedChunks((prev) => prev.concat(data));
 //     }
 //   },
 //   [setRecordedChunks]
 // );

  const handleStopCaptureClick = useCallback(() => {
    if(mediaRecorderRef.current.state === "recording"){
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setResponded(true);
    }
  }, [mediaRecorderRef, setCapturing]);

//  const handleDownload = useCallback(() => {
//    if (recordedChunks.length) {
//      const blob = new Blob(recordedChunks, {
//        type: "video/webm"
//      });
//      const url = URL.createObjectURL(blob);
//      const a = document.createElement("a");
//      document.body.appendChild(a);
//      a.style = "display: none";
//      a.href = url;
//      a.download = "react-webcam-stream-capture.mp4";
//      a.click();
//      window.URL.revokeObjectURL(url);
//      setRecordedChunks([]);
//    }
//  }, [recordedChunks]);

  const handleContinue = () => {
    updateCurrentQuestionIndex(currentQuestionIndex + 1);
    if(Object.keys(codingTest.questions[0]).length === currentQuestionIndex){
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
        {!finished ? 
        <Webcam  mirrored = "true" audio={true} height={338} width={600} ref={webcamRef} videoConstraints={videoConstraints}/> : ''}
                {responded ? 
                <div>
                  <Typography>Thank you! Your response has been recorded.</Typography>
                  <Button color="secondary" variant="contained" onClick={handleContinue}>Continue</Button>
                  </div>
                 :(capturing ? (   
                   <Button color="secondary" variant="contained" onClick={handleStopCaptureClick}>Stop Recording</Button>
                   ) : ( !finished ? 
                   <Button color="primary" variant="contained" onClick={handleStartCaptureClick}>Start Recording</Button> : ''
                 ))}
                 {finished ?
                 <div>
                  <Typography>Thank you! Your response has been recorded and your video interview is complete</Typography>
                  </div> : ''
                  }
                 {/* {recordedChunks.length > 0 && ( */}
                   {/* <Button color="secondary" variant="contained" onClick={handleContinue}>Continue</Button> */}
                 {/* )} */}
      </div>
    </>
  );
};

export default Camera;
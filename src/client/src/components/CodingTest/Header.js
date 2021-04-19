import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { Button, Container, MenuItem } from '@material-ui/core';
import { languages } from './languages';
import { CodingTestContext } from './context/CodingTestState';
import { submitCodingTest } from '../../endpoints';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: theme.palette.success.contrastText,
  },
  selector: {
    color: 'white',
  },
  submit: {
    marginLeft: '35%',
  },
  container: {
    marginRight: 0,
  },
}));

const Header = () => {
  const classes = useStyles();
  const {
    updateLanguage,
    codingTest,
    currentChallengeIndex,
    code,
  } = useContext(CodingTestContext);
  const { codingTestId, participantId } = useParams();
  const history = useHistory();

  // saves code to global memory
  const saveCodeProgress = () => {
    codingTest.challenges[currentChallengeIndex].code = code;
  };

  const convertCodeToBase64 = () => {
    codingTest?.challenges.map((test, i) => {
      return (codingTest.challenges[i].code = btoa(test.code));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveCodeProgress();
    convertCodeToBase64();
    try {
      await axios.post(submitCodingTest, {
        data: { participantId, codingTestResults: codingTest },
      });
      history.push(`/videointerview/${codingTestId}/${participantId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onLanguageChange = async (language) => {
    updateLanguage(language);
    codingTest.challenges[currentChallengeIndex].language = language;
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Coding Test
          </Typography>
          <Container
            className={classes.container}
            disableGutters
            maxWidth="xs"
            align="right"
          >
            <Select
              label="Language"
              defaultValue={10}
              color="primary"
              onChange={(e) => onLanguageChange(languages[e.target.value])}
              classes={{
                root: classes.selector,
                icon: classes.selector,
              }}
            >
              {Object.entries(languages).map(([key, value]) => {
                return (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              type="submit"
              color="primary"
              size="small"
              variant="contained"
              className={classes.submit}
              onClick={(e) => handleSubmit(e)}
            >
              <Typography variant="button">Submit Test</Typography>
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

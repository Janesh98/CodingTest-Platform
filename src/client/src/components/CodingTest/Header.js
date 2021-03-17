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
  const { updateLanguage, codingTest } = useContext(CodingTestContext);
  const { codingTestId, participantId } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitCodingTest({
        participantId,
        codingTestResults: codingTest,
      });
      history.push(`/videointerview/${codingTestId}/${participantId}`);
    } catch (error) {
      console.error(error);
    }
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
              onChange={(e) => updateLanguage(languages[e.target.value])}
              classes={{
                root: classes.selector,
                icon: classes.selector,
              }}
            >
              {Object.entries(languages).map(([key, value]) => {
                // console.log(key, value);
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

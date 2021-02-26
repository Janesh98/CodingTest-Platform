import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { Container, MenuItem } from '@material-ui/core';
import { languages } from './languages';
import { CodingTestContext } from './context/CodingTestState';

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
}));

const Header = () => {
  const classes = useStyles();
  const { updateLanguage } = useContext(CodingTestContext);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Coding Test
          </Typography>
          <Container disableGutters maxWidth="xs" align="right">
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
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { CodingTestContext } from './context/CodingTestState';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '28.4vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanels: {
    overflow: 'auto',
  },
}));

const Terminal = () => {
  const { codeOutput, codingTest } = useContext(CodingTestContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const parseCodeOutput = () => {
    if (codeOutput.compile_output && codeOutput.compile_output != null)
      return atob(codeOutput.compile_output);
    else if (codeOutput.stderr && codeOutput.stderr != null)
      return atob(codeOutput.stderr);
    else return codeOutput.stdout ? atob(codeOutput.stdout) : '';
  };

  const getCodeTestInput = (index) => {
    return (
      '\n' + codingTest.challenges[currentChallengeIndex].testInput1 + '\n\n'
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Terminal test tabs"
        className={classes.tabs}
      >
        <Tab label="Test 1" {...a11yProps(0)} />
        <Tab label="Test 2" {...a11yProps(1)} />
        <Tab label="Test 3" {...a11yProps(2)} />
        <Tab label="Test 4" {...a11yProps(3)} />
        <Tab label="Test 5" {...a11yProps(4)} />
      </Tabs>
      <TabPanel
        value={value}
        index={0}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        Input
        {codingTest !== null ? getCodeTestInput() : ''}
        Output
        {'\n' + parseCodeOutput()}
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        Input
        {codingTest !== null ? getCodeTestInput() : ''}
        Output
        {'\n' + parseCodeOutput()}
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        Input
        {codingTest !== null ? getCodeTestInput() : ''}
        Output
        {'\n' + parseCodeOutput()}
      </TabPanel>
      <TabPanel
        value={value}
        index={3}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        Input
        {codingTest !== null ? getCodeTestInput() : ''}
        Output
        {'\n' + parseCodeOutput()}
      </TabPanel>
      <TabPanel
        value={value}
        index={4}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        Input
        {codingTest !== null ? getCodeTestInput() : ''}
        Output
        {'\n' + parseCodeOutput()}
      </TabPanel>
    </div>
  );
};

export default Terminal;

import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { CodingTestContext } from './context/CodingTestState';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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
  correctIcon: {
    color: theme.palette.success.main,
    fontSize: 'medium',
  },
  incorrectIcon: {
    color: theme.palette.error.main,
    fontSize: 'medium',
  },
}));

const Terminal = () => {
  const {
    codeOutput,
    codingTest,
    currentChallengeIndex,
    testResults,
  } = useContext(CodingTestContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const parseCodeOutput = (i) => {
    if (codeOutput?.length <= 0) {
      return '';
    } else if (codeOutput[i]?.compile_output)
      return atob(codeOutput[i]?.compile_output);
    else if (codeOutput[i]?.stderr && codeOutput[i]?.stderr != null)
      return atob(codeOutput[i]?.stderr);
    else return codeOutput[i]?.stdout ? atob(codeOutput[i]?.stdout) : '';
  };

  const getCodeTestInput = (index) => {
    return (
      '\n' +
      codingTest.challenges[currentChallengeIndex].testCases[index].input +
      '\n\n'
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createTabs = () => {
    const tabList = [];
    codingTest.challenges[currentChallengeIndex].testCases.map((test, i) => {
      return tabList.push(
        <Tab
          icon={
            codeOutput.length > 0 && testResults[i] === true ? (
              <CheckCircleIcon className={classes.correctIcon} />
            ) : testResults[i] === undefined ? (
              ''
            ) : (
              <CancelIcon className={classes.incorrectIcon} />
            )
          }
          key={i}
          label={'Test ' + (i + 1)}
          {...a11yProps(i)}
        />
      );
    });

    return tabList;
  };

  const createTabPanels = () => {
    const tabPanelList = [];
    codingTest.challenges[currentChallengeIndex].testCases.map((test, i) => {
      return tabPanelList.push(
        <TabPanel
          value={value}
          index={i}
          key={i}
          align="left"
          variant="body1"
          style={{ whiteSpace: 'pre-line' }}
          className={classes.tabPanels}
        >
          Input
          {getCodeTestInput(i)}
          Output
          {'\n' + parseCodeOutput(i)}
        </TabPanel>
      );
    });

    return tabPanelList;
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
        {codingTest !== null ? createTabs() : ''}
      </Tabs>
      {codingTest !== null ? createTabPanels() : ''}
    </div>
  );
};

export default Terminal;

import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCodingTest } from '../../endpoints';
import { CodingTestContext } from './context/CodingTestState';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

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

const Problem = () => {
  const { codingTestId, participantId } = useParams();
  const {
    updateCodingTest,
    codingTest,
    currentChallengeIndex,
    updateCurrentChallengeIndex,
  } = useContext(CodingTestContext);
  const classes = useStyles();

  const handleTabChange = (event, newTab) => {
    updateCurrentChallengeIndex(newTab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCodingTest(codingTestId, participantId);
        updateCodingTest(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    return fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseProblemDescription = (index) => {
    const ct = codingTest.challenges[index];
    let s = '';
    for (const [key, value] of Object.entries(ct)) {
      // only print non test entries as tests are displayed in terminal
      if (!key.includes('test')) s += `${key}\n${value}\n\n`;
    }

    return s;
  };

  const createTabs = () => {
    const collectionOfTabs = [];

    codingTest.challenges.map((ct, i) => {
      return collectionOfTabs.push(
        <Tab key={i} label={'Q' + (i + 1)} {...a11yProps(i)} />
      );
    });

    return collectionOfTabs;
  };

  const createTabPanels = () => {
    const collectionOfTabPanels = [];

    codingTest.challenges.map((ct, i) => {
      return collectionOfTabPanels.push(
        <TabPanel
          value={currentChallengeIndex}
          index={i}
          key={i}
          className={classes.description}
          align="left"
          style={{ whiteSpace: 'pre-line' }}
        >
          {codingTest !== null ? parseProblemDescription(i) : ''}
        </TabPanel>
      );
    });

    return collectionOfTabPanels;
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
          <Tabs
            value={currentChallengeIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable tab coding test questions"
          >
            {codingTest !== null ? createTabs() : ''}
          </Tabs>
        </AppBar>
        {codingTest !== null ? createTabPanels() : ''}
      </div>
    </>
  );
};

export default Problem;

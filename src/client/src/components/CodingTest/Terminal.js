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
    height: '35vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanels: {
    overflow: 'auto',
    width: '100%',
  },
}));

const Terminal = () => {
  const { codeOutput } = useContext(CodingTestContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Test 1" {...a11yProps(0)} />
        <Tab label="Test 2" {...a11yProps(1)} />
        <Tab label="Test 3" {...a11yProps(2)} />
        <Tab label="Test 4" {...a11yProps(3)} />
        <Tab label="Test 5" {...a11yProps(4)} />
        <Tab label="Test 6" {...a11yProps(5)} />
        <Tab label="Test 7" {...a11yProps(6)} />
        <Tab label="Test 8" {...a11yProps(7)} />
        <Tab label="Test 9" {...a11yProps(8)} />
      </Tabs>
      <TabPanel
        value={value}
        index={0}
        align="left"
        variant="body1"
        style={{ whiteSpace: 'pre-line' }}
        className={classes.tabPanels}
      >
        {codeOutput}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Eight
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Nine
      </TabPanel>
    </div>
  );
};

export default Terminal;

import React, { useState} from "react"
import { useHistory } from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Drawer} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NavBar() {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubmitLogout = async (e) => {
        try {
          e.preventDefault();
          history.push('/login');
        } catch {
          console.log('error');
        }
      };

      const handleSubmitNew = async (e) => {
        try {
          e.preventDefault();
          history.push('/setup');
        } catch {
          console.log('error');
        }
      };

      const handleSubmitEdit = async (e) => {
        try {
          e.preventDefault();
          history.push('/edit');
        } catch {
          console.log('error');
        }
      };
    
      const handleSubmitResults = async (e) => {
        try {
          e.preventDefault();
          history.push('/results');
        } catch {
          console.log('error');
        }
      };
      const handleSubmitDash = async (e) => {
        try {
          e.preventDefault();
          history.push('/');
        } catch {
          console.log('error');
        }
      };

    return (
        <div>
        <AppBar>
          <Toolbar>
            <IconButton onClick = {handleDrawerOpen} color = 'inherit' edge= 'start' aria-label='menu'>
              <Menu/>
            </IconButton>
            <Typography variant = 'h6' style={{ flexGrow : 1}}>
              Coding Test Platform
            </Typography>
            <Button 
            color = 'inherit'
            onClick={(e) => handleSubmitLogout(e)}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
            Menu
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button color = 'primary' onClick={(e) => handleSubmitDash(e)}>
                Dashboard

            </ListItem>
        <Divider />
            <ListItem button color = 'primary' onClick={(e) => handleSubmitNew(e)}>
                Setup New Coding Test

            </ListItem>
        <Divider />
        <ListItem button color = 'primary' onClick={(e) => handleSubmitEdit(e)}>
                Edit Existing Test

            </ListItem>
        <Divider />
        <ListItem button color = 'primary' onClick={(e) => handleSubmitResults(e)}>
                View previous Test Results

            </ListItem>
        <Divider />
        
        </List>
      </Drawer>
        </div>
    );
}
import React, {} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Drawer, IconButton} from '@material-ui/core';
import {SidebarNav} from './components';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import './sidebar.css'
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }  },
  root: {
    display: 'flex',
    height: '100%',
    padding: theme.spacing(2)
  },
}));

const Sidebar = props => {
  const {open, variant, onClose, closeSidebar} = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'List of employees',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    },
  ];

  return (

    <Drawer
      classes={{paper: classes.drawer}}
      className={'sidebar'}
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className='drawerHeader'>
        <IconButton
            onClick={() => {
              closeSidebar(false)
            }}>
          <CloseIcon/>
        </IconButton>

      </div>
        <SidebarNav
            closeSidebar={closeSidebar}
            pages={pages}
        />
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  closeSidebar: PropTypes.func,

};

export default Sidebar;

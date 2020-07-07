import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Divider, Drawer} from '@material-ui/core';
import {Profile, SidebarNav} from './components';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

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
  const {open, variant, onClose} = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Список сотрудников',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Настройки',
      href: '/settings',
      icon: <SettingsIcon />
    },
  ];

  return (

    <Drawer
      classes={{paper: classes.drawer}}
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root)}
      >
        {/*<Profile />*/}
        <Divider/>
        <SidebarNav
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired

};

export default Sidebar;

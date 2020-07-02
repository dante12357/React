/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {forwardRef} from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {List, ListItem, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({

  button: {
    color: '#37474f',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 400
  },
  icon: {
    color: '#78909c',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px'
  },
  active: {
    color: '#3f51b5',
    fontWeight: 400,
    '& $icon': {
      color: '#3f51b5'
    }
  }
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{flexGrow: 1}}
  >
    <RouterLink {...props} />
  </div>
));


const SidebarNav = props => {
  const {pages} = props;
  const classes = useStyles();

  return (
    <List>
      {pages.map(page => (
        <ListItem
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;

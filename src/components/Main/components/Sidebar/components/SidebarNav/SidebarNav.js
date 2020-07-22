/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {forwardRef} from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {List, ListItem, Button, IconButton, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Form} from "formik";
import './sidebarNav.css';
const useStyles = makeStyles(() => ({

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
  const {pages, closeSidebar} = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');


  return (
    <List className={'sidebarNav'}>


      {pages.map(page => (

        <ListItem
          // disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={'button'}
            component={CustomRouterLink}
            onClick={() => {closeSidebar(false)}}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {t (page.title)}
          </Button>

        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  closeSidebar: PropTypes.func,

};

export default SidebarNav;

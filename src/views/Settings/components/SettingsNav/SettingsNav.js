/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {forwardRef} from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button, Divider
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        color: '#37474f',
    },

    // button: {
    //     padding: '10px 8px',
    //     justifyContent: 'flex-start',
    //     textTransform: 'none',
    //     letterSpacing: 0,
    //     width: '100%',
    //     fontWeight: 400
    // },
    icon: {
        color: '#78909c',
        alignItems: 'center',
        width: '36px',
        height: '36px',
    },
    //
}));

const SettingsNav = props => {
    const {pages} = props;
    const classes = useStyles();

    return (
        <List>

            {pages.map(page => (
                <ListItem
                    className={classes.root}
                    button

                    key={page.title}
                    component={RouterLink}
                    to={"/settings" + page.href}
                    divider

                >

                    <ListItemText
                        primary={page.title}
                    />
                    <ListItemSecondaryAction>
                        <IconButton component={RouterLink}
                                    edge="end"
                                    to={"/settings" + page.href}
                                    className={classes.icon}>{page.icon}</IconButton>
                    </ListItemSecondaryAction>

                </ListItem>

            ))}

        </List>
    );
};

SettingsNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired
};

export default SettingsNav;

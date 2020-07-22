
import React, {useState} from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    List,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TableBody, TableRow, TableCell, Table
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    TableRowRoot: {
        textDecoration: 'none',
    },
    TableCellRoot: {
        color: '#37474f',
        padding: '12px 20px',
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
    const {t, i18n} = useTranslation('translation');

    return (

        <Table>
            <TableBody>
                {pages.map(page => (
                    <TableRow
                        classes={{root: classes.TableRowRoot}}
                        key={page.title}
                        component={RouterLink}
                        to={"/settings" + page.href}
                        hover
                    >
                        <List component={TableCell}
                              classes={{root: classes.TableCellRoot}}
                        >
                            <ListItemText
                                primary={t(page.title)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton component={RouterLink}
                                            edge="end"
                                            to={"/settings" + page.href}
                                            className={classes.icon}>{page.icon}</IconButton>
                            </ListItemSecondaryAction>
                        </List>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

SettingsNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired
};

export default SettingsNav;

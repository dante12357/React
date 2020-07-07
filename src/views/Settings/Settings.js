import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Divider, Card} from '@material-ui/core';
import {SettingsNav} from './components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './settings.css';

const useStyles = makeStyles((theme) => ({}));

const Settings = props => {
    const {open, variant, onClose} = props;

    const classes = useStyles();

    const pages = [
        {
            title: 'Должность',
            href: '/position',
            icon: <ArrowRightIcon/>
        },
        {
            title: 'Должность',
            href: '/position',
            icon: <ArrowRightIcon/>
        },

    ];

    return (
        <div className="Settings">
            <Card
                classes={{paper: classes.drawer}}
                anchor="left"
            >
                <div>
                    <SettingsNav
                        pages={pages}
                    />
                </div>
            </Card>
        </div>
    );
};

Settings.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired

};

export default Settings;

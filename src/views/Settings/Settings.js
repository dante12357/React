import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Card} from '@material-ui/core';
import {SettingsNav} from './components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './settings.css';

const useStyles = makeStyles(() => ({}));

const Settings = props => {
    const {} = props;

    const classes = useStyles();

    const pages = [
        {
            title: 'Positions',
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

};

export default Settings;

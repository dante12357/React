import React, {} from 'react'
import {AddPosition} from "./components";
import PropTypes from 'prop-types';
import {Card, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
//import ' ./positionToolbar.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {useTranslation} from "react-i18next";


const PositionToolbar = props => {
    const {onChange, value} = props;
    const { t, i18n } = useTranslation('translation');

    return (
        <div className="positionToolbar">
            <ListItemText>
                <IconButton
                    component={RouterLink}
                    // size="small"
                    to={"/settings"}>

                    <ArrowLeftIcon/>
                </IconButton>
                <span>
                    {t('Positions')}
                </span>
            </ListItemText>
            <AddPosition/>
        </div>
    )
};
PositionToolbar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.func,

}
export default PositionToolbar;

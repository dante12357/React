import React, {} from 'react'
import {AddPosition} from "./components";
import PropTypes from 'prop-types';
import {IconButton, ListItemText} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {useTranslation} from "react-i18next";


const PositionToolbar = props => {
    const {} = props;
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

}
export default PositionToolbar;

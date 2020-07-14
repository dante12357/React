import React, {} from 'react'
import {SearchInput} from "../../../../components";
import {AddPosition} from "./components";
import PropTypes from 'prop-types';
import {Card, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
//import ' ./positionToolbar.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';


const PositionToolbar = props => {
    const {onChange, value} = props;

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
                Должности
                </span>
            </ListItemText>
            {/*<SearchInput*/}
            {/*    label={'Введите должность'}*/}
            {/*    placeholder={'Введите должность'}*/}
            {/*    onChange={onChange}*/}
            {/*    value={value}*/}
            {/*/>*/}
            <AddPosition/>
        </div>
    )
};
PositionToolbar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.func,

}
export default PositionToolbar;

import React, {} from 'react'
import {SearchInput} from "../../../../components";
import {AddPosition} from "./components";
import PropTypes from 'prop-types';
import {Card} from "@material-ui/core";
//import ' ./positionToolbar.css'


const PositionToolbar = props =>{
    const { onChange,value } = props;

    return(
        <div className="positionToolbar">
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
PositionToolbar.propTypes ={
    onChange: PropTypes.func,
    value: PropTypes.func,

}
export default PositionToolbar;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,

} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Query} from 'react-apollo'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {toast} from 'react-toastify';
import {getNumPosition_Query} from "../../Position";

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({}));


const RemovePosition = props => {
    const {id, disabled} = props;
    const REMOVE_MUTATION = gql`
        mutation PostMutation( $PositionId: Int!) {
            removePosition(PositionId: $PositionId){
                PositionId,
                position,

            }
        }
    `;
    const classes = useStyles();

    const [state, setState] = useState({});
    const [removePosition, {data}] = useMutation(REMOVE_MUTATION,
        {
            // update(cache) {
            //     const {getNumPosition} = cache.readQuery({query: getNumPosition_Query});
            //     cache.writeQuery({
            //         query: getNumPosition_Query,
            //         data: {getNumPosition: getNumPosition.filter(e => e.PositionId !== id)},
            //     })
            // },
            refetchQueries: [{query: getNumPosition_Query }],

            onError: () => {
                errorPosition()
            },
            onCompleted: () => {
                success()
            }
        });


    const {position} = state;

    const success = () => toast.success('Должность успешно удалена', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });
    const errorPosition = () => toast.error('Нельзя удалить должность пока есть сотрудник с ней', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });

    return (
        <div>
            <IconButton align="center" size="small"
                        disabled={disabled}
                        onClick={() => (removePosition({
                            variables: {PositionId: id},
                        }))}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );

}
RemovePosition.propTypes = {
    id: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
};

export default RemovePosition;

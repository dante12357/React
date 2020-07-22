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
import {useTranslation} from "react-i18next";
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorToast from "../../../../components/Toast/ErrorToast";
import SuccessToast from "../../../../components/Toast/SuccessToast";

const useStyles = makeStyles(() => ({}));


const RemovePosition = props => {
    const {id, disabled} = props;
    const REMOVE_MUTATION = gql`
        mutation RemoveMutation( $PositionId: Int!) {
            removePosition(PositionId: $PositionId){
                PositionId,
                position,

            }
        }
    `;
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

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
                ErrorToast(t('Нельзя удалить должность пока есть сотрудник с ней'))
            },
            onCompleted: () => {
                SuccessToast(t('Должность успешно удалена'))
            }
        });


    const {position} = state;

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

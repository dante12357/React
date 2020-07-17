import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    TextField,

} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Mutation, Query} from 'react-apollo'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {Formik, Form} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify';
import {getNumPosition_Query} from "../../../../Position";

import './addPosition.css'
import {useTranslation} from "react-i18next";
import ErrorToast from "../../../../../../components/Toast/ErrorToast";
import SuccessToast from "../../../../../../components/Toast/SuccessToast";

const useStyles = makeStyles(() => ({}));

const POST_MUTATION = gql`
    mutation PostMutation( $position: String!, $positionCount: Int!) {
        addPosition(position: $position, positionCount: $positionCount){
            PositionId,
            position,
            positionCount
        }
        
    }
`;

const ReviewSchema = yup.object().shape(
    {
        position: yup.string().required("Enter position"),
    });

const AddPosition = props => {
    const {} = props;
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const [state, setState] = useState({});

    const {} = state;

    const [addPosition, {data}] = useMutation(POST_MUTATION,
        {
            // update(client, {data: {addPosition}}) {
            //     const {getNumPosition} = client.readQuery({query: getNumPosition_Query});
            //     client.writeQuery({
            //         query: getNumPosition_Query,
            //         data: {getNumPosition: getNumPosition.concat([addPosition])},
            //     });
            // },
            refetchQueries: [{query: getNumPosition_Query }],
            onError: () =>{
                ErrorToast(t('Such a position already exists'))
            },
            onCompleted: () => {
                SuccessToast(t('Position successfully added'))
            },
        });
    return (
        <Formik
            initialValues={{
                position: '',
                positionCount: +'',
            }}
            validationSchema={ReviewSchema}
            onSubmit={(values, actions) => {
                addPosition({
                    variables: values,
                });
                // resetForm({})
            }}
        >
            {({errors, handleChange, touched, handleBlur}) => (

                <Form className="addPosition"

                      autoComplete="off">
                    <TextField
                        className="addPosition__input"
                        autoComplete="off"
                        error={errors.position}
                        label={t("Add position")}
                        margin="dense"
                        name="position"
                        onChange={handleChange}
                        variant="outlined"
                        helperText={
                            errors.position
                                ? errors.position
                                : null
                        }
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        {t('Add')}
                    </Button>
                </Form>
            )}
        </Formik>

    );
};

AddPosition.propTypes = {};

export default AddPosition;

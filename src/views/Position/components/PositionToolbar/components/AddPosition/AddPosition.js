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
import {position_Query} from "../../../../Position";

import './addPosition.css'

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
        position: yup.string().required("Введите должность"),
    });

const AddPosition = props => {
    const {} = props;
    const classes = useStyles();

    const [state, setState] = useState({});

    const {} = state;

    const success = () => toast.success('Должность успешно добавлена', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });
    const errorPosition = () => toast.error('Такая должность уже существует', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });

    const [addPosition, {data}] = useMutation(POST_MUTATION,
        {
            update(store, {data: {addPosition}}) {
                const {getNumPosition} = store.readQuery({query: position_Query});
                store.writeQuery({
                    query: position_Query,
                    data: {getNumPosition: getNumPosition.concat([addPosition])},
                });
            },
            onError: () =>{
                errorPosition()
            },
            onCompleted: () => {
                success()
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
                        label="Добавить Должность"
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
                        Добавить
                    </Button>
                </Form>
            )}
        </Formik>

    );
};

AddPosition.propTypes = {};

export default AddPosition;

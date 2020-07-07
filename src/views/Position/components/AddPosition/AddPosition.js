import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    TextField,

} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Mutation, Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Formik, Form} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify';

import {position_Query} from "../../Position";

const useStyles = makeStyles(() => ({

}));

const POST_MUTATION = gql`
    mutation PostMutation( $position: String!) {
        addPosition(position: $position){
            id,
            position,

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

    const {position} = state;

    const success = () => toast.success('Должность успешно добавлена', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });

    return (

        <Mutation mutation={POST_MUTATION} variables={{position}}
                  update={(cache, {data: {addPosition}}) => {
                      const {allPositions} = cache.readQuery({query: position_Query});
                      cache.writeQuery({
                          query: position_Query,
                          data: {allPositions: allPositions.concat([addPosition])},
                      });
                  }}>
            {(addPosition, {data}) =>

                <Formik
                    initialValues={{
                        position: '',
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values, actions) => {
                        addPosition({
                            variables: values,
                        });
                        success();
                    }}
                >
                    {({errors, handleChange, touched, handleBlur}) => (

                        <Form autoComplete="off">
                            <TextField
                                autoComplete="off"
                                error={errors.position}
                                label="Добавить Должность"
                                margin="dense"
                                name="position"
                                onChange={handleChange}
                                variant="outlined"
                                helperText={
                                    errors.position && touched.position
                                        ? errors.position
                                        : null
                                }
                            />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit">
                                    Добавить
                                </Button>
                        </Form>
                    )}
                </Formik>
            }
        </Mutation>
    );
};

AddPosition.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeForm: PropTypes.func,

};

export default AddPosition;

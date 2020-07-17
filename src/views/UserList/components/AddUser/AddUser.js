import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './addUser.css'
import {
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    Drawer,
    InputAdornment,
    MenuItem,
    Checkbox,
    FormControlLabel,
    IconButton
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import {makeStyles} from '@material-ui/core/styles';
import {Query} from 'react-apollo'
import {useMutation, useQuery} from '@apollo/react-hooks';

import gql from 'graphql-tag'
import {Formik, Field, Form} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify';
import {DatePickerField} from "./components";
import {User_Query} from "../../UserList";
import {useTranslation} from "react-i18next";
import ErrorToast from "../../../../components/Toast/ErrorToast";
import SuccessToast from "../../../../components/Toast/SuccessToast";

const useStyles = makeStyles(() => ({
    drawer: {
        width: 540,
    },
}));

const POST_MUTATION = gql`
    mutation PostMutation( $name: String!,  $lastName: String!, $birthday: String!, $email: String!,
        $dateEmployment: String!, $phone: String!, $probation: Int!, $salary: Int!, $position_id: Int!,  $avatarUrl: String!) {

        addUser(name: $name, last_name: $lastName, birthday: $birthday, email: $email, date_employment: $dateEmployment,
            phone: $phone, probation: $probation, salary: $salary, position_id: $position_id, avatar_url: $avatarUrl) {
            id,
            name,
            last_name,
            birthday,
            email,
            date_employment,
            phone,
            probation,
            salary,
            position_id,
            avatar_url
        }
    }
`;
const position_Query = gql`
    {
        allPositions{
            PositionId,
            position,
        }
    }
`;
// const phoneRegExp =/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/;


const AddUser = props => {
    const {open, onClose, closeForm} = props;
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const ReviewSchema = yup.object().shape(
        {
            name: yup.string().required(t("Enter name")),
            lastName: yup.string().required(t("Enter last name")),
            // birthday: yup.string().required("Выберите дату дня рождения"),
            email: yup.string().required(t("Enter email")).email(t("Incorrect email format")),
            //dateEmployment: yup.date().required("Выберите дату приёма на работу"),
            phone: yup.string().required(t("Enter number"))
            // .matches(phoneRegExp,"Неправильно написан номер")
            ,
            //probation: yup.string().oneOf(['1 месяц', '2 месяца', '3 месяца', '4 месяца'], "Выберите один из сроков").required(),
            salary: yup.number().min(0, t("The salary is negative, and YOU are a genius")).required(t("Enter salary")),
            position_id: yup.string().required(t("Select position")),

        });

    const [state, setState] = useState({
        disabled: false,
        avatar_url: ''
    });
    const {disabled} = state;

    const handleChan = event => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };

    const dateProbation = [
        {
            value: 1,
            label: '1 месяц',
        },
        {
            value: 2,
            label: '2 месяца',
        },
        {
            value: 3,
            label: '3 месяца',
        },
        {
            value: 4,
            label: '4 месяца',
        },
    ];

    const [addUser, {}] = useMutation(POST_MUTATION,
        {
            // update(store, {data: {addUser}}) {
            //     const {allUsers} = store.readQuery({query: User_Query});
            //     store.writeQuery({
            //         query: User_Query,
            //         data: {allUsers: allUsers.concat([addUser])},
            //     });
            // },
            refetchQueries: [{query: User_Query}],

            onError: () => {
                ErrorToast(t('Error adding employee'))
            },
            onCompleted: () => {
                   SuccessToast(t('Employee added successfully'))
                closeForm(false)

            },

        });
    const {loading, error, data} = useQuery(position_Query, {
        // pollInterval: 500,
        fetchPolicy: "network-only"
    })
    if (loading) return <div>loading</div>
    if (error) return <div>Error</div>
    return (

        <Drawer
            classes={{paper: classes.drawer}}
            onClose={onClose}
            open={open}
            anchor="right"
            variant="temporary">

            <div>

                <Formik
                    initialValues={{
                        name: '',
                        lastName: '',
                        birthday: new Date(),
                        email: '',
                        dateEmployment: new Date(),
                        phone: '',
                        probation: 1,
                        salary: '',
                        avatarUrl: '',
                        position_id: '',
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values, actions) => {

                        values['probation'] = disabled ? 0 : values['probation'];
                        addUser({
                            variables: values,
                        });
                    }}
                >
                    {({errors, handleChange, touched, handleBlur}) => (

                        <Form autoComplete="off">
                            <IconButton onClick={() => {
                                closeForm(false)
                            }}>
                                <ChevronRightIcon/>
                            </IconButton>
                            <CardHeader

                                subheader={t("Add new employee")}
                                title={t("Adding an employee")}
                            />
                            <Divider/>

                            <CardContent>
                                <Grid spacing={3}>
                                    <TextField
                                        autoFocus
                                        autoComplete="off"
                                        error={errors.name && touched.name}
                                        fullWidth
                                        label={t("Name")}
                                        margin="dense"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : null
                                        }
                                    />

                                    <TextField
                                        error={errors.lastName && touched.lastName}
                                        fullWidth
                                        label={t("Last name")}
                                        margin="dense"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        helperText={
                                            errors.lastName && touched.lastName
                                                ? errors.lastName
                                                : null
                                        }
                                    />
                                    <Field
                                        name="birthday"
                                        component={DatePickerField}
                                        label={t("Birthday")}

                                    />
                                    <TextField
                                        error={errors.email && touched.email}
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        helperText={
                                            errors.email && touched.email
                                                ? errors.email
                                                : null
                                        }
                                    />

                                    <Field
                                        name="dateEmployment"
                                        component={DatePickerField}
                                        label={t("Employment date")}

                                    />

                                    <TextField
                                        error={errors.phone && touched.phone}
                                        fullWidth
                                        label={t("Phone")}
                                        margin="dense"
                                        name="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        helperText={
                                            errors.phone && touched.phone
                                                ? errors.phone
                                                : null
                                        }
                                    />
                                    <TextField
                                        fullWidth
                                        select
                                        label={t("Trial period")}
                                        margin="dense"
                                        name="probation"
                                        onChange={handleChange}
                                        variant="outlined"
                                        defaultValue={1}
                                        disabled={disabled}
                                        displayEmpty
                                    >
                                        {dateProbation.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormControlLabel
                                        margin="dense"
                                        control={
                                            <Checkbox
                                                name="disabled"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleChan(e);
                                                }}
                                                checked={disabled}

                                            />}
                                        label={t("No probationary period")}
                                    />

                                    <TextField
                                        error={errors.salary && touched.salary}
                                        fullWidth
                                        label={t("Salary")}
                                        margin="dense"
                                        name="salary"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={
                                            errors.salary && touched.salary
                                                ? errors.salary
                                                : null
                                        }
                                    />

                                    <TextField
                                        error={errors.position_id && touched.position_id}
                                        select
                                        fullWidth
                                        label={t("Position")}
                                        margin="dense"
                                        name="position_id"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        helperText={
                                            errors.position_id && touched.position_id
                                                ? errors.position_id
                                                : null
                                        }
                                    >

                                        {data.allPositions.map((option) => (
                                            <MenuItem key={option.PositionId} value={option.PositionId}>
                                                {option.position}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Grid>
                            </CardContent>
                            <CardActions>

                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit">
                                    {t('Add')}
                                </Button>
                            </CardActions>

                        </Form>

                    )}
                </Formik>

            </div>
        </Drawer>
    );
};

AddUser.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeForm: PropTypes.func,

};

export default AddUser;

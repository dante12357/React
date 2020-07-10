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
import {useMutation} from '@apollo/react-hooks';

import gql from 'graphql-tag'
import {Formik, Field, Form} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify';
import {DatePickerField} from "./components";
import {User_Query} from "../../UserList";

const useStyles = makeStyles(() => ({
    drawer: {
        width: 540,
    }
}));

const POST_MUTATION = gql`
    mutation PostMutation( $name: String!,  $lastName: String!, $birthday: String!, $email: String!,
        $dateEmployment: String!, $phone: String!, $probation: String!, $salary: Int!, $position_id: Int!,  $avatarUrl: String!) {

        addUser(name: $name, lastName: $lastName, birthday: $birthday, email: $email, dateEmployment: $dateEmployment,
            phone: $phone, probation: $probation, salary: $salary, position_id: $position_id, avatarUrl: $avatarUrl) {
            id,
            name,
            lastName,
            birthday,
            email,
            dateEmployment,
            phone,
            probation,
            salary,
            position,
            position_id,
            avatarUrl
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

const ReviewSchema = yup.object().shape(
    {
        name: yup.string().required("Введите имя "),
        lastName: yup.string().required("Введите фамилию"),
        // birthday: yup.string().required("Выберите дату дня рождения"),
        email: yup.string().required("Введите email").email("Неправильный формат email"),
        //dateEmployment: yup.date().required("Выберите дату приёма на работу"),
        phone: yup.string().required("Введите номер")
        // .matches(phoneRegExp,"Неправильно написан номер")
        ,
        //probation: yup.string().oneOf(['1 месяц', '2 месяца', '3 месяца', '4 месяца'], "Выберите один из сроков").required(),
        salary: yup.number().min(0, "Зарплата отрицательная, а ВЫ гений").required("Введите зарплату"),
        position_id: yup.string().required("Добавьте должность"),

    });

const AddUser = props => {
    const {open, onClose, closeForm} = props;
    const classes = useStyles();

    const [state, setState] = useState({
        disabled: false,
        avatarUrl: ''
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
            value: '1 месяц',
            label: '1 месяц',
        },
        {
            value: '2 месяца',
            label: '2 месяца',
        },
        {
            value: '3 месяца',
            label: '3 месяца',
        },
        {
            value: '4 месяца',
            label: '4 месяца',
        },
    ];

    const success = () => toast.success('Сотрудник успешно добавлен', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });
    const errorToast = () => toast.error('Ошибка', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });

    const [addUser, {data}] = useMutation(POST_MUTATION,
        {
            update(cache, {data: {addUser}}) {
                const {allUsers} = cache.readQuery({query: User_Query});
                cache.writeQuery({
                    query: User_Query,
                    data: {allUsers: allUsers.concat([addUser])},
                });
            },
            onError: () => {
                errorToast()
            },
            onCompleted: () => {
                success()
            },

        });

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
                        probation: '1 месяц',
                        salary: '',
                        position: '',
                        avatarUrl: '',
                        position_id: '',
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={(values, actions) => {

                        values['probation'] = disabled ? "Нет испытательного срока" : values['probation'];
                        addUser({
                            variables: values,

                        });

                        closeForm(false)
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
                                subheader="Добавьте нового сотрудника"
                                title="Добавление сотрудника"
                            />
                            <Divider/>

                            <CardContent>
                                <Grid spacing={3}>
                                    <TextField
                                        autoFocus
                                        autoComplete="off"
                                        error={errors.name && touched.name}
                                        fullWidth
                                        label="Имя"
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
                                        label="Фамилия"
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
                                        label="День рождения"


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
                                        label="Дата приёма на работу"

                                    />

                                    <TextField
                                        error={errors.phone && touched.phone}
                                        fullWidth
                                        label="Номер телефона"
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
                                        label="Продолжительность испытательного срока"
                                        margin="dense"
                                        name="probation"
                                        onChange={handleChange}
                                        variant="outlined"
                                        defaultValue={'1 месяц'}
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
                                        label="Без испытательного срока"
                                    />

                                    <TextField
                                        error={errors.salary && touched.salary}
                                        fullWidth
                                        label="Зарплата"
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
                                    <Query query={position_Query}>
                                        {({loading, error, data}) => {
                                            if (loading) return <div></div>
                                            if (error) return <div>Error</div>
                                            return (
                                                <TextField
                                                    error={errors.position_id && touched.position_id}
                                                    select
                                                    fullWidth
                                                    label="Должность"
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
                                            )
                                        }}
                                    </Query>
                                </Grid>
                            </CardContent>
                            <CardActions>

                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit">
                                    Добавить
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

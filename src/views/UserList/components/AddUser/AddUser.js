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
    Drawer, useTheme, useMediaQuery,
    InputAdornment,
    MenuItem,
    Checkbox,
    FormControlLabel,
    IconButton
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import {makeStyles} from '@material-ui/core/styles';
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {Formik, Field, Form} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify';
import {DatePickerField} from "./components";

const useStyles = makeStyles(() => ({
    drawer: {
        width: 540,
    }
}));

const POST_MUTATION = gql`
    mutation PostMutation( $name: String!,  $lastName: String!, $birthday: String!, $email: String!,
        $dateEmployment: String!, $phone: String!, $probation: String!, $salary: Int!, $position: String!) {

        addUser(name: $name, lastName: $lastName, birthday: $birthday, email: $email, dateEmployment: $dateEmployment,
            phone: $phone, probation: $probation, salary: $salary, position: $position) {
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
        }
    }
`;


const ReviewSchema = yup.object().shape({
    name: yup.string().required("Введите имя "),
    lastName: yup.string().required("Введите фамилию"),
    birthday: yup.string().required("Выберите дату дня рождения"),
    email: yup.string().required("Введите email"),
    //dateEmployment: yup.date().required("Выберите дату приёма на работу"),
    //phone: yup.string().required("This field is required."),
    //probation: yup.string().oneOf(['1 месяц', '2 месяца', '3 месяца', '4 месяца'], "Выберите один из сроков").required(),
    salary: yup.number().min(0, "Зарплата отрицательная, а ВЫ гений").required("Введите зарплату"),
    position: yup.string().required("Добавьте должность"),

});

const AddUser = props => {
    const {open, onClose, closeForm} = props;
    const classes = useStyles();

    const [state, setState] = useState({
        disabled: false
    });

    const {name, lastName, birthday, email, dateEmployment, phone, probation, salary, position, disabled} = state;

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

    return (

        <Drawer
            classes={{paper: classes.drawer}}
            onClose={onClose}
            open={open}
            anchor="right"
            variant="temporary">

            <Mutation mutation={POST_MUTATION} variables={{
                name, lastName, birthday,
                email, dateEmployment, phone, probation, salary, position
            }}>
                {(addUser, {data}) =>

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
                        }}
                        validationSchema={ReviewSchema}
                        onSubmit={(values, actions) => {

                            values['probation'] = disabled ? "Нет испытательного срока" :  values['probation'] ;

                            addUser({
                                variables: values
                            });
                            success();
                            handleSidebarClose();
                            props.closeForm(false)
                        }}
                    >
                        {({errors, handleChange, touched}) => (

                            <Form
                                autoComplete="off"
                            >
                                <IconButton onClick={() => {props.closeForm(false)}}>
                                    <ChevronRightIcon />
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
                                            error={errors.birthday && touched.birthday}
                                            label="День рождения"

                                            helperText={
                                                errors.birthday && touched.birthday
                                                    ? errors.birthday
                                                    : null
                                            }
                                        />
                                        <TextField
                                            error={errors.email && touched.email}
                                            fullWidth
                                            label="Email"
                                            margin="dense"
                                            name="email"
                                            onChange={handleChange}
                                            variant="outlined"
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : null
                                            }
                                        />

                                        {/*<TextField*/}
                                        {/*    error={errors.dateEmployment && touched.dateEmployment}*/}
                                        {/*    fullWidth*/}
                                        {/*    label="Дата приёма на работу"*/}
                                        {/*    margin="dense"*/}
                                        {/*    name="dateEmployment"*/}
                                        {/*    onChange={handleChange}*/}
                                        {/*    variant="outlined"*/}
                                        {/*    type='date'*/}
                                        {/*    helperText={*/}
                                        {/*        errors.dateEmployment && touched.dateEmployment*/}
                                        {/*            ? errors.dateEmployment*/}
                                        {/*            : null*/}
                                        {/*    }*/}
                                        {/*/>*/}
                                        <Field
                                            name="dateEmployment"
                                            component={DatePickerField}
                                            error={errors.dateEmployment && touched.dateEmployment}
                                            label="Дата приёма на работу"
                                            helperText={
                                                errors.dateEmployment && touched.dateEmployment
                                                    ? errors.dateEmployment
                                                    : null
                                            }
                                        />

                                        <TextField
                                            error={errors.phone && touched.phone}
                                            fullWidth
                                            label="Номер телефона"
                                            margin="dense"
                                            name="phone"
                                            onChange={handleChange}
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
                                            error={errors.position && touched.position}
                                            fullWidth
                                            label="Должность"
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
                }
            </Mutation>
        </Drawer>
    );
};

AddUser.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeForm: PropTypes.func,

};

export default AddUser;

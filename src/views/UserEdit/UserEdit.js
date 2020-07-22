import React, {useState} from 'react'
import PropTypes from "prop-types";
import {
    Button,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Card
} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {DatePickerField} from "../UserList/components/AddUser/components";
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import * as yup from 'yup'
import './userEdit.css'
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import ErrorToast from '../../components/Toast/ErrorToast'
import SuccessToast from "../../components/Toast/SuccessToast";
import {NavLink as RouterLink} from "react-router-dom";


const User_Query = gql`
    query ($id : Int!){
        user(id: $id){
            id,
            name,
            last_name,
            email,
            phone,
            birthday,
            date_employment,
            probation,
            #            salary,
            position_id
        },
        allPositions{
            PositionId,
            position,
        }
    }`

const POST_MUTATION = gql`
    mutation PostMutation($id:Int!, $name: String!,  $lastName: String!, $birthday: String!, $email: String!,
        $dateEmployment: String!, $phone: String!, $probation: Int!,
        #        $salary: Int!,
        $position_id: Int!) {
        changeUser(id: $id, name: $name, last_name: $lastName, birthday: $birthday, email: $email, date_employment: $dateEmployment,
            phone: $phone, probation: $probation,
            #            salary: $salary,
            position_id: $position_id){
            id,
            name,
            last_name,
            birthday,
            email,
            date_employment,
            phone,
            probation,
            #            salary,
            position_id,

        }}
`

const useStyles = makeStyles(() => ({
    buttonRoot: {
        color: '#fff',
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: "#d32f2f"
        }

    },
}));
const UserEdit = props => {
    const {match: {params: {id}}} = props;
    const {t, i18n} = useTranslation('translation');

    const classes = useStyles();

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
            // salary: yup.number().min(0, t("The salary is negative, and YOU are a genius")).required(t("Enter salary")),
            position_id: yup.string().required(t("Select position")),

        });

    const [changeUser, {}] = useMutation(POST_MUTATION, {
        // refetchQueries: [{query: User_Query }],
        variables: {id: +id},

        onError: () => {
            ErrorToast(t('Ошибка'))
        },
        onCompleted: () => {
            SuccessToast(t('Сотрудник успешно изменен'))
        },
    })

    const {loading, error, data} = useQuery(User_Query, {
        // pollInterval: 500,
        variables: {id: +id},
        fetchPolicy: "network-only",
        onCompleted: () => {
            setState({disabled: (data.user.probation > 0) ? false : true})

        }
    });

    if (loading) return <div>loading</div>
    if (error) return <div>Error</div>

    return (
        <div className="userEdit">

            <Formik
                initialValues={{
                    name: data.user.name,
                    lastName: data.user.last_name,
                    birthday: data.user.birthday,
                    email: data.user.email,
                    dateEmployment: data.user.date_employment,
                    phone: data.user.phone,
                    probation: +data.user.probation,
                    // salary: +data.user.salary,
                    position: data.user.position,
                    avatarUrl: data.user.avatar_url,
                    position_id: data.user.position_id,
                }}
                validationSchema={ReviewSchema}
                onSubmit={(values, actions) => {

                    values['probation'] = disabled ? 0 : values['probation'];
                    changeUser({
                        variables: values,

                    });
                }}
            >
                {({errors, handleChange, touched, handleBlur}) => (

                    <Form autoComplete="off">
                        <CardHeader
                            className="cardHeader"
                            // subheader="Добавьте нового сотрудника"
                            title={t("Employee editing")}
                        />
                        <Card>

                            <Divider/>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={data.user.name}
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
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            defaultValue={data.user.last_name}
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
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <Field
                                            defaultValue={data.user.birthday}
                                            name="birthday"
                                            component={DatePickerField}
                                            label={t("Birthday")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            defaultValue={data.user.email}
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
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            defaultValue={data.user.date_employment}
                                            name="dateEmployment"
                                            component={DatePickerField}
                                            label={t("Employment date")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            defaultValue={data.user.phone}
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

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={(data.user.probation == 0) ? 1 : data.user.probation}
                                            fullWidth
                                            select
                                            label={t("Trial period")}
                                            margin="dense"
                                            name="probation"
                                            onChange={handleChange}
                                            variant="outlined"
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
                                    </Grid>
                                    {/*<Grid item xs={12} sm={6}>*/}

                                    {/*    <TextField*/}
                                    {/*        defaultValue={data.user.salary}*/}
                                    {/*        error={errors.salary && touched.salary}*/}
                                    {/*        fullWidth*/}
                                    {/*        label={t("Salary")}*/}
                                    {/*        margin="dense"*/}
                                    {/*        name="salary"*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        onBlur={handleBlur}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        type="number"*/}
                                    {/*        InputProps={{*/}
                                    {/*            startAdornment: (*/}
                                    {/*                <InputAdornment position="start">*/}
                                    {/*                    $*/}
                                    {/*                </InputAdornment>*/}
                                    {/*            ),*/}
                                    {/*        }}*/}
                                    {/*        helperText={*/}
                                    {/*            errors.salary && touched.salary*/}
                                    {/*                ? errors.salary*/}
                                    {/*                : null*/}
                                    {/*        }*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            defaultValue={data.user.position_id}
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
                                    <Grid container item spacing={2}>
                                        <Grid item>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit">
                                                {t('Change')}
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button


                                                component={RouterLink}
                                                to={'/users/' + data.user.id}
                                                classes={{
                                                    root: classes.buttonRoot
                                                }}
                                                variant="contained"
                                            >
                                                {t('Cancel')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>

                        </Card>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

UserEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number
        })
    }),
};

export default UserEdit

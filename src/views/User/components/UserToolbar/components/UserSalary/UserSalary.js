import React, {useState} from 'react'
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {
    Grid,
    Card,
    TableBody,
    TableRow,
    TableCell,
    Table,
    TextField,
    CardContent,
    Button,
    CardActions, CardHeader, Divider, MenuItem
} from "@material-ui/core"
import {useTranslation} from "react-i18next";
import {NavLink as RouterLink} from "react-router-dom";
import {DatePickerField} from "../../../../../UserList/components/AddUser/components";
import {Formik, Field, Form} from "formik";

const useStile = makeStyles(() => ({
    rootLeftTableCell: {
        fontWeight: 500,
    },
    titleCardHeader: {
        fontSize: '20px',
    },
}))

const UserSalary = props => {
    const {data} = props;
    const {t, i18n} = useTranslation('translation');

    const classes = useStile()

    const reviewPeriod = [
        {
            value: 0,
            label: '0 месяц',
        },
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

    return (

        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                    <CardHeader
                        classes={{
                            title: classes.titleCardHeader,
                        }}
                        title={t("Salary Info")}
                    />
                    <Divider/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Current salary')}:</TableCell>
                                <TableCell>{data.userSalary.salary}$</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell
                                classes={{
                                    root: classes.rootLeftTableCell
                                }}
                            >{t('Last review date')}:</TableCell>
                            <TableCell>{data.userSalary.active_from}</TableCell>
                        </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Next review date')}:</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Salary review period')}:</TableCell>
                                <TableCell>{data.userSalary.review_period}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Formik
                    initialValues={{
                        newSalary: '',
                        activeFrom: new Date(),
                        reviewPeriod: new Date(),

                    }}>
                    {({errors, handleChange, touched, handleBlur}) => (
                        <Form autoComplete="off">
                            <Card>
                                <CardHeader
                                    classes={{
                                        title: classes.titleCardHeader,
                                    }}
                                    title={t("Update salary")}
                                />
                                <Divider/>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={4} xl={3}>
                                            <TextField
                                                // defaultValue={data.user.name}
                                                autoComplete="off"
                                                // error={errors.name && touched.name}
                                                fullWidth
                                                label={t("New salary")}
                                                margin="dense"
                                                name="newSalary"
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                variant="outlined"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={4} xl={3}>

                                            <Field
                                                // defaultValue={data.user.date_employment}
                                                name="activeFrom"
                                                component={DatePickerField}
                                                label={t("Active from")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={4} xl={3}>

                                            <TextField
                                                defaultValue={(data.user.probation == 0) ? 1 : data.user.probation}
                                                fullWidth
                                                select
                                                label={t("Review period")}
                                                margin="dense"
                                                name="reviewPeriod"
                                                onChange={handleChange}
                                                variant="outlined"
                                                displayEmpty
                                            >
                                                {reviewPeriod.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="off"
                                                label={t("Notes")}
                                                fullWidth
                                                // multiline
                                                rows={2}
                                                rowsMax={4}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                variant="contained"
                                            >
                                                {t('Save')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <Card>
                    <CardHeader
                        classes={{
                            title: classes.titleCardHeader,
                        }}
                        title={t("Change history")}
                    />
                    <Divider/>
                    <Table>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    )
}

UserSalary.propTypes = {
    data: PropTypes.array.isRequired,

};

export default UserSalary

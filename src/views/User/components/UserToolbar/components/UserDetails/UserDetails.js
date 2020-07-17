import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {
    Card,
    Grid,
    Tabs,
    Tab,
    Box,
    AppBar,
    Divider,
    ListItem,
    ListItemText,
    CardHeader,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button
} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    title: {
        fontSize: '16px',

    },
    root:{
      fontWeight:500,
    },
    action: {
        marginTop: '4px',
    }
}));
const UserDetails = props => {
    const {data} = props
    const { t, i18n } = useTranslation('translation');

    const classes = useStyles();

    return (
        <Grid container>
            <Grid xs={12} md={6} lg={4} xl={3} >
                <Card>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            action: classes.action,
                        }}

                    title={t("Employee Information")}
                    action={ <Button color="primary"
                                     component={RouterLink}
                                     to={'/users/edit/' + data.user.id}
                                     // variant="contained"
                    >{t('Edit')}</Button>}
                    />

                    <Divider/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    classes={{
                                    root:classes.root
                                }}
                                >Email</TableCell>
                                <TableCell>{data.user.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root:classes.root
                                    }}
                                >{t('Phone')}</TableCell>
                                <TableCell>{data.user.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root:classes.root
                                    }}
                                >{t('Birthday')}</TableCell>
                                <TableCell>{data.user.birthday}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root:classes.root
                                    }}
                                >{t('Employment date')}</TableCell>
                                <TableCell>{data.user.date_employment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root:classes.root
                                    }}
                                >{t('Trial period')}</TableCell>
                                <TableCell>{(data.user.probation > 0 ) ? <span> {data.user.probation} {t('M')}</span>  :
                                    <span>{t('No trial period')}</span>}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root:classes.root
                                    }}
                                >{t('Salary')}</TableCell>
                                <TableCell>{data.user.salary}$</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    )
}
UserDetails.propTypes = {

    data: PropTypes.array.isRequired,
};


export default UserDetails

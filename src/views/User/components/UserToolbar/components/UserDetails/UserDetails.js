import React from 'react'
import PropTypes from 'prop-types';
import {
    Card,
    Grid,
    Divider,
    CardHeader,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button
} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorToast from "../../../../../../components/Toast/ErrorToast";
import SuccessToast from "../../../../../../components/Toast/SuccessToast";

const useStyles = makeStyles(() => ({
    rootLeftTableCell: {
        fontWeight: 500,
    },
    buttonRoot: {
        color: '#fff',
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: "#d32f2f"
        }
    },
    // buttonRoot: {
    //     color: '#fff',
    //     backgroundColor: '#f44336',
    //
    // },
    titleCardHeader: {
        fontSize: '16px',
    },
}));

const REMOVE_MUTATION = gql`
    mutation RemoveMutation($id: Int!){
        removeUser(id:$id){
            id
        }
    }
`;

const UserDetails = props => {
    const {data} = props
    const {t, i18n} = useTranslation('translation');
    const classes = useStyles();

    const [removeUser, {}] = useMutation(REMOVE_MUTATION, {
        onError: () => {
            ErrorToast(t('Error'))
        },
        onCompleted: () => {
            SuccessToast(t('Employee deleted successfully'))
        }
    })
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                    <CardHeader
                        classes={{
                            title: classes.titleCardHeader,
                        }}

                        title={t("Employee Information")}
                        action={<Button color="primary"
                                        component={RouterLink}
                                        to={'/users/edit/' + data.user.id}
                            // variant="contained"
                        >{t('Change')}</Button>}
                    />

                    <Divider/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >Email</TableCell>
                                <TableCell>{data.user.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Phone')}</TableCell>
                                <TableCell>{data.user.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Birthday')}</TableCell>
                                <TableCell>{data.user.birthday}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Employment date')}</TableCell>
                                <TableCell>{data.user.date_employment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Trial period')}</TableCell>
                                <TableCell>{(data.user.probation > 0) ? <span> {data.user.probation} {t('M')}</span> :
                                    <span>{t('No probationary period')}</span>}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >{t('Salary')}</TableCell>
                                <TableCell>{data.userSalary.salary}$</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            action: classes.action,
                        }}
                        title={t("Other actions")}
                    />
                    <Divider/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    classes={{
                                        root: classes.rootLeftTableCell
                                    }}
                                >
                                    <Button
                                        component={RouterLink}
                                        to={'/users'}
                                        classes={{
                                            root: classes.buttonRoot
                                        }}
                                        variant="contained"
                                        onClick={() => (
                                            removeUser({
                                                variables: {id: +data.user.id}
                                            })
                                        )}
                                    >
                                        <DeleteIcon/>Delete employee
                                    </Button>
                                </TableCell>
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

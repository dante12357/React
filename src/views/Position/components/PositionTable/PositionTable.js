import React, {forwardRef} from 'react';
import {
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton

} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
// import './table.css';
import {NavLink as RouterLink} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles(() => ({}));

const PositionTable = props => {
    const {data, header} = props;
    const classes = useStyles();

    return (
            <Table>
                <TableHead>
                    <TableRow>
                        {header.map((head) =>
                            <TableCell key={head.name} className="headTableCell" size="medium"
                                       align="center">{head.name}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((column) =>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">
                                    {column.position}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row" >
                                0
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <IconButton align="center" size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
    );
};


PositionTable.propTypes = {
    data: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired
};

export default PositionTable;

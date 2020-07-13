import React, {useState} from 'react';
import {
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import RemovePosition from "../RemovePosition";
import "./positionTable.css"

const useStyles = makeStyles(() => ({}));


const PositionTable = props => {
    const {data, header} = props;

    const [sortedField, setSortedField] = React.useState(null);

    if (sortedField !== null) {
        data.sort((a, b) => {
            if(typeof (a[sortedField.key]) !== "number" ){
            if (a[sortedField.key].toLowerCase() < b[sortedField.key].toLowerCase()) {
                return sortedField.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortedField.key].toLowerCase() > b[sortedField.key].toLowerCase()) {
                return sortedField.direction === 'ascending' ? 1 : -1;
            }
            return 0;
         } else {
                if (a[sortedField.key] < b[sortedField.key]) {
                    return sortedField.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortedField.key] > b[sortedField.key]) {
                    return sortedField.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        }

         );
    }
    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortedField &&
            sortedField.key === key &&
            sortedField.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortedField({key, direction});
    };

    const getClassNamesFor = (name) => {
        if (!sortedField) {
            return;
        }
        return sortedField.key === name ? sortedField.direction : undefined;
    };

    const classes = useStyles();
    return (

        <Table className="positionTable">
            <TableHead>
                <TableRow>
                    {header.map((head) =>
                        <TableCell key={head.name} className="headTableCell" size="medium"
                                   align="center">
                            {head.prop=="position" || head.prop=="positionCount" ? <Button className={"headTableCell__button "} onClick={() => requestSort(head.prop)}>
                                {head.name}
                            </Button> : <div> {head.name}</div>
                            }
                        </TableCell>
                    )}
                </TableRow>
            </TableHead>

            <TableBody>
                {data.map((column) =>
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">
                            {column.position}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                            {column.positionCount}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                            <RemovePosition
                                id={column.PositionId}
                                disabled={(column.positionCount == 0) ? false : true}
                            />
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

import React, {forwardRef} from 'react';
import {
  Avatar,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody

} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import './table.css';
import {NavLink as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
// const row = (
//   column,
// ) => {
//   const avatar = column.avatarUrl;
//   return (
//     <TableRow component={RouterLink} key={column.id} to={'/users/' + column.id} className="bodyTableRow">
//       <TableCell className="bodyTableCell" component="th" scope="row">
//         <div className="nameContainer">
//           {avatar ? (<Avatar className="avatar" src={column.avatarUrl}/>)
//             : (<Avatar className="avatar" >{column.name[0]}</Avatar>) }
//
//           {column.name} {column.lastName}
//         </div>
//       </TableCell>
//       <TableCell component="th" scope="row">
//         <div>
//           {column.phone}
//         </div>
//       </TableCell>
//       <TableCell component="th" scope="row">
//         <div>
//           {column.email}
//         </div>
//       </TableCell>
//       <TableCell component="th" scope="row">
//         <div>
//           {column.position}
//         </div>
//       </TableCell>
//     </TableRow>
//   );
// };

const useStyles = makeStyles(() => ({}));

const UserTable = props => {
  const {data, header} = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  return (
    <Paper className="paper">
      <Table>
        <TableHead>
          <TableRow>
            {header.map((head) =>
              <TableCell key={head.name} className="headTableCell" size="medium" align="left">{t(head.name)}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((column) =>
              <TableRow component={RouterLink} key={column.id} to={'/users/' + column.id} hover className="bodyTableRow">
                  <TableCell className="bodyTableCell" component="th" scope="row">
                      <div className="nameContainer">
                          {column.avatar_url ? (<Avatar className="avatar" src={column.avatar_url}/>)
                              : (<Avatar className="avatar" >{column.name[0]}</Avatar>) }

                          {column.name} {column.last_name}
                      </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                      <div>
                          {column.phone}
                      </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                      <div>
                          {column.email}
                      </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                      <div>
                          {column.position}
                      </div>
                  </TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};


UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired
};

export default UserTable;

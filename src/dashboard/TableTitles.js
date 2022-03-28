import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
const TableTitles = (props) => {
    return (
        <TableRow>
            <TableCell align="center" style={{ color: 'wheat' }}>Order Type</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>New</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Prepared</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Processing</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Complete</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Pending</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Cancelled</TableCell>
            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
        </TableRow>
    );
};

export default TableTitles;

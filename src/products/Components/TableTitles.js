import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const TableTitles = () => {
    return (
        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
            <TableRow>
                <TableCell style={{ color: 'wheat' }}>Product Id</TableCell>
                <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Title</TableCell>
                <TableCell align="left" style={{ color: 'wheat' }}>Express</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Price</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Sale Price</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Stock Quantity</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableTitles;

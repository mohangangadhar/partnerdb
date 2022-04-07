import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const TableTitles = ({ auth }) => {
    return (
        <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
            <TableRow>
                <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                <TableCell style={{ color: 'wheat' }}>{auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? "User Name" : "User Id"}</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Order Date</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Delivery Date</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Pincode</TableCell>
                <TableCell align="center" style={{ color: 'wheat' }}>Total Value</TableCell>
                <TableCell style={{ color: 'wheat' }}>Vendor Name</TableCell>
                <TableCell style={{ color: 'wheat' }}>Final Total</TableCell>
                <TableCell style={{ color: 'wheat' }}>Coupon Code</TableCell>

                <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableTitles;

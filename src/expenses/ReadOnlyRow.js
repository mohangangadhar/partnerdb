import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    handleEditClick
}) => {

    // active: 1
    // clearedBy: "Jason"
    // clearedDate: "2022-04-03"


    return (
        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
            <TableCell align="center" >{row.expenseId}</TableCell>
            <TableCell >{row.memberName}</TableCell>
            <TableCell align="center" >{row.amount}</TableCell>

            <TableCell align="center">{row.category}</TableCell>
            <TableCell align="center">{row.subCategory}</TableCell>
            <TableCell align="center">{row.paymentStatus}</TableCell>
            <TableCell align="center">{row.reimbursementStatus}</TableCell>
            <TableCell align="center">{row.raisedBy}</TableCell>
            <TableCell align="center">{row.raisedDate}</TableCell>
            <TableCell align="center">{row.eventDate}</TableCell>
            <TableCell align="center">{row.vendorName}</TableCell>
            <TableCell align="center">{row.clearedBy}</TableCell>
            <TableCell align="center">{row.clearedDate}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;

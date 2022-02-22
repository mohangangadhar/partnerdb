import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    handleEditClick
}) => {

    return (
        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
            <TableCell >{row.name}</TableCell>
            <TableCell align="center" >{row.email}</TableCell>
            <TableCell align="center">{row.message}</TableCell>
            <TableCell align="center">{row.createdAt}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="center">{row.resolution}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;

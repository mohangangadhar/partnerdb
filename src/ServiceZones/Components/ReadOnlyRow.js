import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    handleEditClick,
    handleDelete
}) => {

    return (
        <TableRow key={row.id} style={{ backgroundColor: 'white' }}>
            <TableCell >{row.id}</TableCell>

            <TableCell align="center">{row.city}</TableCell>
            <TableCell align="center">{row.state}</TableCell>
            <TableCell align="center">{row.zoneName}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
            <TableCell align="center"><Button variant="contained" on color="success"
                onClick={(event) => handleDelete(event, row.id)}>Delete</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;

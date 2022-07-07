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

            <TableCell >{row.category}</TableCell>
            <TableCell align="center" >{row.product}</TableCell>
            <TableCell align="center" >{row.unit}</TableCell>

            <TableCell align="center">{row.bb}</TableCell>
            <TableCell align="center">{row.vijetha}</TableCell>
            <TableCell align="center">{row.daman}</TableCell>
            <TableCell align="center">{row.dhriti}</TableCell>
            <TableCell align="center">{row.jeevamrut}</TableCell>
            <TableCell align="center">{row.landingCost}</TableCell>
            <TableCell align="center">{row.proposedCost}</TableCell>
            <TableCell align="center">{row.lastUpdated}</TableCell>
            <TableCell align="center">{row.comments}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow >
    );
};

export default ReadOnlyRow;

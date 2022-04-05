import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const ReadOnlyPoReportInfo = ({
    row,
    handleEditClick
}) => {

    return (

        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>

            <TableCell align="center" >{row.poReportId}</TableCell>
            <TableCell align="center">{row.poCreatedDate}</TableCell>
            <TableCell align="center" >{row.active}</TableCell>
            <TableCell >{row.paymentStatus}</TableCell>


            <TableCell align="center" >{row.createdAt}</TableCell>

            <TableCell align="center">{row.actualTotal}</TableCell>
            <TableCell align="center">{row.poTotal}</TableCell>
            <TableCell align="center">{row.poType}</TableCell>

            <TableCell align="center">{row.poStatus}</TableCell>
            <TableCell align="center">{row.comments}</TableCell>
            <TableCell align="center">{row.poReceivedDate}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyPoReportInfo;

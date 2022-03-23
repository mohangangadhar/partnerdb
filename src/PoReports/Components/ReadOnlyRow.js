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
            <TableCell >{row.skuUom}</TableCell>
            <TableCell align="center" >{row.staginArea}</TableCell>
            <TableCell align="center" >{row.skuCount}</TableCell>
            <TableCell align="center" >{row.productName}</TableCell>
            <TableCell align="center">{row.orderIdCount}</TableCell>
            <TableCell align="center">{row.totalQtyReq}</TableCell>
            <TableCell align="center">{row.primarySupplier}</TableCell>
            <TableCell align="center">{row.suggestedQty}</TableCell>
            <TableCell align="center">{row.orderedQty}</TableCell>
            <TableCell align="center">{row.orderedUom}</TableCell>
            <TableCell align="center">{row.receivedQty}</TableCell>
            <TableCell align="center">{row.wastageQty}</TableCell>
            <TableCell align="center">{row.missedQty}</TableCell>
            <TableCell align="center">{row.qualityRating}</TableCell>
            <TableCell align="center">{row.createdAt}</TableCell>
            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;

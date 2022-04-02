import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
const ReadOnlyRow = ({
    row,
    handleEditClick
}) => {

    let price = 0;
    if (row.receivedQty > 0) {
        price = (row.receivedQty - row.wastageQty) * row.totalPay;
    } else {
        price = row.orderedQty * row.totalPay;
    }

    return (

        <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>

            <TableCell align="center" >{row.poNumber}</TableCell>
            <TableCell align="center" >{row.skuCount}</TableCell>
            <TableCell align="center" >{row.productName}</TableCell>
            <TableCell >{row.skuUom}</TableCell>
            <TableCell align="center">{row.orderIdCount}</TableCell>
            <TableCell align="center">{row.totalQtyReq}</TableCell>


            <TableCell align="center">{row.orderedQty}</TableCell>
            <TableCell align="center">{row.orderedUom}</TableCell>
            <TableCell align="center">{row.receivedQty}</TableCell>
            <TableCell align="center">{row.wastageQty}</TableCell>
            <TableCell align="center">{row.receivedQty - row.wastageQty}</TableCell>
            <TableCell align="center">{row.qualityRating}</TableCell>
            <TableCell align="center">{row.totalPay}</TableCell>
            <TableCell align="center">{price}</TableCell>
            <TableCell align="center">{row.comments}</TableCell>

            <TableCell align="center"><Button variant="contained" color="success" onClick={(event) => handleEditClick(event, row)}>Edit</Button></TableCell>
        </TableRow>
    );
};

export default ReadOnlyRow;
